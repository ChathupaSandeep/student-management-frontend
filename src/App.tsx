import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainHeader from "./layout/MainHeader";
import MainLayout from "./layout/MainLayout";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import Lecturers from "./pages/Lecturers";
import Guardians from "./pages/Guardians";

function App() {
  return (
    <Router>
      <MainHeader />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="students" element={<Students />} />
          <Route path="courses" element={<Courses />} />
          <Route path="lecturers" element={<Lecturers />} />
          <Route path="guardians" element={<Guardians />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
