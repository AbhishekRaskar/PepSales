import React from "react";
import { Route, Routes } from "react-router-dom";
import Details from "../Pages/Details";
import HomePage from "../Pages/HomePage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/details" element={<Details />} />
    </Routes>
  );
};

export default AllRoutes;
