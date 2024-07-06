import { Link, useLoaderData } from "react-router-dom";

import { Product } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { convertToIDR } from "@/lib/currency";

export async function loader() {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`);
  const products: Product[] = await response.json();

  return { products };
}

export function ProductsRoute() {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <>
      <div className="container pt-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link to={`/products/${product.slug}`} key={product.id}>
              <Card className="overflow-hidden">
                <CardHeader>
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="h-60 w-full object-cover"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="py-4">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                  <CardDescription className="font-semibold text-black pt-2">
                    {convertToIDR(product.price)}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
