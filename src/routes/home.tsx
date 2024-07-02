import { Link, useLoaderData } from "react-router-dom";

import { Product } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export async function loader() {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`);
  const products: Product[] = await response.json();

  return { products };
}

export function HomeRoute() {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <>
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link to={`/products/${product.slug}`} key={product.id}>
              <Card>
                <CardHeader>
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    width={200}
                    height={50}
                    className="h-20 w-full"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                  <CardDescription className="font-semibold">
                    Rp {product.price}.000
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
