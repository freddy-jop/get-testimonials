import { requiredCurrentUser } from "@/auth/current-user";
import { prisma } from "@/auth/prisma";
import { Layout, LayoutTitle } from "@/components/layout";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PageParams } from "@/types/next";
import Link from "next/link";

export default async function RoutePage(props: PageParams<{}>) {
  const user = await requiredCurrentUser();
  const products = await prisma?.product.findMany({
    where: {
      userId: user.id,
    },
  });
  return (
    <Layout>
      <LayoutTitle>products</LayoutTitle>
      <Card className="p-4">
        {products?.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="font-mono">{product.slug}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Link
            href="/products/new"
            className="flex w-full items-center justify-center rounded-md border-2 border-dashed border-primary p-8 transition-colors hover:bg-accent/40 lg:p-12"
          >
            Create products
          </Link>
        )}
      </Card>
    </Layout>
  );
}
