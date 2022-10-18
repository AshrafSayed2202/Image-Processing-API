import express from 'express';
import path from 'path'
import {promises as fs} from 'fs'
import resizeImage from './resize'
const images = express.Router();
const imagesFullPath = path.resolve(__dirname, '../../../assets/images/full');
const imagesThumbPath = path.resolve(__dirname, '../../../assets/images/thumb');
images.get('/api/images',(req,res)=>{
    const filename = req.query.filename
    const imageWidth:unknown = req.query.width
    const imageHeight:unknown = req.query.height
    const imagePathFull:string = path.resolve(imagesFullPath,`${filename}.jpg`);
    const imagePathThumb:string= path.resolve(imagesThumbPath,`${filename}_${imageWidth}_${imageHeight}.jpg`);
    console.log(imagePathFull);
    
    resizeImage({
        source:imagePathFull,
        target:imagePathThumb,
        width:parseInt(imageWidth as string),
        height:parseInt(imageHeight as string),
    })
    res.send(`this is ${filename} image with, Width:${imageWidth} & Height:${imageHeight}`)
})
export default images