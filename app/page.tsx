"use client";
import { ThemeProvider } from "@mui/material";
import AddGame from "./components/AddGame";
import { darkTheme } from "./theme";

export default function Home() {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <AddGame />
      </ThemeProvider>
    </div>
  );
}
