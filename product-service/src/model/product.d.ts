export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  count: number;
};

export type Products = Product[];

export type Stock = {
  product_id: string;
  count: number;
};

export type Stocks = Stock[];
