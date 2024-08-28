import { requiredCurrentUser } from "@/auth/current-user";
import { prisma } from "@/auth/prisma";
import { Layout, LayoutTitle } from "@/components/layout";
import type { PageParams } from "@/types/next";
import { notFound } from "next/navigation";
import { UpdateProductForm } from "./UpdateProductForm";

export default async function RoutePage(
  props: PageParams<{
    productId: string;
  }>
) {
  const user = await requiredCurrentUser();
  const product = await prisma.product.findUnique({
    where: {
      id: props.params.productId,
      userId: user?.id,
    },
  });
  if (!product) {
    notFound();
  }
  return (
    <Layout>
      <LayoutTitle>Edit Product</LayoutTitle>
      <UpdateProductForm defaultValues={product} productId={product.id} />
    </Layout>
  );
}
