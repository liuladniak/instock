import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/partials/_globals.scss";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import WarehousePage from "./pages/WarehousePage/WarehousePage";
import WarehouseDetailsPage from "./pages/WarehouseDetailsPage/WarehouseDetailsPage";
import EditWarehousePage from "./pages/EditWarehousePage/EditWarehousePage";
import AddWarehousePage from "./pages/AddWarehousePage/AddWarehousePage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import InventoryDetailsPage from "./pages/InventoryDetailsPage/InventoryDetailsPage";
import EditInventoryPage from "./pages/EditInventoryPage/EditInventoryPage";
import AddInventoryPage from "./pages/AddInventoryPage/AddInventoryPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<WarehousePage />} />
          <Route path="/warehouse/:id" element={<WarehouseDetailsPage />} />
          <Route path="/warehouse/edit/:id" element={<EditWarehousePage />} />
          <Route path="/warehouse/add" element={<AddWarehousePage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/inventory/:id" element={<InventoryDetailsPage />} />
          <Route path="/inventory/edit/:id" element={<EditInventoryPage />} />
          <Route path="/inventory/add" element={<AddInventoryPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
