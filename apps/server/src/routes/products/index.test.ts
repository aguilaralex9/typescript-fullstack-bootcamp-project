import request from 'supertest';
import express from 'express';
import { productsRoute } from './index';

const app = express();
app.use(express.json());
productsRoute(app);

describe('Products API', () => {

    test('GET /api/products - should return all products', async () => {
        const response = await request(app).get('/api/products');
        expect(response.status).toBe(200);
        expect(response.body.result).toHaveLength(11);
    });
});
