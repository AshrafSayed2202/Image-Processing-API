import { PathLike, promises as fs } from "fs";
async function checkImageExist(filename: unknown = '',imagesFullPath:PathLike): Promise<boolean> {
    if (!filename) {
        return false;
    }
    return (await getAllImageNames(imagesFullPath)).includes(filename as string);
}
async function getAllImageNames(imagesFullPath:PathLike): Promise<string[]> {
    try {
        return (await fs.readdir(imagesFullPath)).map(
            (filename: string): string => filename.split('.')[0]
        );
    } catch {
        return [];
    }
}
function checkDimensions(w:unknown,h:unknown){
    if(w as number < 0 || h as number < 0){
        return false;
    }else{
        return true;
    }
}
export default{
    checkImageExist,
    getAllImageNames,
    checkDimensions
}