import ProductForm from "@/components/inputs/ProductForm";
import Layout from "@/components/layout/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

//to prowadzi do edita konretnego produktu
export default function EditProductPage({ product }) {
  return <Layout>{product && <ProductForm {...product} />}</Layout>;
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.params;
  const product = await Product.findById(id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
