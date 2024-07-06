import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import { RootRoute } from "./routes/root";
import { HomeRoute, loader as homeLoader } from "./routes/home";
import { RegisterRoute } from "./routes/register";
import { LoginRoute } from "./routes/login";
import { MeRoute, loader as meLoader } from "./routes/me";
import { CartRoute, loader as cartLoader } from "./routes/cart";
import {
  ProductSlugRoute,
  loader as productSlugLoader,
} from "./routes/product";
import { ProductsRoute, loader as productsLoader } from "./routes/products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    children: [
      {
        path: "/",
        element: <HomeRoute />,
        loader: homeLoader,
      },
      {
        path: "/register",
        element: <RegisterRoute />,
      },
      {
        path: "/login",
        element: <LoginRoute />,
      },
      {
        path: "/me",
        element: <MeRoute />,
        loader: meLoader,
      },
      {
        path: "/products",
        element: <ProductsRoute />,
        loader: productsLoader,
      },
      {
        path: "/products/:slug",
        element: <ProductSlugRoute />,
        loader: productSlugLoader,
      },
      {
        path: "/cart",
        element: <CartRoute />,
        loader: cartLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
