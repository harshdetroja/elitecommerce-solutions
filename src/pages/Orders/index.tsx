import React, { useEffect } from "react";
import router from "next/router";
const Orders = () => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
  return <div>Orders</div>;
};

export default Orders;
