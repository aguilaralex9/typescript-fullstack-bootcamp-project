import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // Create Collections
  const collections = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.collection.create({
        data: {
          name: faker.commerce.department(),
          description: faker.lorem.paragraph(),
        },
      })
    )
  );

  // Create Products with Variants and Options
  for (let i = 0; i < 10; i++) {
    const product = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        image: faker.image.url(),
        price: faker.number.int({ min: 1000, max: 5000 }), // price in cents
        collections: {
          connect: collections.map((collection) => ({ id: collection.id })),
        },
      },
    });

    // Create Options for Product
    const options = await Promise.all(
      Array.from({ length: 2 }).map(async () => {
        const option = await prisma.option.create({
          data: {
            name: faker.commerce.productMaterial(),
            productId: product.id,
            values: {
              create: Array.from({ length: 3 }).map(() => ({
                value: faker.color.human(), // Generating color values
              })),
            },
          },
          include: {
            values: true, // Include OptionValues when creating options
          },
        });
        return option;
      })
    );

    // Create Variants for Product
    for (let j = 0; j < 3; j++) {
      await prisma.variant.create({
        data: {
          name: faker.commerce.productAdjective(),
          description: faker.lorem.sentence(),
          image: faker.image.url(),
          stock: faker.number.int({ min: 10, max: 100 }),
          productId: product.id,
          optionValues: {
            connect: options.flatMap((option) =>
              option.values.map((value) => ({ id: value.id })) // Correctly map option values
            ),
          },
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
