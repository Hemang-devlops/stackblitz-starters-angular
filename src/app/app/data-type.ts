export interface SignUp {
  name: string;
  email: string;
  password: string;
  cpassword: string;
}

export interface LogIn {
  email: string;
  password: string;
}

export interface Product{
  id: number;
  title: string;
  category: string;
  price: number;
  discountPercentage: number,
  rating: number,
  stock: number,
  brand: string,
  thumbnail: string,
  images: string[],
  description: string;
}

export interface ImageObject {
  src: string;
  title: string; // Add a title property
  subtitle: string; // Add a subtitle property
}

export interface ResultList {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}