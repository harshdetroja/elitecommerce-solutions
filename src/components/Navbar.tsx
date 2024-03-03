import React, { useRef } from "react";
import Link from "next/link";
import { useState } from "react";

export const Navbar = (props: any) => {
  const cartRref = useRef<HTMLInputElement>("div" as any);
  const [toggleDown, setToggleDown] = useState(false);

  const toggleCart = () => {
    // console.log(cartRref.current.classList);
    if (cartRref.current.classList.contains("translate-x-full")) {
      cartRref.current.classList.remove("translate-x-full");
      cartRref.current.classList.add("translate-x-0");
    } else {
      cartRref.current.classList.remove("translate-x-0");
      cartRref.current.classList.add("translate-x-full");
    }
  };
  return (
    <>
      <nav className="flex justify-between max-[320px]:gap-x-2 px-4 sm:px-8 py-2 sm:py-4 items-center shadow-lg sticky top-0 bg-white z-20">
        <div className="flex max-sm:flex-col  sm:justify-between items-center sm:gap-x-20 max-sm:gap-y-1">
          <div className="text-blue-500 hover:text-gray-700 text-lg sm:text-2xl">
            <Link href={"/"}>EliteEcommerce</Link>
          </div>
          <ul className="flex gap-x-4 sm:gap-x-6 max-sm:text-sm">
            <Link
              href={"/Tshirts"}
              className="text-blue-500 hover:text-gray-700"
            >
              <li>Tshirts</li>
            </Link>
            <Link
              href={"/Shirts"}
              className="text-blue-500 hover:text-gray-700"
            >
              <li>Shirts</li>
            </Link>
            <Link
              href={"/Hoddies"}
              className="text-blue-500 hover:text-gray-700"
            >
              <li>Hoddies</li>
            </Link>
            <Link href={"/Pants"} className="text-blue-500 hover:text-gray-700">
              <li>Pants</li>
            </Link>
          </ul>
        </div>

        <div className="flex gap-x-1.5 sm:gap-x-4">
          {props.user.value && (
            <button
              onClick={() => {
                setToggleDown(!toggleDown);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-6 sm:w-8 sm:h-6 text-blue-500 hover:text-gray-700"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
          )}
          {toggleDown && (
            <ul className="absolute bg-blue-400 text-sm text-white top-12 right-20 flex flex-col p-4 rounded space-y-1">
              <li>
                <Link href={"/Myaccount"} className=" hover:text-blue-700">
                  My Account
                </Link>
              </li>
              <li>
                <Link href={"/Orders"} className=" hover:text-blue-700">
                  Orders
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    props.Logout();
                    setToggleDown(false);
                  }}
                  className=" hover:text-blue-700"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
          {props.user.value == null && (
            <Link
              href={"/Login"}
              className="bg-blue-500 text-xs md:text-sm text-white py-1 px-3 sm:py-2 sm:px-4 rounded-full"
            >
              Login
            </Link>
          )}
          <button onClick={toggleCart}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 hover:text-gray-700"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </button>
        </div>
        <div
          ref={cartRref}
          className="absolute bg-blue-500  h-[100vh] top-0 right-0 z-10 transform transition-transform translate-x-full w-[320px]"
        >
          <button className="absolute right-4 top-4" onClick={toggleCart}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              className="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>

          <div className="px-2">
            <hr className="mt-16" />
            <div className="flex flex-col items-center ">
              <h1 className="text-3xl font-semibold mt-2 text-white">
                Shopping Cart
              </h1>
              {Object.keys(props.cart).length == 0 && (
                <div className="mt-8 text-white font-bold ">
                  Cart is Empty !
                </div>
              )}
              <div className="mt-6">
                {Object.keys(props.cart).map((k) => {
                  return (
                    <div
                      key={k}
                      className="flex justify-between items-center gap-x-10 mt-2 bg-white p-2 rounded-md"
                    >
                      <h1>
                        {props.cart[k].name} [{props.cart[k].size}/
                        {props.cart[k].variant}]
                      </h1>
                      <div className="flex gap-x-2">
                        <button
                          className="bg-white"
                          onClick={() => {
                            props.removeFromCart(
                              k,
                              1,
                              props.cart[k].price,
                              props.cart[k].name,
                              props.cart[k].size,
                              props.cart[k].variant
                            );
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="white"
                            className="w-4 h-4 rounded-full bg-blue-500"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M5 12h14"
                            />
                          </svg>
                        </button>
                        <p>{props.cart[k].qty}</p>
                        <button
                          className="bg-white"
                          onClick={() => {
                            props.addToCart(
                              k,
                              1,
                              props.cart[k].price,
                              props.cart[k].name,
                              props.cart[k].size,
                              props.cart[k].variant
                            );
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="white"
                            className="w-4 h-4 rounded-full bg-blue-500"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-x-4 mt-6">
                <Link href={"/Checkout"}>
                  <button className="bg-white text-blue-500 py-2 px-4 rounded-md border-2 border-blue-700 shadow-lg">
                    Check Out
                  </button>
                </Link>
                <button
                  className="bg-white text-blue-500 py-2 px-4 rounded-md border-2 border-blue-700 shadow-lg"
                  onClick={() => {
                    props.resetCart();
                  }}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
