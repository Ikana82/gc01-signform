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
      <h1>Add Product</h1>
      <form onSubmit={submitProduct} action="">
        <div>
          <label>Product Name</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
    </>
  );
}
