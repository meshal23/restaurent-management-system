/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "react-router";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  // TableFooter,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import useDebounce from "../components/custom/useDebounce";

const API_URL = import.meta.env.VITE_POCKETBASE_URL;

const Products = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // use of useQuery for search
  const {
    data: searchProduct,
    isLoading: isSearchProductLoading,
    isSuccess: isSearchProductSuccess,
    isError: isSearchProductError,
    error: searchProductError,
  } = useQuery({
    queryKey: ["products", "search", debouncedSearchTerm],
    queryFn: async () => {
      const filter = encodeURIComponent(`name~'${debouncedSearchTerm}'`);
      const response = await axios({
        method: "get",
        url: `${API_URL}products/records?filter=(${filter})`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pocketbase_token")}`,
        },
      });

      return response;
    },
    enabled: !!debouncedSearchTerm,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    // console.log(data);
    // handleSubmit(data);
    createProductMutation.mutate(data);
    reset();
  };

  //useInfiniteQuery
  const {
    data,
    isLoading,
    isSuccess,
    // isError,
    // error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam = 1 }) => {
      // console.log(API_URL);
      const response = await axios({
        method: "get",
        url: `${API_URL}products/records?perPage=2&page=${pageParam}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pocketbase_token")}`,
        },
      });

      return {
        response,
        nextPage: pageParam + 1,
        // isLast: response.data.items.length < 2
      };
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  let productData;

  if (isSuccess) {
    // console.log(data.pages.flatMap((prod) => prod?.response?.data?.items));
    productData = data.pages.flatMap((prod) => prod?.response?.data?.items);
  }

  // console.log(data.pages.response);

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

  if (isSearchProductLoading) {
    console.log("loading search product");
  }

  if (isSearchProductSuccess) {
    console.log(searchProduct);
  }

  const searchProductData = searchProduct?.data.items;

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

      {/* search product */}
      <div className="w-2/4 mt-2 flex gap-3">
        <div className="w-4/5 mb-6">
          <input
            placeholder="Search Product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <Button onClick={() => setSearchTerm("")} className="w-1/5">
          Find
        </Button>
      </div>

      {!searchProduct ? (
        <div className="w-2/4 mt-2">
          <Table>
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
                productData?.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-right">
                      {product.description}
                    </TableCell>
                    <TableCell className="text-right">
                      {product.price}
                    </TableCell>
                    <TableCell className="text-right">
                      {product.availability
                        ? "product currently available"
                        : "product currently not available"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {hasNextPage && (
            <Button
              onClick={() => {
                fetchNextPage();
              }}
              disabled={isFetchingNextPage}
              className="w-full text-center"
            >
              {isFetchingNextPage ? "loading more..." : "load more products"}
            </Button>
          )}
        </div>
      ) : (
        <div className="w-2/4 mt-2">
          <Table>
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
              {isSearchProductLoading ? (
                <Skeleton />
              ) : (
                searchProductData?.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-right">
                      {product.description}
                    </TableCell>
                    <TableCell className="text-right">
                      {product.price}
                    </TableCell>
                    <TableCell className="text-right">
                      {product.availability
                        ? "product currently available"
                        : "product currently not available"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
};

export default Products;
