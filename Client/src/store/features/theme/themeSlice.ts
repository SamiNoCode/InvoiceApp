import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  isDarkMode: boolean;
}

// Get initial theme from localStorage
const initialTheme = localStorage.getItem("theme") === "dark";
// Apply initial theme class
document.documentElement.classList.toggle("dark", initialTheme);

const initialState: ThemeState = {
  isDarkMode: initialTheme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("theme", state.isDarkMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", state.isDarkMode);
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
      localStorage.setItem("theme", state.isDarkMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", state.isDarkMode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
