import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {

  for (let i = 0; i < 5; i++) {
    const product = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        image: faker.image.url(),
        options: {
          create: [
            {
              name: 'Color',
              values: {
                create: ['Red', 'Green', 'Blue'].map((value) => ({ value })),
              },
            },
            {
              name: 'Size',
              values: {
                create: ['S', 'M', 'L', 'XL'].map((value) => ({ value })),
              },
            },
          ],
        }, 
      },
    });

    const variants = await prisma.variant.createManyAndReturn({
      data: [
        {
          productId: product.id,
          name: 'Bue-L',
          description: faker.commerce.productDescription(),
          image: faker.image.url(),
          price: faker.number.int({ min: 1000, max: 5000 }),
          stock: faker.number.int({ min: 0, max: 100 }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productId: product.id,
          name: 'Red-M',
          description: faker.commerce.productDescription(),
          image: faker.image.url(),
          price: faker.number.int({ min: 1000, max: 5000 }),
          stock: faker.number.int({ min: 0, max: 100 }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
            productId: product.id,
            name: 'Green-XL',
            description: faker.commerce.productDescription(),
            image: faker.image.url(),
            price: faker.number.int({ min: 1000, max: 5000 }),
            stock: faker.number.int({ min: 0, max: 100 }),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
      ],
    });

    const colorOptions = await prisma.optionValue.findMany({
        where: {
            option: {
                name: 'Color',
                productId: product.id,
            }
        }
    })

    const sizeOptions = await prisma.optionValue.findMany({
        where: {
            option: {
                name: 'Size',
                productId: product.id,
            }
        }
    })

    const connectValues = [
        [
            {id: colorOptions.find((c)=> c.value === 'Blue')!.id},
            {id: sizeOptions.find((c)=> c.value === 'L')!.id}
        ],
        [
            {id: colorOptions.find((c)=> c.value === 'Red')!.id},
            {id: sizeOptions.find((c)=> c.value === 'M')!.id}
        ],
        [
            {id: colorOptions.find((c)=> c.value === 'Green')!.id},
            {id: sizeOptions.find((c)=> c.value === 'XL')!.id}
        ]
    ]

    for (let j = 0; j< variants.length; j++){
        const variant = variants[j];
        await prisma.variant.update({
            where: {id: variant.id},
            data: {
                optionValues: {
                    connect: connectValues[j]
                }
            }
        })
    }

    await prisma.collection.createMany({
        data: Array.from({length: 3}). map(()=> ({
            name: faker.commerce.department(),
            description: faker.lorem.sentences(3),
        }))
    })

    await prisma.collection.update({
        where: { id: faker.number.int({ min: 1, max: 3})},
        data: {
            products: {
                connect: { id: product.id}
            }
        }
    })
  }

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });