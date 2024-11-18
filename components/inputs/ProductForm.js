import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import ImageInput from "./ImageInput";
import ChooseAdd from "./ChooseAdd";
import axios from "axios";
import toast from "react-hot-toast";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/dist/css/rcp.css";

export default function ProductForm({
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  color: assignedColor,
  size: assignedSize,
  _id,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(assignedCategory || null);
  const [newCategory, setNewCategory] = useState("");
  const [color, setColor] = useColor(assignedColor || "#000000");
  const [size, setSize] = useState(assignedSize || null);
  const [newSize, setNewSize] = useState("");
  const [price, setPrice] = useState(existingPrice || "");
  const [used, setUsed] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    // do wyswietlania wszystkich kategorii
    fetchCategories();
    fetchSizes();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
    });
  }

  function fetchSizes() {
    axios.get("/api/sizes").then((response) => {
      setSizes(response.data);
    });
  }
  async function saveProduct(e) {
    e.preventDefault();
    if (session.status === "authenticated") {
      if (price === "" || title === "") {
        toast.error("Fill all the necessary fields.");
      } else {
        const data = {
          email: session?.data?.user.email,
          title,
          description,
          price,
          images,
          category,
          color: color.hex,
          size,
          used,
        };
        if (_id) {
          await axios.put("/api/products", { ...data, _id });
        } else {
          await axios.post("/api/products", data);
        }
        router.push("/products");
        toast.success("Product saved!");
      }
    } else {
      toast.error("Authenticate to add a product.");
    }
  }

  return (
    <motion.form
      onSubmit={saveProduct}
      variants={fadeIn("up", "spring", 0.2, 1)}
      initial="hidden"
      whileInView="show"
      className="sm:px-5 flex flex-col  items-start gap-5"
    >
      <div className="flex flex-col md:flex-row justify-center gap-10 items-start">
        <div className="md:col-span-2 lg:col-span-1">
          <label>Product name</label>
          <input
            type="text"
            placeholder="Product name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Usage</label>
          <select value={used} onChange={(e) => setUsed(e.target.value)}>
            <option value={true}>Used</option>
            <option value={false}>New</option>
          </select>
          <ChooseAdd
            item={category}
            setItem={setCategory}
            items={categories}
            newItem={newCategory}
            setNewItem={setNewCategory}
            fetchItems={fetchCategories}
            itemName="category"
            api="categories"
          />

          <ChooseAdd
            item={size}
            setItem={setSize}
            items={sizes}
            newItem={newSize}
            setNewItem={setNewSize}
            fetchItems={fetchSizes}
            itemName="size"
            api="sizes"
          />
          <label>Description</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Price (in USD)</label>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start gap-5">
          <ImageInput images={images} setImages={setImages} />
          <label className="flex gap-2">
            Color
            <div
              style={{ backgroundColor: color.hex }}
              className="rounded-full size-5"
            ></div>
          </label>
          <div className="flex gap-3">
            <div className="w-[90vw] sm:w-[200px]">
              <ColorPicker
                color={color}
                onChange={setColor}
                hideInput
                hideAlpha
              />
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="primary w-full sm:w-[100px] flex justify-center"
      >
        Save
      </button>
    </motion.form>
  );
}
