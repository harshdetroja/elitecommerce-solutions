import React, { useEffect } from "react";
import router from "next/router";

const MyAccount = () => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
  return <div>MyAccount</div>;
};

export default MyAccount;
