import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test app endpoint', ():void => {
    it('get the api endpoint', async ():Promise<void> => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
    });
    it("gets images endpoint",async():Promise<void>=>{
        const response = await request.get('/api/images');
        expect(response.status).toBe(200);
    });
    it("wrong end point status 404",async():Promise<void>=>{
        const response = await request.get('/wrong');
        expect(response.status).toBe(404);
    });
    it("Image with only name",async():Promise<void>=>{
        const response = await request.get('/api/images?filename=image1');
        expect(response.status).toBe(200);
    });
    it("Image with name and one dimension",async():Promise<void>=>{
        const response = await request.get('/api/images?filename=image1&width=100');
        expect(response.status).toBe(200);
    });
    it("Image with name ,width and height",async():Promise<void>=>{
        const response = await request.get('/api/images?filename=image1&width=100&height=100');
        expect(response.status).toBe(200);
    });
    it("Image with negative dimensions",async():Promise<void>=>{
        const response = await request.get('/api/images?filename=image1&width=-100&height=-100');
        expect(response.status).toBe(200);
    });
    it("Image with string dimensions",async():Promise<void>=>{
        const response = await request.get('/api/images?filename=image1&width=hundred&height=hundred');
        expect(response.status).toBe(200);
    });
    it("Image with fake image name",async():Promise<void>=>{
        const response = await request.get('/api/images?filename=fake');
        expect(response.status).toBe(200);
    });
});