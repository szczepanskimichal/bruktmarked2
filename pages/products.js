import Layout from "@/components/layout/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductCard from "@/components/layout/ProductCard";
import { useState } from "react";

export default function ProductsPage({ products }) {
  const session = useSession();
  // console.log(session);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleAddClick() {
    if (session.status === "authenticated") {
      router.push("/products/new");
    } else {
      toast.error("Log in to add products.");
    }
  }

  return (
    <Layout>
      <div className="w-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h2 className="mb-0">All products</h2>
          <button onClick={handleAddClick} className="secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
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
              <ProductCard key={product._id} index={index} {...product} />
            ))
          )}
        </div>
      </div>
    </Layout>
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
