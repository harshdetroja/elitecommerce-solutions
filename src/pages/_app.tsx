import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";

export default function App({ Component, pageProps }: AppProps) {
  const [progress, setProgress] = useState(0);
  const [cart, setCart] = useState<any>({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState<any>({ value: null });
  const [key, setKey] = useState(0);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({ value: null });
    setKey(Math.random());
    router.push("/");
  };

  const saveTotal = (item: any) => {
    localStorage.setItem("total", JSON.stringify(item));
  };

  const saveCart = (item: any) => {
    localStorage.setItem("cart", JSON.stringify(item));

    let subt = 0;
    let keys = Object.keys(item);
    for (let i = 0; i < keys.length; i++) {
      subt += item[keys[i]].qty * item[keys[i]].price;
    }
    setSubTotal(subt);
    saveTotal(subt);
  };

  const addToCart = (
    itemCode: any,
    qty: any,
    price: any,
    name: any,
    size: any,
    variant: any
  ) => {
    let newCart = cart;

    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }

    // console.log("n--", newCart);

    setCart(newCart);
    saveCart(newCart);
  };

  const buyNow = (
    itemCode: any,
    qty: any,
    price: any,
    name: any,
    size: any,
    variant: any
  ) => {
    let newCart = { itemCode: { qty: 1, price, name, size, variant } };
    setCart(newCart);
    saveCart(newCart);
    router.push("/Checkout");
  };

  const resetCart = () => {
    setCart({});
    saveCart({});
    saveTotal(0);
  };

  const removeFromCart = (
    itemCode: any,
    qty: any,
    price: any,
    name: any,
    size: any,
    variant: any
  ) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }

    if (cart[itemCode].qty <= 0) delete newCart[itemCode];
    setCart(newCart);
    saveCart(newCart);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    // console.log("fst--", "Hello");
    try {
      if (localStorage.getItem("cart")) {
        let newCart = localStorage.getItem("cart");
        let newTotal = localStorage.getItem("total");
        setSubTotal(parseInt(newTotal || ""));
        // console.log("n--", newCart);
        setCart(JSON.parse(newCart || ""));
      }
      let token = localStorage.getItem("token");
      console.log("tk--", token);
      if (token) {
        setUser({ value: token });
        setKey(Math.random());
      }
    } catch (er) {
      console.error(er);
      localStorage.clear();
    }
  }, [router.query]);

  return (
    <>
      <LoadingBar
        color="#1D4ED8"
        progress={progress}
        waitingTime={300}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar
        Logout={handleLogout}
        user={user}
        keys={key}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        resetCart={resetCart}
        subTotal={subTotal}
      />
      <Component
        {...pageProps}
        buyNow={buyNow}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        resetCart={resetCart}
        subTotal={subTotal}
      />
      <Footer />
    </>
  );
}
