import express, {Express} from 'express'
import { ProductService } from '../../services/ProductService'


export function productsRoute(app: Express): void {
    const router = express.Router()
    const productService = new ProductService();

    app.use('/api/products', router)

    router.get('/', async function(_req, res, next){
        try {
            const result = await productService.GetAllProducts()
            return res.json({ result })
        } catch (error) {
          next(error)  
        }
    })

    router.post('/', async function(_req, res, next) {
        try {
            const response = await productService.AddOneProduct(_req.body)
            return res.status(201).json({
                message: 'New product has been created',
                data: response
            })
        }
        catch (error) {
            next(error)
        }
    })

    router.put('/:id', async function(_req, res, next) {
        const { id } = _req.params
        try {
            const response = await productService.UpdateOneProduct(parseInt(id), _req.body)
            return res.json({
                message: `Product with id: ${id} has been updated`,
                id: response.id,
                data: response
            })
        }
        catch (error) {
            next(error)
        }
    })

    router.delete('/:id', async function(_req, res, next) {
        const { id } = _req.params
        try {
            const response = await productService.DeleteOneProduct(parseInt(id))
            return res.json({
                message: `Product with id: ${id} has been deleted`,
                id: response.id,
            })
        }
        catch (error) {
            next(error)
        }
    })

}