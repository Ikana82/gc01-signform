import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "firebase/firestore";

export default function HomePage() {
  // const [products, setProducts] = useState([]);
  const count = useSelector((state) => state.counter.value);
  const { products, isLoading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(auth);
      console.log("Logout Success");
      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  // -- INI NANTI DIHAPUS --
  // async function getProducts() {
  //   const querySnapshot = await getDocs(collection(db, 'products'));
  //   const result = querySnapshot.docs.map((doc) => {
  //     return {
  //       id: doc.id,
  //       ...doc.data(), // =>  object { name, imageUrl, price }
  //     };
  //   });
  //   setProducts(result);
  // }
  // -----------------------

  async function deleteProduct(id) {
    dispatch(deleteProductWithRedux(id));
  }

  useEffect(() => {
    dispatch(fetchProducts());
    //getProducts();
  }, []);

  return (
    <>
      {/* <div className="text-lg font-medium text-gray-700 mb-4">Ada Content</div> */}
      <main>
        <h1>Product List</h1>
        <button onClick={() => dispatch(increment())}>
          Count increment by 1 : {count}
        </button>{" "}
        <button onClick={() => dispatch(decrement())}>
          Count decrement by 1 : {count}
        </button>{" "}
        <button onClick={() => dispatch(incrementByAmount(100))}>
          Count increment by 100 : {count}
        </button>{" "}
        <br />
        <button onClick={() => navigate("products/add")}>Add Product</button>
        <table border="1">
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
          {error && <tr>Failed to fetch product</tr>}
          {isLoading && <tr>Loading...</tr>}
          {product.lengh > 0 &&
            product.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.name}</td>
                <td>
                  <img width="100px" src={p.imageUrl} alt={p.name} />
                </td>
                <td>{p.price}</td>
                <td>{p.description}</td>
                <td>{p.category}</td>
                <td>{p.stock}</td>
                <td>
                  <button onClick={() => navigate(`/products/edit/${p.id}`)}>
                    Edit
                  </button>
                  <button onClick={() => deleteProduct(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </table>
      </main>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
      >
        Logout
      </button>
      <div>
        <Link to="about">to About</Link>
      </div>
    </>
  );
}
