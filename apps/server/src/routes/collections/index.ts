import express, {Express} from 'express'
import { CollectionService } from '../../services/CollectionService'


export function collectionsRoute(app: Express): void {
    const router = express.Router()
    const collectionService = new CollectionService();

    app.use('/api/collections', router)

    router.get('/', async function(_req, res, next){
        try {
            const result = await collectionService.GetAllCollections()
            return res.json({ result })
        } catch (error) {
          next(error)  
        }
    })
    router.get('/collections/:id/products', async (req, res, next) => {
        const { id } = req.params;
        try {
            const products = await collectionService.GetProductsByCollectionId(parseInt(id));
            return res.json(products);
        } catch (error) {
            next(error);
        }
    });
}