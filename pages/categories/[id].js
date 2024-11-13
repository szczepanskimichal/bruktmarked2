import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/layout/ProductCard";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";

export default function CategoryPage({ category, products }) {
  return (
    <Layout>
      <div className="flex flex-col gap-10">
        <div className="lg:min-w-[50rem] xl:min-w-[70rem] flex flex-col sm:flex-row gap-5 justify-between">
          <div className="flex gap-5 items=center">
            <h2 className="mb-0">{category.name}</h2>
          </div>
        </div>
        <div className="flex flex-col sm:mx-10 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product, index) => (
            <ProductCard product={product} index={index} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const category = await Category.findById(id);
  const products = await Product.find({ category: id });
  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
