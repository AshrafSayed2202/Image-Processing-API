import sharp from 'sharp';
interface resizeImageParameters{
    source: string;
    target: string;
    width: number;
    height: number;
}
const resizeImage = async (parameters: resizeImageParameters): Promise<null | string> => {
    try {
        await sharp(parameters.source)
            .resize(parameters.width, parameters.height)
            .toFormat('jpeg')
            .toFile(parameters.target);
        return null;
    } catch {
        return 'this Image can\'t be Processed.';
    }
};
export default resizeImage;