import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ filters = {}, page = 1 }, thunkAPI) => {
    try {
      // Фильтруем параметры: добавляем только те, которые не равны false, null или undefined
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
      params.append("limit", 4); // Максимум 4 элемента на страницу

      const response = await axios.get(`${API_URL}?${params.toString()}`);
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
    filters: {
      location: "",
    },
    isLoading: false,
    error: null,
    page: 1,
    hasMore: true,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;

        // API возвращает объект, извлекаем только items
        const campers = Array.isArray(action.payload?.items)
          ? action.payload.items
          : [];

        // Если длина данных меньше 4, значит, данных больше нет
        state.hasMore = campers.length === 4;

        // Добавляем новые данные
        state.campers = [...state.campers, ...campers];

        // Увеличиваем номер страницы только если данные получены
        if (campers.length > 0) {
          state.page += 1;
        }
      })

      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Error fetching campers.";
        state.hasMore = false; // Остановить дальнейшие запросы
      });
  },
});

export const { setFilter, resetCampers } = campersSlice.actions;
export default campersSlice.reducer;
