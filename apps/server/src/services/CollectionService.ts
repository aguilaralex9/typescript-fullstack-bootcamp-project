import { prisma } from "../lib/prismaClient";

export class CollectionService {
    async GetAllCollections(){
        const collections = prisma.collection.findMany()
          return collections;
    }
    async GetProductsByCollectionId(collectionId: number) {
        const collection = await prisma.collection.findUnique({
            where: {
                id: collectionId
            },
            include: {
                products: {
                    include: {
                        variants: true, // Include variants or other related data if needed
                    }
                }
            }
        });

        if (collection === null) {
            throw new Error(`Collection with id ${collectionId} not found`);
        }

        return collection.products;
    }
}