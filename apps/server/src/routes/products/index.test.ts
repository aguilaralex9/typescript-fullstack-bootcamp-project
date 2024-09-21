import request from 'supertest';
import express from 'express';
import { productsRoute } from './index';
import { ProductService } from '../../services/ProductService';

const app = express();
app.use(express.json());
productsRoute(app);

describe('Products API', () => {
    let productService;

    beforeEach(() => {
        productService = new ProductService();
        jest.spyOn(productService, 'GetAllProducts').mockResolvedValue([{ id: 1, name: 'Test Product', variants: [] }]);
        // Mock other methods as needed
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /api/products - should return all products', async () => {
        const response = await request(app).get('/api/products');
        expect(response.status).toBe(200);
        expect(response.body.result).toHaveLength(1);
        expect(response.body.result[0]).toEqual(expect.objectContaining({ id: 1, name: 'Test Product' }));
    });
});
