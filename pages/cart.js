import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import useProfile from "@/hooks/useProfile";
import Spinner from "@/components/Spinner";
import UserForm from "@/components/inputs/UserForm";
import { use, useContext, useEffect, useState } from "react";
import { CartContext } from "@/hooks/CartContext";
import Table from "@/components/layout/Table";
import axios from "axios";

export default function CartPage() {
  const { cartProducts, clearCart } = useContext(CartContext);
  const { user, loading } = useProfile();
  const [products, setProducts] = useState([]);
  const [fadeDirection, setFadeDirection] = useState(getFadeDirection());

  function getFadeDirection() {
    if (typeof window !== "undefined") {
      return window.innerWidth < 640 ? "down" : "left";
    }
    return "left";
  }

  useEffect(() => {
    function handleResize() {
      setFadeDirection(getFadeDirection());
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((res) => {
        setProducts(res.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  // teraz po napisaniu useeffecta musisz napisac api bo znowu zapomnialem i niewiedzialem dlaczego mi sie nic nie wyswietla, moze wogole na przyszlosc sobie przemyslisz i zaczniesz api pisac najpierw?
  return (
    <Layout>
      <div className="flex justify-center p-0 sm:p-10">
        <div className="sm:min-w-[40rem] sm:w-[80%] flex flex-col sm:grid grid-cols-3 gap-10 items-start">
          <motion.div
            variants={fadeIn("right", "spring", 0.1, 1)}
            initial="hidden"
            whileInView="show"
            className="box p-5 col-span-2 text-sm sm:text-normal w-full"
          >
            {!cartProducts?.length && (
              <h3 className="text-2xl font-bold">Your cart is empty.</h3>
            )}
            {products?.length > 0 && (
              <>
                <h3>Cart</h3>
                <Table cartProducts={cartProducts} products={products} />
              </>
            )}
          </motion.div>
          <motion.div
            variants={fadeIn("left", "spring", 0.3, 1)}
            initial="hidden"
            whileInView="show"
            className="box p-5 sticky top-[120px]"
          >
            <h3 className="text-2xl font-bold mb-3">Order information</h3>
            {loading ? (
              <Spinner />
            ) : (
              <div className="w-full">
                <UserForm user={user} cartProducts={cartProducts} />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
