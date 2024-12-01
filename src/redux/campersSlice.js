import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ filters = {}, page = 1 }, thunkAPI) => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach((key) => {
        if (
          filters[key] !== false &&
          filters[key] !== null &&
          filters[key] !== undefined
        ) {
          params.append(key, filters[key]);
        }
      });
      params.append("page", page);
      params.append("limit", 4);
      const response = await axios.get(`${API_URL}?${params.toString()}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    campers: [],
    camperDetails: null,
    filters: {
      location: "",
    },
    isLoading: false,
    isDetailsLoading: false,
    error: null,
    page: 1,
    hasMore: true,
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  },
  reducers: {
    setFilter(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetCampers(state) {
      state.campers = [];
      state.page = 1;
      state.hasMore = true;
    },
    clearCamperDetails(state) {
      state.camperDetails = null;
    },
    addToFavorites(state, action) {
      const camperId = action.payload.id;
      if (!state.favorites.some((camper) => camper.id === camperId)) {
        state.favorites.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites(state, action) {
      const camperId = action.payload.id;
      state.favorites = state.favorites.filter(
        (camper) => camper.id !== camperId
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        const campers = Array.isArray(action.payload?.items)
          ? action.payload.items
          : [];
        state.hasMore = campers.length === 4;
        state.campers = [...state.campers, ...campers];
        if (campers.length > 0) {
          state.page += 1;
        }
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Error fetching campers.";
        state.hasMore = false;
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.isDetailsLoading = true;
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.isDetailsLoading = false;
        state.camperDetails = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.isDetailsLoading = false;
        state.error = action.error.message || "Error fetching camper details.";
      });
  },
});

export const {
  setFilter,
  resetCampers,
  clearCamperDetails,
  addToFavorites,
  removeFromFavorites,
} = campersSlice.actions;
export default campersSlice.reducer;
