import Backdrop from "@/components/Backdrop";
import Spinner from "@/components/Spinner";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/layout/ProductCard";
import useWishlist from "@/hooks/useWishlist";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  const { wishlist, setWishlist, loading: wishlistLoading } = useWishlist();
  const session = useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(false);

  async function handleDelete() {
    await axios.delete("/api/products/?id=" + confirm);
    toast.success("Product deleted!");
    setConfirm(false);
    router.push("/products");
  }

  useEffect(() => {
    if (q) {
      setLoading(true);
      try {
        axios.get(`/api/search?q=${q}`).then((response) => {
          setProducts(response.data);
        });
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
      setLoading(false);
    }
  }, [q]);
  return (
    <>
      {/* // to jest do usowania */}
      <AnimatePresence>
        {confirm && (
          <Backdrop handleClose={() => setConfirm(false)}>
            <h3>Are you sure you want to delete this product?</h3>
            <div className="flex gap-3 justify-center">
              <button onClick={handleDelete} className="delete">
                Yes, delete!
              </button>
              <button onClick={() => setConfirm(false)} className="cancel">
                No, cancel.
              </button>
            </div>
          </Backdrop>
        )}
      </AnimatePresence>
      <Layout>
        <h2 className="mb-5">Search results for "{q}"</h2>
        {session.status === "authenticated" && loading && wishlistLoading ? (
          <Spinner />
        ) : products?.length > 0 ? (
          <div className="flex flex-col sm:mx-10 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {products.map((product, index) => (
              <ProductCard
                key={product._id}
                {...product}
                index={index}
                wishlist={wishlist}
                setWishlist={setWishlist}
                setConfirm={() => setConfirm(product._id)}
              />
            ))}
          </div>
        ) : (
          <p>No products under this query.</p>
        )}
      </Layout>
    </>
  );
}
