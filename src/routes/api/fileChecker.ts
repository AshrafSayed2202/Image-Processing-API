import { PathLike, promises as fs } from 'fs'
// check if image exist in the path
async function checkImageExist(
  filename: unknown = '',
  imagesFullPath: PathLike
): Promise<boolean> {
  if (!filename) {
    return false
  }
  // get all avaliable images in array
  return (await getAllImageNames(imagesFullPath)).includes(filename as string)
}
async function getAllImageNames(imagesFullPath: PathLike): Promise<string[]> {
  try {
    return (await fs.readdir(imagesFullPath)).map(
      (filename: string): string => filename.split('.')[0]
    )
  } catch {
    return []
  }
}
// function to check if dimensions higher than zero or not
function checkDimensions(w: unknown, h: unknown): boolean {
  if ((w as number) < 0 || (h as number) < 0) {
    return false
  } else {
    return true
  }
}
export default {
  checkImageExist,
  getAllImageNames,
  checkDimensions,
}
