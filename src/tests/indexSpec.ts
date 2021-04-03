import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test endpoint responses', () => {
    it('gets the API Images endpoint', async (done) => {
        const response = await request.get('/api/images');
        expect(response.status).toBe(200);
        done();
    });

    it('gets 400 response from invalid api request', async (done) => {
        const response = await request.get(
            '/api/images?filename=test&width=a&height=b'
        );
        expect(response.status).toBe(400);
        done();
    });

    it('gets 200 response from valid api request', async (done) => {
        const response = await request.get(
            '/api/images?filename=test&width=200&height=200'
        );
        expect(response.status).toBe(200);
        done();
    });

    it('gets 400 response from empty queries', async (done) => {
        const response = await request.get(
            '/api/images?filename=&width=&height='
        );
        expect(response.status).toBe(400);
        done();
    });

    it('gets 400 response from invalid filename', async (done) => {
        const response = await request.get(
            '/api/images?filename=dog.jpg&width=400&height=200'
        );
        expect(response.status).toBe(400);
        done();
    });
});
