import express from 'express'
import images from './api/images'
const routes = express.Router()
routes.get('/api', (req, res) => {
    // HTML & CSS & JavaScript UI
    res.send(`<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: poppins;
        background: linear-gradient(45deg, #f44336, #ff00575c);
        height: 100vh;
    }

    h1 {
        text-align: center;
        cursor: default;
        padding: 30px;
    }

    h1 span {
        display: inline-block;
        transition: 0.3s;
    }

    h1 span:hover {
        color: aqua;
        transform: translateY(-5px);
    }

    .container {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        background-color: #ffffff8e;
        padding: 15px 50px;
        border-radius: 15px;
    }

    #images {
        display: flex;
    }

    #images .image {
        justify-content: center;
        align-items: center;
        margin: 5px;
        cursor: pointer;
        background-color: red;
        color: white;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: flex;
        transition:0.3s;
    }
    #images .image:hover{
        border-radius:0;
    }

    #images .image.active {
        border: 3px solid green;
    }

    #dimensions {
        display: flex;
        flex-direction: column;
    }

    #dimensions input {
        width: 70px;
    }

    button {
        color: white;
        font-size: 18px;
        padding: 10px;
        margin-top: 20px;
        background-color: #8bc34a;
        border: none;
        cursor: pointer;
        transition: 0.3s;
    }

    button:hover {
        background-color: #009688;
    }
</style>
<h1>Welcome to
    <span>A</span><span>s</span><span>h</span><span>r</span><span>a</span><span>f</span><span>'</span><span>s</span>
    Image Processing App
</h1>
<div class="container">
    <p>Select Image:</p>
    <div id="images">
        <div class="image" title="image1">Image1</div>
        <div class="image" title="image2">Image2</div>
        <div class="image" title="image3">Image3</div>
        <div class="image" title="image4">Image4</div>
        <div class="image" title="image5">Image5</div>
    </div>
    <div id="dimensions">
        <p>Type width and height</p>
        <label for="width">Width: <input type="text" id="width" maxlength="4"></label>
        <label for="height">Height: <input type="text" id="height" maxlength="4"></label>
    </div>
    <button onclick="redirect()">Procces</button>
</div>
<script>
    document.querySelectorAll('.image').forEach((image) => {
        image.addEventListener('click', () => {
            document.querySelectorAll('.image').forEach((e) => {
                e.classList.remove('active')
            })
            image.classList.add('active')
        })
    })
    function redirect() {
        if (document.getElementById('width').value != '' && document.getElementById('height').value != '' && document.getElementById('width').value != 0 && document.getElementById('height').value != 0) {
            window.open(\`http://localhost:3000/api/images?filename=\${document.querySelector('.image.active').title}&width=\${document.getElementById('width').value}&height=\${document.getElementById('height').value}\`,"_self")
        } else {
            window.open(\`http://localhost:3000/api/images?filename=\${document.querySelector('.image.active').title}\`,"_self")
        }
    }
    </script>`)
})
routes.use(images)
export default routes
