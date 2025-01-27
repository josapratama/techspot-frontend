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

export function HomeRoute() {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D"
        alt=""
        className="h-screen w-full object-cover"
      />
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
