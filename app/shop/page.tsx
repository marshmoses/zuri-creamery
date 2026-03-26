import { products } from "@/lib/products";
import { ShopClient } from "./ShopClient";

export default function ShopPage() {
  return <ShopClient products={products} />;
}

