import { useRouter } from "next/router";
import Product from "../../models/Product";
import mongoose from "mongoose";
import { useState } from "react";
import { json } from "stream/consumers";

interface SizeObject {
  [size: string]: {
    slug: string;
  };
}

interface ColorObject {
  [color: string]: SizeObject;
}

interface YourObject {
  [key: string]: ColorObject;
}

export default function Page({ buyNow, addToCart, product, variants }: any) {
  // console.log(Object.keys(variants["Blue"]));
  // console.log(product.size);
  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);
  const [sList, setSList] = useState(variants[color]);
  const [inputPin, setInputPin] = useState("");
  const [serv, setServ] = useState<boolean | null>(null);
  const router = useRouter();
  const { slug } = router.query;

  const refreshVariantColor = (newcolor: any) => {
    let ind = Object.keys(variants[newcolor]);
    let url = `http://localhost:3000/${variants[newcolor][ind[0]]["slug"]}`;
    window.location.href = url;
  };

  const refreshVariantSize = (newcolor: any, newsize: any) => {
    // let ind = Object.keys(variants[newcolor]);
    let url = `http://localhost:3000/${variants[newcolor][newsize]["slug"]}`;
    window.location.href = url;
  };

  const checkService = async () => {
    let pin = await fetch("http://localhost:3000/api/pinCode");
    let pinData = await pin.json();

    if (pinData.pin.includes(parseInt(inputPin))) {
      setServ(true);
    } else {
      setServ(false);
    }
  };

  const handleCheck = () => {
    if (inputPin === "") {
      setServ(null);
      return;
    }
    checkService();
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden flex justify-center items-center">
      <div className="container px-5 py-24 max-w-[1024px]">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="h-96 object-center rounded"
            src={product.img}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest"></h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.title}
            </h1>
            {/* <div className="flex mb-4">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div> */}
            <p className="leading-relaxed">{product.desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {Object.keys(variants).includes("Red") &&
                  Object.keys(variants["Red"]) && (
                    <button
                      className={`border-2 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${
                        color === "Red" ? "border-black" : ""
                      }`}
                      onClick={() => {
                        refreshVariantColor("Red");
                      }}
                    ></button>
                  )}
                {Object.keys(variants).includes("Green") &&
                  Object.keys(variants["Green"]) && (
                    <button
                      className={`border-2 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none ${
                        color === "Green" ? "border-black" : ""
                      }`}
                      onClick={() => {
                        refreshVariantColor("Green");
                      }}
                    ></button>
                  )}
                {Object.keys(variants).includes("Blue") &&
                  Object.keys(variants["Blue"]) && (
                    <button
                      className={`border-2 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none ${
                        color === "Blue" ? "border-black" : ""
                      }`}
                      onClick={() => {
                        refreshVariantColor("Blue");
                      }}
                    ></button>
                  )}
                {Object.keys(variants).includes("Yellow") &&
                  Object.keys(variants["Yellow"]) && (
                    <button
                      className={`border-2 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none ${
                        color === "Yellow" ? "border-black" : ""
                      }`}
                      onClick={() => {
                        refreshVariantColor("Yellow");
                      }}
                    ></button>
                  )}
                {Object.keys(variants).includes("Black") &&
                  Object.keys(variants["Black"]) && (
                    <button
                      className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${
                        color === "Black" ? "border-black" : ""
                      }`}
                      onClick={() => {
                        refreshVariantColor("Black");
                      }}
                    ></button>
                  )}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select
                    value={size}
                    onChange={(e: any) => {
                      refreshVariantSize(color, e.target.value);
                    }}
                    className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10"
                  >
                    {Object.keys(sList).includes("XS") && (
                      <option value={"XS"}>XS</option>
                    )}
                    {Object.keys(sList).includes("S") && (
                      <option value={"S"}>S</option>
                    )}
                    {Object.keys(sList).includes("M") && (
                      <option value={"M"}>M</option>
                    )}
                    {Object.keys(sList).includes("L") && (
                      <option value={"L"}>L</option>
                    )}
                    {Object.keys(sList).includes("XL") && (
                      <option value={"XL"}>XL</option>
                    )}
                    {Object.keys(sList).includes("XXL") && (
                      <option value={"XXL"}>XXL</option>
                    )}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-x-4 items-center">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${product.price}
              </span>
              <button
                className="flex  text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded"
                onClick={() => {
                  buyNow(slug, 1, product.price, product.title, size, color);
                }}
              >
                Buy Now
              </button>
              <button
                className="flex text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded"
                onClick={() => {
                  addToCart(slug, 1, product.price, product.title, size, color);
                }}
              >
                Add to Cart
              </button>
              {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button> */}
            </div>
            <div className="flex mt-4 gap-x-4 text-sm">
              <input
                type="text"
                name=""
                id=""
                placeholder="Pincode"
                className="border border-blue-500 p-2 outline-none rounded-md"
                onChange={(e) => {
                  setInputPin(e.target.value);
                }}
              />
              <button
                className="flex text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded"
                onClick={handleCheck}
              >
                Check
              </button>
            </div>
            {serv && serv != null && (
              <p className="text-sm text-green-500">
                Yay ! We deliver at this location.
              </p>
            )}
            {!serv && serv != null && (
              <p className="text-sm text-red-500">
                Sorry ! We do not deliver at this location.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context: any) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI!);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  let variants = await Product.find({
    title: product.title,
    category: product.category,
  });
  // console.log("var--", variants);
  let colorSizeSlug: YourObject = {};

  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  // console.log("clg--", colorSizeSlug);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
}
