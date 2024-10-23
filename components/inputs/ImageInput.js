import axios from "axios";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import Spinner from "../Spinner";

export default function ImageInput({ images, setImages }) {
  const [loading, setLoading] = useState(false);
  async function uploadImages(e) {
    const files = e.target?.files;
    if (files?.length > 0) {
      setLoading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const response = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...response.data.links];
      });
      setLoading(false);
    }
  }
  function updateImagesOrder(images) {
    setImages(images);
  }
  function removeImage(removedImage) {
    setImages(images.filter((image) => image !== removedImage));
  }

  return (
    <>
      <label>Images</label>
      {!images?.length && (
        <div className="text-slate-500">No images in this product</div>
      )}
      <div className="my-2 flex flex-wrap gap-3">
        {loading && (
          <div className="h-24 w-24 flex items-center justify-center">
            <Spinner />
          </div>
        )}
        <ReactSortable
          className="flex flex-wrap gap-3"
          list={images}
          setList={updateImagesOrder}
        >
          {images?.length > 0 &&
            images.map((link, index) => (
              <div
                key={index}
                className="h-24 bg-color-100 flex items-center justify-center rounded-md p-1 border border-color-300 shadow-md relative group"
              >
                <img src={link} className="w-full h-full rounded-lg" alt="" />
                <div
                  onClick={() => removeImage(link)}
                  className="opacity-0 group-hover:opacity-100 transition-all delay-100 duration-300 absolute -top-2 -right-2 bg-color-100 border border-color-300 rounded-full p-1 size-6 flex items-center justify-center text-color-700 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            ))}
        </ReactSortable>
        <label className="w-24 h-24 cursor-pointer rounded-lg border flex flex-col items-center justify-center gap-1 text-primary bg-gray-100 shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
          <input
            onChange={uploadImages}
            type="file"
            multiple
            className="hidden"
          />
        </label>
      </div>
    </>
  );
}
