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