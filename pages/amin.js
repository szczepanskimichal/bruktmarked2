import Layout from "@/components/layout/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminPage() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState("");
  const [sizes, setSizes] = useState([]);
  const [chosen, setChosen] = useState("category");
  const admin = "michalszczepanski07@gmail.com";
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return;
    }
    const timeoutId = setTimeout(() => {
      if (!session?.user?.email && session.user.email !== admin) {
        router.push("/");
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [status, router]);

  async function addCategory(e) {
    e.preventDefault();
    try {
      if (category !== "") {
        await axios.post("/api/categories", {
          name: category,
        });
        setCategory("");
        toast.success("Category added successfully!");
        fetchCategories();
      }
    } catch (error) {
      toast.error("Error while adding.");
    }
  }
  async function addSize(e) {
    e.preventDefault();
    try {
      if (size !== "") {
        await axios.post("/api/sizes", {
          name: size,
        });
        setSize("");
        toast.success("Size added successfully!");
        fetchSizes();
      }
    } catch (error) {
      toast.error("Error while adding.");
    }
  }
  useEffect(() => {
    fetchCategories();
    fetchSizes();
  }, [sizes, categories]);
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
  if (status === "loading") {
    return (
      <div className="flex justify-center mt-10">
        <Spinner />
      </div>
    );
  }
  return (
    <Layout>
      <div className="flex justify-center gap-3 mb-5">
        <button onClick={() => setChosen("category")} className="secondary">
          Categories
        </button>
        <button onClick={() => setChosen("size")} className="secondary">
          Sizes
        </button>
      </div>
      <div className="mx-auto max-w-xl flex flex-col gap-3">
        {chosen === "category" && (
          <form onSubmit={addCategory} className="flex gap-2 items-center">
            <input
              className="mb-0"
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button type="submit" className="primary">
              Save
            </button>
          </form>
        )}
        {chosen === "size" && (
          <form onSubmit={addSize} className="flex gap-2 items-center">
            <input
              className="mb-0"
              type="text"
              placeholder="Size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            <button type="submit" className="primary">
              Save
            </button>
          </form>
        )}
        <div className="flex flex-col gap-1">
          {(chosen === "category" ? categories : sizes)?.map((item, index) => (
            <div
              key={index}
              className="w-full flex justify-between items-center bg-color-100 border-2 border-color-700 rounded-md p-2"
            >
              {item.name}
              <button
                className="text-red-500"
                onClick={() => {
                  axios.delete(
                    `/api/${
                      chosen === "category" ? "categories" : "sizes"
                    }?_id=${item._id}`
                  );
                  toast.error("Property deleted!");
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
