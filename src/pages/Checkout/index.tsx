import Link from "next/link";
import React from "react";
import Head from "next/head";
import Script from "next/script";

const index = (props: any) => {
  // const initiatePayment = async () => {
  //   let oid = Math.floor(Math.random() * Date.now());
  //   const data = {
  //     cart: props.cart,
  //     subTotal: props.subTotal,
  //     oid,
  //     email: "email",
  //   };

  //   let a = await fetch("https://localhost:3000/api/pretransaction", {
  //     method: "POST", // or 'PUT'
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   let tsToken = await a.json();
  //   console.log("Success:", tsToken);

  //   var config = {
  //     root: "",
  //     flow: "DEFAULT",
  //     data: {
  //       orderId: oid /* update order id */,
  //       token: tsToken /* update token value */,
  //       tokenType: "TXN_TOKEN",
  //       amount: props.subTotal /* update amount */,
  //     },
  //     handler: {
  //       notifyMerchant: function (eventName: any, data: any) {
  //         console.log("notifyMerchant handler function called");
  //         console.log("eventName => ", eventName);
  //         console.log("data => ", data);
  //       },
  //     },
  //   };

  //   window.Paytm.CheckoutJS.init(config)
  //     .then(function onSuccess() {
  //       // after successfully updating configuration, invoke JS Checkout
  //       window.Paytm.CheckoutJS.invoke();
  //     })
  //     .catch(function onError(error: any) {
  //       console.log("error => ", error);
  //     });
  // };
  return (
    <div className="flex justify-center items-center mt-10 max-lg:px-4">
      <div className="container max-w-[1024px]">
        <h1 className="text-4xl font-bold text-center">Checkout Page</h1>
        <div className="mt-10">
          <h2 className="text-xl font-bold">1. Delivery Details</h2>
          <div className="flex gap-x-6  mt-4">
            <div className="w-full">
              <label htmlFor="name">Name:</label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                placeholder=" Name"
                className="border-[1px] border-blue-500 p-2 w-full mt-1"
              />
            </div>
            <div className="w-full">
              <label htmlFor="email">Email:</label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="border-[1px] border-blue-500 p-2 w-full mt-1"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="address">Address:</label>
            <br />
            <textarea
              name="address"
              id=""
              cols={50}
              rows={2}
              placeholder="Address"
              className="border-[1px] border-blue-500 w-full p-2"
            />
          </div>
          <div className="flex gap-x-6  mt-4">
            <div className="w-full">
              <label htmlFor="phone">Phone:</label>
              <br />
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="Phone number"
                className="border-[1px] border-blue-500 p-2 w-full mt-1"
              />
            </div>
            <div className="w-full">
              <label htmlFor="city">City:</label>
              <br />
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                className="border-[1px] border-blue-500 p-2 w-full mt-1"
              />
            </div>
          </div>
          <div className="flex gap-x-6  mt-4">
            <div className="w-full">
              <label htmlFor="state">State:</label>
              <br />
              <input
                type="text"
                name="state"
                id="state"
                placeholder="State"
                className="border-[1px] border-blue-500 p-2 w-full mt-1"
              />
            </div>
            <div className="w-full">
              <label htmlFor="pincode">Pincode:</label>
              <br />
              <input
                type="number"
                name="pincode"
                id="pincode"
                placeholder="Pincode"
                className="border-[1px] border-blue-500 p-2 w-full mt-1"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-xl font-bold">2. Review Cart Items</h2>
          <div className="w-full">
            <div className="flex flex-col items-center w-full">
              {Object.keys(props.cart).length == 0 && (
                <div className="mt-8  font-bold ">Cart is Empty !</div>
              )}
              <div className="mt-6 sm:w-1/2 w-2/3">
                {Object.keys(props.cart).map((k) => {
                  return (
                    <div
                      key={k}
                      className="flex justify-between items-center gap-x-10 mt-2 bg-white p-2 rounded-md border-[1px] border-blue-500 w-full"
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
              {/* <div className="flex gap-x-4 mt-6">
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
              </div> */}
            </div>
          </div>
          <h2 className="text-black text-xl font-semibold mt-4">
            Subtotal : ${props.subTotal}
          </h2>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-10"
          // onClick={initiatePayment}
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default index;
