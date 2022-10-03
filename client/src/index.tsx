// File for root element
import React from "react";
import ReactDOM from "react-dom/client";
import {
  // createBrowserRouter,
  // RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const { default: App } = require('./app.tsx');
const { default: Home } = require('./home.tsx');

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/home",
//     element: <Home />,
//   },
// ]);


ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='home' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
