import { Product } from "@repo/db";
import { prisma } from "../lib/prismaClient";

export class ProductService {
    async GetAllProducts(){
        const products = prisma.product.findMany({
            include: {
              variants: true,
            }
          })
          return products;
    }
    async AddOneProduct(request: Product){
        const newProduct = await prisma.product.create({
            data: {
                name: request.name,
                description: request.description,
                image: request.image,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })
        return newProduct 
    }
    async UpdateOneProduct(id: number, request: Product) {
        const product = await prisma.product.findUnique({
            where: {
                id: id
            }
        })

        if(product === null){
            throw new Error(`Product not found`)
        }

        const updatedProduct = await prisma.product.update({
            where: {
                id: product.id
            },
            data: {
                name: request.name,
                description: request.description,
                image: request.image,
                updatedAt: new Date()
            }
        })
        return updatedProduct
    }
    async DeleteOneProduct(id: number) {
        const product = await prisma.product.findUnique({
            where: {
                id: id
            }
        })

        if(product === null){
            throw new Error(`Product not found`)
        }

        const deletedProduct = await prisma.product.delete({
            where: {
                id: product.id
            }
        })
        return deletedProduct
    }
}