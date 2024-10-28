import Layout from "@/components/layout/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Color } from "@/models/Color";
import { Product } from "@/models/Product";
import { Size } from "@/models/Size";
import { User } from "@/models/User";
import { fadeIn } from "@/utils/motion";
import CartIcon from "@/components/icons/CartIcon";
import EditIcon from "@/components/icons/EditIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
// import DetailsTabs from "@/components/buttons/DetailsTabs";

export default function ProductPage({ product, category, color, size, user }) {
  const session = useSession();
  return (
    <>
      <Layout>
        <div className="flex flex-col items-center">
          <div className="w-full lg:w-[80%] flex flex-col items-start justify-center md:grid grid-cols-2 gap-10 md:px-5 xl:p-10 mb-5">
            <motion.div
              variants={fadeIn("right", "spring", 0.1, 1)}
              initial="hidden"
              whileInView="show"
              className="w-full box p-5"
            >
              <img
                src="https://images.eatthismuch.com/img/207909_tabitharwheeler_db2162f4-e020-4ba7-aa63-9f982c258588.jpg"
                alt=""
              />
            </motion.div>
            <motion.div
              variants={fadeIn("left", "spring", 0.3, 1)}
              initial="hidden"
              whileInView="show"
              className="p-5 bg-white/20 rounded-xl flex flex-col items-start justify-between w-full h-full gap-5"
            >
              <div className="flex flex-col gap-2 items-start w-full">
                <h3 className="text-3xl mb-0 text-color-800">
                  {product.title}
                </h3>
                <h3 className="mb-0 font-normal">USD ${product.price}</h3>
                <hr className="my-3 border-color-600 w-full" />
                <div className="flex w-full mb-3 gap-3 justify-between">
                  <div className="flex-1">
                    <label>Category</label>
                    <div className="flex gap-3 mt-1">
                      <div className="bg-white py-2 px-4 whitespace-nowrap rounded-md shadow-md text-color-700 w-full">
                        {category?.name || "No category"}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label>Usage</label>
                    <div className="flex gap-3 mt-1">
                      <div className="bg-white py-2 px-4 rounded-md shadow-md text-color-700 w-full">
                        {product.used ? "Used" : "New"}
                      </div>
                    </div>
                  </div>
                  {color && (
                    <div className="flex-1">
                      <label>Color</label>
                      <div className="flex gap-3 mt-1">
                        <div className="bg-white py-2 px-4 rounded-md flex gap-2 items-center justify-between shadow-md text-color-700 w-full">
                          <div
                            style={{ backgroundColor: `#${color.value}` }}
                            className="rounded-full size-5"
                          ></div>
                          {color.name}
                        </div>
                      </div>
                    </div>
                  )}
                  {size && (
                    <div className="flex-1">
                      <label>Color</label>
                      <div className="flex gap-3 mt-1">
                        <div className="bg-white py-2 px-4 rounded-md shadow-md text-color-700 w-full">
                          {size.name}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {session?.data?.user.id !== user._id && (
                  <button className="primary" onClick={() => {}}>
                    <CartIcon className="size-7" />
                    Add to Cart
                  </button>
                )}
              </div>
              <div>
                {session.status === "authenticated" &&
                session?.data?.user.id === user._id ? (
                  <div className="flex gap-3 mb-3">
                    <Link href={"/products/edit/" + product._id}>
                      <button className="text-white bg-gray-500">
                        <EditIcon className="size-4" />
                        Edit
                      </button>
                    </Link>
                    <button className="text-white bg-red-500">
                      <DeleteIcon className="size-4" />
                      Delete
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-x-2 sm:items-center text-color-800 text-sm sm:text-normal">
                    Listed by:{" "}
                    <span className="text-black underline">{user?.email}</span>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-x-2 sm:items-center text-color-800 text-sm sm:text-normal">
                  Product posted on:{" "}
                  <span className="text-black">
                    {format(
                      new Date(product.createdAt),
                      "dd/MM/yyyy, h:mm:ss a"
                    )}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-x-2 sm:items-center text-color-800 text-sm sm:text-normal">
                  Product recently updated on:{" "}
                  <span className="text-black">
                    {format(
                      new Date(product.updatedAt),
                      "dd/MM/yyyy, h:mm:ss a"
                    )}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
          <DetailsTabs product={product} />
        </div>
      </Layout>
    </>
  );
}
export async function getServerSideProps(context) {
  await mongooseConnect();

  const { id } = context.query;
  // console.log("Product ID:", id);

  const product = await Product.findById(id);
  const category = await Category.findById(product.category);
  const color = await Color.findById(product.color);
  const size = await Size.findById(product.size);
  const user = await User.findById(product.user);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      category: JSON.parse(JSON.stringify(category)),
      color: JSON.parse(JSON.stringify(color)),
      size: JSON.parse(JSON.stringify(size)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
