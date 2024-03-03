import React from "react";

const Order = () => {
  return (
    <div className="flex justify-center items-center mt-10 px-4">
      <div className="container max-w-[1024px] flex flex-col justify-center items-center">
        <h3 className="text-gray-400 font-md">EliteCommerce.com</h3>
        <h1 className="text-3xl font-semibold">Order Id: #210701</h1>
        <p className="text-green-500 mt-6">
          Your Order has placed successfully
        </p>

        <table className="text-center mt-4">
          <thead>
            <tr className="text-blue-500">
              <th className="py-2 px-4 text-xl">Item Description</th>
              <th className="py-2 px-4 text-xl">Quantiy</th>
              <th className="py-2 px-4 text-xl">Item total</th>
            </tr>
          </thead>
          <tbody className="">
            <tr className="border-t-[1px] border-gray-300">
              <td className="py-2 px-4">Wear tshirst</td>
              <td className="py-2 px-4">1</td>
              <td className="py-2 px-4">$499</td>
            </tr>
            <tr className="border-t-[1px] border-gray-300">
              <td className="py-2 px-4">Wear tshirst</td>
              <td className="py-2 px-4">1</td>
              <td className="py-2 px-4">$499</td>
            </tr>
            <tr className="border-t-[1px] border-gray-300">
              <td className="py-2 px-4">Wear tshirst</td>
              <td className="py-2 px-4">1</td>
              <td className="py-2 px-4">$499</td>
            </tr>
          </tbody>
        </table>
        <div className="flex max-sm:flex-col justify-between items-center  sm:w-1/2 md:px-10 mt-6 max-sm:space-y-6">
          <h1 className="text-xl font-medium sm:order-last">Subtotal: $1595</h1>
          <button className="text-white bg-blue-500 py-2 px-4 rounded-lg ">
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
