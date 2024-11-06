import Layout from "@/components/layout/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import useWishlist from "@/hooks/useWishlist";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductCard from "@/components/layout/ProductCard";
import { useState } from "react";
import Backdrop from "@/components/Backdrop";
import { AnimatePresence } from "framer-motion";
import axios from "axios";

export default function ProductsPage({ products }) {
  const [confirm, setConfirm] = useState(false);

  const session = useSession();
  // console.log(session);
  const router = useRouter();

  const { wishlist, setWishlist, loading } = useWishlist();

  function handleAddClick() {
    if (session.status === "authenticated") {
      router.push("/products/new");
    } else {
      toast.error("Log in to add products.");
    }
  }
  // do usowania
  async function handleDelete() {
    await axios.delete("/api/products/?id=" + confirm); // jakby w confirm wstawilem id produktu, bo tak bylo najlatwiej usunac, i pozniej dlubanie w ProductCard a najlepiej jednoczesnie
    toast.success("Product deleted!");
    setConfirm(false);
    router.push("/products");
  }

  return (
    <>
      <AnimatePresence>
        {confirm && (
          <Backdrop handleClose={handleDelete}>
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
        <div className="w-full flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h2 className="mb-0">All products</h2>
            <button onClick={handleAddClick} className="secondary">
              {/* Ikonka dodanie nowego produktu, zmienilem bo ta jest ladniejsza */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM12.75 12a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V18a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V12Z"
                  clipRule="evenodd"
                />
                <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
              </svg>
              Add a product
            </button>
          </div>
          <div className="flex flex-col sm:mx-10 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {session.status === "authenticated" && loading ? (
              <Spinner />
            ) : (
              products?.length > 0 &&
              products.map((product, index) => (
                <ProductCard
                  key={product._id}
                  index={index}
                  setConfirm={() => setConfirm(product._id)} // funkcja do usuwania produktu z All products powiazane z ProductCard
                  {...product}
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                />
              ))
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
