import { Layout, LayoutTitle } from "@/components/layout";
import type { PageParams } from "@/types/next";
import { ProductForm } from "./ProductForm";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <Layout>
      <LayoutTitle>Create Product</LayoutTitle>
      <ProductForm />
    </Layout>
  );
}
