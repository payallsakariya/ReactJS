import React, { lazy, Suspense } from "react";
import {
  Blogs,
  CalenderMaster,
  Dashboard,
  DataContent,
  Error,
  Layout,
} from "./pages";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function delayForDemo(promise) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(promise), 500);
  });
}

const Products = lazy(() => delayForDemo(import('./pages/Products')));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="datacontent" element={<DataContent />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="calendermaster" element={<CalenderMaster />} />
            <Route
              path="products"
              element={
                <Suspense fallback={<div className="loader">Loading...</div>}>
                  <Products />
                </Suspense>
              }
            />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
