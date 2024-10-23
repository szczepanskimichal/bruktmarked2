import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import ImageInput from "./ImageInput";

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
  const [color, setColor] = useState(assignedColor || null);
  const [newColor, setNewColor] = useState("");
  const [size, setSize] = useState(assignedSize || null);
  const [newSize, setNewSize] = useState("");
  const [price, setPrice] = useState(existingPrice || "");
  const [used, setUsed] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const router = useRouter();
  const session = useSession();
  return (
    <motion.form
      variants={fadeIn("up", "spring", 0.2, 1)}
      initial="hidden"
      whileInView="show"
      className="sm:px-5 flex flex-col gap-5 items-start"
    >
      <div className="grid md:grid-cols-3 lg:grid-cols-2 gap-10">
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
        <ImageInput />
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
