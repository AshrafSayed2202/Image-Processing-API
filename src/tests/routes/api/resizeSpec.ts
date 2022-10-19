import resizeImage from "../../../routes/api/resize";
import path from 'path'
const imagesFullPath = path.resolve(__dirname, '../../../../assets/images/full')
const imagesThumbPath = path.resolve(__dirname, '../../../../assets/images/thumb')
const imagePathFull: string = path.resolve(
    imagesFullPath,
    'image1.jpg'
)
const imagePathThumb: string = path.resolve(
    imagesThumbPath,
    `image1_(100x100).jpg`
)
describe("resize test (sharp)", async():Promise<void> => {
    it('resize image width positive dimensions', async (): Promise<void> => {
        expect(await resizeImage({
            source: imagePathFull,
            target: imagePathThumb,
            width: 100,
            height: 100,
        })).toBe('image resized successfully')
    });
    it('resize image width negative dimensions', async (): Promise<void> => {
        expect(await resizeImage({
            source: imagePathFull,
            target: imagePathThumb,
            width: -100,
            height: -100,
        })).toBe("this Image can't be Processed.")
    });
    it('resize image width wrong path', async (): Promise<void> => {
        expect(await resizeImage({
            source: 'wrong/path',
            target: imagePathThumb,
            width: 100,
            height: 100,
        })).toBe("this Image can't be Processed.")
    });
})