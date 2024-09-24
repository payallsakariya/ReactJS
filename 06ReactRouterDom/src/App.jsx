import React from "react";
import {
  Blogs,
  CalenderMaster,
  Dashboard,
  DataContent,
  Error,
  Layout,
} from "./pages";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path="datacontent" element={<DataContent />}></Route>
            <Route path="blags" element={<Blogs />}></Route>
            <Route path="calendermaster" element={<CalenderMaster />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
