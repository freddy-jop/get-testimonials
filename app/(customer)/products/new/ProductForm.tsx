"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createProductAction } from "../[productId]/edit/product.action";
import {
  GRADIENTS_CLASSES,
  ProductSchema,
  ProductType,
} from "../[productId]/edit/product.schema";

export type ProductFormProps = {
  defaultValues?: ProductType;
};

export const ProductForm = (props: ProductFormProps) => {
  const isCreate = !Boolean(props.defaultValues);
  const form = useZodForm({
    schema: ProductSchema,
    defaultValues: props.defaultValues,
  });

  const router = useRouter();
  const { executeAsync: mutationAsync, isExecuting } = useAction(
    createProductAction,
    {
      onSuccess({ data, input }) {
        toast.success("Product Created");
        router.push(`/products/${data?.id}/edit`);
      },
      onError({ error, input }) {
        toast.error(error.serverError);
      },
    }
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isCreate
            ? "Create product"
            : `Edit product ${props.defaultValues?.name}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          className="flex flex-col gap-4"
          form={form}
          onSubmit={async (values) => {
            console.log("mutationAsync :: ", values);
            await mutationAsync(values);
          }}
        >
          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="texts">Text</TabsTrigger>
            </TabsList>
            <TabsContent className="flex flex-col gap-6" value="general">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="iPhone 15"
                        onChange={field.onChange}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormDescription>
                      The name of the product to review
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="iPhone 15"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) {
                            return;
                          }
                          if (file.size > 1024 * 1024) {
                            toast.error("Fiel is too big");
                            return;
                          }
                          if (!file.type.includes("image")) {
                            toast.error("File is not a image");
                            return;
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>The image ot</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="iPhone 15"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value
                            .replaceAll(" ", "-")
                            .toLowerCase();

                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      The slug is used in the URL of the review page.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="backgroundColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Background color</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {GRADIENTS_CLASSES.map((gradient) => (
                            <SelectItem
                              value={gradient}
                              key={gradient}
                              className="flex"
                            >
                              <div
                                className={cn(
                                  gradient,
                                  "block w-80 h-8 rounded-md flex-1"
                                )}
                              ></div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      The review page background color
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>

          <Button>
            {isExecuting
              ? "...Waiting"
              : isCreate && !isExecuting
              ? "Create product"
              : "Save product"}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};
