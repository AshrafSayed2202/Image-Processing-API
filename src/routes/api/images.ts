import express from 'express'
import path from 'path'
import { promises as fs } from 'fs'
import resizeImage from './resize'
import fileChecker from './fileChecker'
const images = express.Router()
// Directory paths (Full images & Thumb images)
const imagesFullPath = path.resolve(__dirname, '../../../assets/images/full')
const imagesThumbPath = path.resolve(__dirname, '../../../assets/images/thumb')
images.get(
  '/api/images',
  async (req: express.Request, res: express.Response): Promise<void> => {
    // saving querys to variables
    const filename = req.query.filename
    const imageWidth: unknown = req.query.width
    const imageHeight: unknown = req.query.height
    // checking if the width and height are numbers or strings or may be undefined
    if((isNaN(imageWidth as number) || isNaN(imageHeight as number)) && imageHeight != undefined && imageWidth != undefined){
      res.send(`image width and height must be number (can't be string)`)
      return
    }
    // the full image path
    const imagePathFull: string = path.resolve(
      imagesFullPath,
      `${filename}.jpg`
    )
    // the thumb image path
    const imagePathThumb: string = path.resolve(
      imagesThumbPath,
      `${filename}_(${imageWidth}x${imageHeight}).jpg`
    )
    // checking if the width and height are negative number
    if (!fileChecker.checkDimensions(imageWidth, imageHeight)) {
      res.send('Image Width and Height must be positive numbers')
      return
    }
    // checing image existence
    if (!await fileChecker.checkImageExist(filename, imagesFullPath)) {
      res.send("this image dosen't exist")
      return
    }
    // proccesing image with sharp
    resizeImage({
      source: imagePathFull,
      target: imagePathThumb,
      width: parseInt(imageWidth as string),
      height: parseInt(imageHeight as string),
    }).then(async (): Promise<void> => {
      async function getThumbPath(): Promise<null | string> {
        // don't continue if there is no filename
        if (!req.query.filename) {
          return null
        }
        // with width ane height or without ?
        const imagePath: string =
          req.query.width && req.query.height
            ? path.resolve(imagePathThumb)
            : path.resolve(imagePathFull)
        try {
          await fs.access(imagePath)
          return imagePath
        } catch {
          return null
        }
      }
      // use the function to display the image on browser
      const imagePath: null | string = await getThumbPath()
      // it is exist you can see it now
      if (imagePath) {
        res.sendFile(imagePath)
      }
    })
  }
)
export default images