import express from 'express';
import path from 'path'
import {promises as fs} from 'fs'
import resizeImage from './resize'
const images = express.Router();
const imagesFullPath = path.resolve(__dirname, '../../../assets/images/full');
const imagesThumbPath = path.resolve(__dirname, '../../../assets/images/thumb');
images.get('/api/images',async(req:express.Request,res:express.Response):Promise<void>=>{
    const filename = req.query.filename
    const imageWidth:unknown = req.query.width
    const imageHeight:unknown = req.query.height
    const imagePathFull:string = path.resolve(imagesFullPath,`${filename}.jpg`);
    const imagePathThumb:string= path.resolve(imagesThumbPath,`${filename}_(${imageWidth}x${imageHeight}).jpg`);
    resizeImage({
        source:imagePathFull,
        target:imagePathThumb,
        width:parseInt(imageWidth as string),
        height:parseInt(imageHeight as string),
    }).then(async():Promise<void>=>{
        async function getThumbPath():Promise<null | string> {
            if(!req.query.filename){
                return null;
            }
            const imagePath:string = (req.query.width&&req.query.height)?path.resolve(imagePathThumb):path.resolve(imagePathFull)
            try{
                await fs.access(imagePath);
                return imagePath;
            }catch{
                return null;
            }
        }
        const imagePath:(null|string) = await getThumbPath()
        if(imagePath){
            res.sendFile(imagePath)
        }
    })
})
export default images