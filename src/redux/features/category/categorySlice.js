import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../configs/firebase";
import { setError, setLoading } from "../product/productSlice";

const initialState = {
  categories: [],
  category: null,
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategory: (state, action) => {
      state.categories = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCategories, setCategory, setLoading, setError } =
  categorySlice.actions;

export const fetchCategories = () => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const querySnapshot = await getDoc(collection(db, "categories"));
    const result = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setCategories(result));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchCategoryById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const docRef = doc(db, "categories", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch(setCategory({ id: docSnap.id, ...docSnap.data() }));
    } else {
      dispatch(setError("Category not found"));
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Disini tempat untuk add new category
export const addCategory = (newCategory) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    await addDoc(collection(db, "categories", newCategory));
    dispatch(fetchCategories());
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Disini function untuk edit Category
export const editCategory = (updateCategory) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const docRef = doc(db, "categories", updateCategory.id);
    await updateDoc(docRef, {
      category: updateCategory.category,
      subCategory: updateCategory.subCategory,
    });
    dispatch(fetchCategories());
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    await deleteDoc(doc(db, "categories", id));
    dispatch(fetchCategories());
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default categorySlice.reducer;
