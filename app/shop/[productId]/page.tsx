import Image from "next/image";
import { notFound } from "next/navigation";
import { productsById } from "@/lib/products";
import { ProductDetailClient } from "./ProductDetailClient";

type Params = {
  productId: string;
};

function getProduct(productId: string) {
  return productsById[productId];
}

export default function ProductDetailPage({ params }: { params: Params }) {
  const product = getProduct(params.productId);

  if (!product) return notFound();

  // Server component: pass product to a client component for cart interactions.
  return (
    <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10">
      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="relative overflow-hidden rounded-[2rem] bg-white/60 ring-1 ring-soft-green/25 shadow-sm">
          <div className="relative aspect-square sm:aspect-[4/3]">
            <Image
              src={product.imageSrc}
              alt={product.name}
              fill
              unoptimized
              className="object-contain p-8"
              sizes="(max-width: 768px) 90vw, 50vw"
              priority
            />
          </div>
        </div>

        <ProductDetailClient productId={product.id} product={product} />
      </section>
    </main>
  );
}

