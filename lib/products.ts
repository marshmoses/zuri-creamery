export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageSrc: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "mozzarella-250g",
    name: "Mozzarella 250g",
    price: 450,
    description: "Fresh, soft and creamy mozzarella cheese.",
    imageSrc: "/mozzarella.jpg",
    featured: true,
  },
  {
    id: "cheddar-250g",
    name: "Cheddar 250g",
    price: 500,
    description: "Rich and aged cheddar with bold flavor.",
    imageSrc: "/cheddar.jpg",
    featured: true,
  },
  {
    id: "cream-cheese-250g",
    name: "Cream Cheese 250g",
    price: 400,
    description: "Smooth and spreadable cream cheese.",
    imageSrc: "/mozzarella.jpg", // TEMP (since you don’t have image yet)
    featured: true,
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export const productsById: Record<string, Product> = Object.fromEntries(
  products.map((p) => [p.id, p])
);