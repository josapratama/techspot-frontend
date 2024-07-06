("use client");

import { useState } from "react";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { LuMinus, LuPlus } from "react-icons/lu";
import { MdAddShoppingCart } from "react-icons/md";

import { convertToIDR } from "@/lib/currency";
import { backendURL } from "@/utils/env";
import { Product } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  if (!slug) return { product: null };

  try {
    const response = await fetch(`${backendURL}/products/${slug}`);
    const product: Product = await response.json();
    return { product };
  } catch (error) {
    console.error(error);
    return { product: null };
  }
}

const formSchema = z.object({
  amount: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function ProductSlugRoute() {
  const { product } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  if (!product) {
    return (
      <div>
        <h4>Product not found</h4>
      </div>
    );
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "1",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const registerResponse = await response.json();

    if (registerResponse && response.ok) {
      console.log("User registered successfully", registerResponse);
      form.reset();
    } else {
      console.error("Registration failed", registerResponse);
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState(0);

  const decrement = () => setValue((prev) => Math.max(prev - 1, 0));
  const increment = () => setValue((prev) => prev + 1);

  return (
    <div className="container pt-5">
      <Card className="overflow-hidden lg:grid lg:grid-cols-2">
        <CardHeader>
          <img
            src={product.imageURL}
            alt={product.name}
            width={200}
            height={200}
            className="h-96 w-full object-cover"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-5xl py-4">{product.name}</CardTitle>
          <CardDescription>
            <p className="text-xl">{product.description}</p>
            <p className="font-bold text-3xl text-black my-4">
              {convertToIDR(product.price)}
            </p>
          </CardDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah :</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Button
                          type="button"
                          onClick={decrement}
                          variant={"secondary"}
                          className="border-2 border-blue-800"
                        >
                          <LuMinus />
                        </Button>
                        <Input
                          {...field}
                          value={value}
                          onChange={(e) => setValue(Number(e.target.value))}
                          className="w-14 text-center"
                        />
                        <Button
                          type="button"
                          onClick={increment}
                          variant={"secondary"}
                          className="border-2 border-blue-800"
                        >
                          <LuPlus />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full text-xl font-normal rounded-lg my-3 py-1 bg-blue-800"
              >
                Add to Cart <MdAddShoppingCart size={20} className="ml-4" />
              </Button>
              <Button
                variant={"secondary"}
                type="submit"
                className="text-xl border-2 border-blue-800 w-full text-center font-normal py-1 rounded-lg"
              >
                Buy Now
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
