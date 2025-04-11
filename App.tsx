import { Main } from "./src";
import { ThemeProvider } from "./src/themeContext";


export default function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

