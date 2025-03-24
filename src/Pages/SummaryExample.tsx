import Summary from "./Summary";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
}

const userData: User = {
  id: 1000,
  name: "Meshal",
  email: "meshal@gmail.com",
};

const productData: Product = {
  id: 2000,
  name: "Stylus Pen",
  price: "$4.50",
};

const SummaryExample = () => {
  return (
    <div className="">
      <Summary<User, "name"> data={userData} property="name" />
      <Summary<Product, "name"> data={productData} property="name" />
    </div>
  );
};

export default SummaryExample;
