import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { db } from "../configs/firebase";
import { getDoc, doc } from "firebase/firestore";
import {
  editProductById,
  fetchProductById,
} from "../redux/features/product/productSlice";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

export default function EditproductPage() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.productById);

  async function editProduct(e) {
    e.preventDefault();
    try {
      await dispatch(
        editProductById({
          id,
          name,
          imageUrl,
          price: Number(price),
          description,
          category,
          stock: Number(stock),
        })
      );
      console.log("Successfully edited product with id", id);
      navigate("/");
    } catch (error) {
      console.log("Failed to edit product:", error);
    }
  }

  useEffect(() => {
    async function getProductById(idProduct) {
      try {
        const docRef = doc(db, "products", idProduct);
        const docSnap = await getDoc(docRef);

        const product = {
          name: docSnap.data().name,
          imageUrl: docSnap.data().imageUrl,
          price: docSnap.data().price,
          description: docSnap.data().description,
          category: docSnap.data().category,
          stock: docSnap.data().stock,
        };
        setName(product.name);
        setImageUrl(product.imageUrl);
        setPrice(product.price);
        setDescription(product.description);
        setCategory(product.category);
        setStock(product.stock);
      } catch (error) {
        console.log(error);
      }
    }
    getProductById(id);
  }, []);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, []);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setImageUrl(product.imageUrl);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
    }
  }, [product]);

  return (
    <>
      <h1>Edit</h1>
      <form onSubmit={editProduct} action="">
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
            disabled={true}
          />
          <FileUploaderRegular
            pubkey="33563ee22dfa473493de"
            onFileUploadSuccess={(result) => {
              console.log("Successfully upload file");
              setImageUrl(result.cdnUrl);
            }}
          />
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
      <button
        onClick={() => {
          console.log({ name, imageUrl, price, description, category, stock });
        }}
      >
        Cek data dong
      </button>
    </>
  );
}
