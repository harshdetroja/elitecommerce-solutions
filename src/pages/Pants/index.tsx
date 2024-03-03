import Link from "next/link";
import React from "react";
import Product from "../../../models/Product";
import mongoose from "mongoose";
import { Span } from "next/dist/trace";

interface ProductProp {
  title: string;
  availableQty: number;
  color: string[];
  size: string[];
  price: Number;
  img: string;
  desc: string;
  slug: string;
  category?: string;
  // Add other properties as needed
}

const Pants = ({ products }: any) => {
  return (
    <section className="text-gray-600 body-font flex justify-center items-center">
      <div className="container px-5 py-20">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {Object.keys(products).map((item: any) => {
            return (
              <div
                key={products[item]._id}
                className=" p-4  shadow-md rounded-lg"
              >
                <Link
                  href={`/${products[item].slug}`}
                  className="relative h-48 rounded overflow-hidden flex justify-center items-center"
                >
                  <img
                    alt="ecommerce"
                    className=" object-center h-full block"
                    src={products[item].img}
                  />
                </Link>
                <div className="mt-4">
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {products[item].title}
                  </h2>
                  <p className="mt-1">${products[item].price}</p>
                </div>
                <div className="flex text-black gap-x-2 mt-3">
                  {products[item].size.includes("XS") && (
                    <span className="border-2 p-1 text-xs">XS</span>
                  )}
                  {products[item].size.includes("S") && (
                    <span className="border-2 p-1 text-xs">S</span>
                  )}
                  {products[item].size.includes("M") && (
                    <span className="border-2 p-1 text-xs">M</span>
                  )}
                  {products[item].size.includes("L") && (
                    <span className="border-2 p-1 text-xs">L</span>
                  )}
                  {products[item].size.includes("XL") && (
                    <span className="border-2 p-1 text-xs">XL</span>
                  )}
                  {products[item].size.includes("XXL") && (
                    <span className="border-2 p-1 text-xs">XXL</span>
                  )}
                </div>
                <div className="flex text-black gap-x-2 mt-3">
                  {products[item].color.includes("Red") && (
                    <span className="border-2 border-gray-300 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></span>
                  )}
                  {products[item].color.includes("Green") && (
                    <span className="border-2 border-gray-300 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></span>
                  )}
                  {products[item].color.includes("Blue") && (
                    <span className="border-2 border-gray-300 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></span>
                  )}
                  {products[item].color.includes("Yellow") && (
                    <span className="border-2 border-gray-300 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></span>
                  )}
                  {products[item].color.includes("Black") && (
                    <span className="border-2 border-gray-300 bg-black rounded-full w-6 h-6 focus:outline-none"></span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context: any) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI!);
  }
  let products = await Product.find({ category: "Pant" });
  let Pants: { [key: string]: ProductProp } = {};

  for (let item of products) {
    if (item.title in Pants) {
      if (
        !Pants[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        Pants[item.title].color.push(item.color);
      }
      if (
        !Pants[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        Pants[item.title].size.push(item.size);
      }
    } else {
      Pants[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        Pants[item.title].color = [item.color];
        Pants[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(Pants)) },
  };
}

export default Pants;
