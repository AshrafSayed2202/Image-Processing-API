import sharp from 'sharp'
// create standard interface
interface resizeImageParameters {
  source: string
  target: string
  width: number
  height: number
}
// resize image function with sharp source,(width,height),format,target
const resizeImage = async (
  parameters: resizeImageParameters
): Promise<null | string> => {
  try {
    await sharp(parameters.source)
      .resize(parameters.width, parameters.height)
      .toFormat('jpeg')
      .toFile(parameters.target)
    // used return for unit testing
    return 'image resized successfully'
  } catch {
    return "this Image can't be Processed."
  }
}
export default resizeImage
