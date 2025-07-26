import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addProduct } from "../redux/features/product/productSlice.js";
import UploadWidget from "../components/UploadWidget.jsx";

export default function AddproductPage() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function submitProduct(e) {
    e.preventDefault();
    try {
      const product = {
        name,
        imageUrl,
        price,
        description,
        category,
        stock,
      };
      dispatch(addProduct(product));
      console.log("Successfully created a product ", name);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <main className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-neutral-800">Add Product</h1>
        </div>
        <form onSubmit={submitProduct} action="">
          <div>
            <label>Product Name</label>
            <br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 w-full h-10 px-3 bg-slate-100 outline-none rounded-lg outline-gray-300 text-sm placeholder-gray-400 placeholder:text-sm placeholder:italic pr-10"
            />
          </div>
          <div>
            <label>Image Url</label>
            <br />
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <UploadWidget setImageUrl={setImageUrl} />
          </div>
          <div>
            <label>Price</label>
            <br />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label>Description</label>
            <br />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Category</label>
            <br />
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label>Stock</label>
            <br />
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <button>Submit</button>
        </form>
      </main>
    </>
  );
}
