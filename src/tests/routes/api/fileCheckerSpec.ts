import fileChecker from "../../../routes/api/fileChecker";
import path from 'path'
const imagesFullPath = path.resolve(__dirname, '../../../../assets/images/full')
describe("File Checking functions",():void=>{
    it("checkImageExist() should fake or null filename blocked",async():Promise<void>=>{
        expect(await fileChecker.checkImageExist(''||'something',imagesFullPath)).toBe(false)
    });
    it("checkImageExist() should real filename pass",async():Promise<void>=>{
        expect(await fileChecker.checkImageExist('image1',imagesFullPath)).toBe(true)
    });
    it("getAllImageNames() should get all full images in an array",async():Promise<void>=>{
        expect(await fileChecker.getAllImageNames(imagesFullPath)).toEqual(['image1','image2','image3','image4','image5'])
    });
    it("checkDimensions() shouldn accept positive Dimensions",():void=>{
        expect(fileChecker.checkDimensions(100,50)).toEqual(true)
    });
    it("checkDimensions() shouldn't accept negative Dimensions",():void=>{
        expect(fileChecker.checkDimensions(-100,-50)).toEqual(false)
    });
})