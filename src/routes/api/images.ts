import express from 'express'
import path from 'path'
import { promises as fs } from 'fs'
import resizeImage from './resize'
import fileChecker from './fileChecker'
const images = express.Router()
const imagesFullPath = path.resolve(__dirname, '../../../assets/images/full')
const imagesThumbPath = path.resolve(__dirname, '../../../assets/images/thumb')
images.get(
  '/api/images',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const filename = req.query.filename
    const imageWidth: unknown = req.query.width
    const imageHeight: unknown = req.query.height
    if(isNaN(imageWidth as number) || isNaN(imageHeight as number)){
      res.send('image width and height must be number (can\'t be string)')
      return
    }
    const imagePathFull: string = path.resolve(
      imagesFullPath,
      `${filename}.jpg`
    )
    const imagePathThumb: string = path.resolve(
      imagesThumbPath,
      `${filename}_(${imageWidth}x${imageHeight}).jpg`
    )
    if (!fileChecker.checkDimensions(imageWidth, imageHeight)) {
      res.send('Image Width and Height must be positive numbers')
      return
    }
    if (!await fileChecker.checkImageExist(filename, imagesFullPath)) {
      res.send("this image dosen't exist")
      return
    }
    resizeImage({
      source: imagePathFull,
      target: imagePathThumb,
      width: parseInt(imageWidth as string),
      height: parseInt(imageHeight as string),
    }).then(async (): Promise<void> => {
      async function getThumbPath(): Promise<null | string> {
        if (!req.query.filename) {
          return null
        }
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
      const imagePath: null | string = await getThumbPath()
      if (imagePath) {
        res.sendFile(imagePath)
      }
    })
  }
)
export default images