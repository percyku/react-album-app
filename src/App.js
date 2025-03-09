import "./stylesheets/all.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route } from "react-router-dom";

import FormLayout from "./pages/FormLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AlbumLayout from "./pages/AlbumLayout";
import AlbumSearch from "./pages/AlbumSearch";
import AlbumCollect from "./pages/AlbumCollect";
import AlbumChosen from "./pages/AlbumChosen";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FormLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/album" element={<AlbumLayout />}>
            <Route index element={<AlbumChosen />}></Route>
            <Route path="collect" element={<AlbumCollect />}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
