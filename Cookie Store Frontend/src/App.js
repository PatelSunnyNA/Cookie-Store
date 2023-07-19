import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./pages/global/Navbar";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import CartMenu from "./pages/global/CartMenu";
import ItemDetails from "./pages/itemDetails/ItemDetails";
import Checkout from "./pages/checkout/Checkout";
import Confirmation from "./pages/checkout/Confirmation";
import ItemList from "./pages/itemList/ItemList";
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <ScrollToTop />
          <Navbar />
          <main className="content">
            <Box mx="20px" my="75px">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cookies" element={<ItemList />} />
                <Route path="cookies/:itemId" element={<ItemDetails />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="checkout/success" element={<Confirmation />} />
              </Routes>
              <CartMenu />
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
