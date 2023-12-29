import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import Home from "./components/Home.tsx"
import Dashboard from "./components/Dashboard.tsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider } from "./context/store.tsx"
import Layout from "./components/Layout.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Layout>
        <RouterProvider router={router} />
        <App />
      </Layout>
    </AuthProvider>
  </React.StrictMode>
)
