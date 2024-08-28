"use server";

import { prisma } from "@/auth/prisma";
import { ActionError, userAction } from "@/lib/safe-action";
import { z } from "zod";
import { ProductSchema } from "./product.schema";

const verifySlugUniqueness = async (slug: string, productId?: string) => {
  const slugExits = await prisma.product.count({
    where: {
      slug: slug,
      id: productId
        ? {
            not: productId,
          }
        : undefined,
    },
  });
  if (slugExits) {
    throw new ActionError("Slug alredy exists");
  }
};

export const createProductAction = userAction
  .schema(ProductSchema)
  .action(async ({ parsedInput, ctx }) => {
    await verifySlugUniqueness(parsedInput.slug);
    const product = await prisma.product.create({
      data: {
        ...parsedInput,
        userId: ctx.user.id,
      },
    });
    return product;
  });

export const updateProductAction = userAction
  .schema(z.object({ id: z.string(), data: ProductSchema }))
  .action(async ({ parsedInput, ctx }) => {
    await verifySlugUniqueness(parsedInput.data.slug, parsedInput.id);

    const updatedPorduct = await prisma.product.update({
      where: {
        id: parsedInput.id,
        userId: ctx.user.id,
      },
      data: parsedInput.data,
    });
    return updatedPorduct;
  });
