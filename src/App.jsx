import { styled } from "@mui/material/styles";
import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import CoinPage from "./pages/CoinPage";
import Footer from "./components/Footer";

const AppContainer = styled("div")({
  backgroundColor: "#14161a",
  color: "white",
  minHeight: "100vh",
});

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <Routes>
        <Route path="/" element={<Homepage />} exact />
         <Route path="/coins/:id" element={<CoinPage />} exact />
       </Routes>
       <Footer />
      </AppContainer>
    </BrowserRouter>

  );
}

export default App;
