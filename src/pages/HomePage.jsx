import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import Redux actions yang diperlukan
import {
  increment,
  decrement,
  incrementByAmount,
} from "../redux/features/counter/counterSlice"; // Asumsi path ini
import {
  fetchProducts,
  deleteProduct as deleteWithRedux,
} from "../redux/features/product/productSlice";

export default function HomePage() {
  const count = useSelector((state) => state.counter.value);
  const { products, isLoading, error } = useSelector((state) => state.product); // Menggunakan 'products'
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logout Success");
      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;
    try {
      await dispatch(deleteWithRedux(id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  console.log(products);

  return (
    <>
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
        <button onClick={() => navigate("/add")}>Add Product</button>
        <table border="1">
          <thead>
            {" "}
            {/* Menambahkan thead untuk semantic HTML */}
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
          </thead>
          <tbody>
            {" "}
            {/* Menambahkan tbody untuk semantic HTML */}
            {error && (
              <tr>
                <td colSpan="8">Failed to fetch product</td>
              </tr>
            )}{" "}
            {/* colSpan untuk error message */}
            {isLoading && (
              <tr>
                <td colSpan="8">Loading...</td>
              </tr>
            )}{" "}
            {/* colSpan untuk loading message */}
            {
              !isLoading &&
              !error &&
              Array.isArray(products) &&
              products.length > 0 // Memastikan products ada dan tidak kosong
                ? products.map((p, index) => (
                    <tr key={p.id}>
                      <td>{index + 1}</td>
                      <td>{p.name}</td>
                      <td>
                        <img
                          width="100px"
                          src={p.imageUrl}
                          alt={p.name}
                          onError={(e) =>
                            (e.target.src = "https://via.placeholder.com/100")
                          }
                        />
                      </td>
                      <td>{p.price}</td>
                      <td>{p.description}</td>
                      <td>{p.category}</td>
                      <td>{p.stock}</td>
                      <td>
                        <button onClick={() => navigate(`/edit/${p.id}`)}>
                          Edit
                        </button>
                        <button onClick={() => deleteProduct(p.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                : !isLoading &&
                  !error && (
                    <tr>
                      <td colSpan="8">No products found.</td>
                    </tr>
                  ) // Menampilkan pesan jika tidak ada produk
            }
          </tbody>
        </table>
      </main>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
      >
        Logout
      </button>
      <div>
        <Link to="/about">to About</Link>
      </div>
    </>
  );
}
