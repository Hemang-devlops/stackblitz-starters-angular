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
  image: string;
  description: string;
}

export interface ImageObject {
  src: string;
  title: string; // Add a title property
  subtitle: string; // Add a subtitle property
}