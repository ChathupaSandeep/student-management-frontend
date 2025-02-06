import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainHeader from "./layout/MainHeader";
import MainLayout from "./layout/MainLayout";
import Students from "./components/Students";
import Courses from "./components/Courses";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <MainHeader />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="students" element={<Students />} />
          <Route path="courses" element={<Courses />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
