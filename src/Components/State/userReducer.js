import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

//Uses redux to access the API
export const updateTranslationAsync = createAsyncThunk(
  "user/updateTranslationAsync",
  async (user) => {
    await fetch(`${apiUrl}/${user.id}`, {
      method: "PATCH",
      headers: {
        "X-API-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        translations: user.translations,
      }),
    });
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: undefined,
    username: undefined,
    translations: [],
  },

  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.translations = action.payload.translations;
    },
    addTranslation: (state, action) => {
      state.translations.push(action.payload);
    },

    deleteTranslations: (state) => {
      state.translations = [];
    },
    deleteUser: (state) => {
      state.id = undefined;
      state.username = undefined;
      state.translations = [];
    },
  },
});

export const { setUser, addTranslation, deleteTranslations, deleteUser } =
  userSlice.actions;

export default userSlice.reducer;
