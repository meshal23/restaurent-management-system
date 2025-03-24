/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "react-router";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

const API_URL = import.meta.env.VITE_POCKETBASE_URL;

const Products = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // handleSubmit(data);
    createProductMutation.mutate(data);
  };
  console.log(watch());

  //fetch the product data
  const {
    data: productData,
    isLoading,
    isSuccess,
  } = useQuery<any>({
    queryKey: ["products"],
    queryFn: async () => {
      console.log(API_URL);
      return axios({
        method: "get",
        url: `${API_URL}products/records`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pocketbase_token")}`,
        },
      });
    },
  });

  if (isLoading) {
    console.log("loading");
  }

  if (isSuccess) {
    console.log(productData);
  }

  // (newProduct: any) => {
  //   return axios.post(`${API_URL}products/records`, newProduct);
  // },

  // {
  //   onSuccess: () => {
  //     // Invalidate and refetch the 'products' query after a successful mutation
  //     queryClient.invalidateQueries("products");
  //   },
  // }

  // create a mutation on product
  const createProductMutation = useMutation({
    mutationKey: ["products"],
    mutationFn: async (newProduct: any) => {
      console.log(newProduct);
      await axios({
        method: "post",
        url: `${API_URL}products/records`,
        data: newProduct,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pocketbase_token")}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return (
    <section className="bg-slate-200 w-full min-h-screen flex flex-col items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <Form className="w-2/4 bg-blue-50 p-7" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            id="first_name"
            className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.name && (
            <span className="text-red-500 font-bold">
              This field is required
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            {...register("description", { required: "true" })}
            type="text"
            id="first_name"
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.description && (
            <span className="text-red-500 font-bold">
              This field is required
            </span>
          )}
        </div>
        <div className="">
          <label
            htmlFor="number-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            {...register("price", { required: "true" })}
            type="number"
            id="number-input"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.price && (
            <span className="text-red-500 font-bold">
              This field is required
            </span>
          )}
        </div>
        <div className="flex items-center me-4 mt-3">
          <input
            {...register("availability")}
            id="inline-checked-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="inline-checked-checkbox"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Availability
          </label>
        </div>
        <Button type="submit" className="mt-3 w-full">
          Submit
        </Button>
      </Form>

      {/* render results */}
      <div className="w-2/4 mt-2">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Product</TableHead>
              <TableHead className="text-right w-[200px]">
                {" "}
                Description
              </TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Availability</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <Skeleton />
            ) : (
              productData?.data?.items?.map((product: any) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-right">
                    {product.description}
                  </TableCell>
                  <TableCell className="text-right">{product.price}</TableCell>
                  <TableCell className="text-right">
                    {product.availability
                      ? "product currently available"
                      : "product currently not available"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </div>
    </section>
  );
};

export default Products;
