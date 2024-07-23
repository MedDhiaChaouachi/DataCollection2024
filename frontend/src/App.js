import React, { useState } from "react"; // Add useState here
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Profile from "./pages/Profile";
import Technology from "./pages/Technology";
import BlogDetails from "./pages/BlogDetails";
import Login from "./pages/Login";
import EditBlog from "./pages/EditBlog";
import CreateBlog from "./pages/CreateBlog";
import SignUp from "./pages/SignUp";
import Education from "./pages/Education";
import LocationApp from "./pages/myLocation";
import DownloadDataCollect from "./pages/browsingBehavior";
import Downloadthirdpartcookies from "./pages/stopThirdPartCookies";
import { AuthContextProvider } from "./context/AuthContext";
import PrivateRoutes from "./utils/PrivateRoutes";

import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="container mx-auto">
      <AuthContextProvider>
        <Navbar onSearch={handleSearch} />
        <Routes>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/education" element={<Education />} />
          <Route path="/music" element={<Music />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/blog/:id"
            element={
              <ProtectedRoute
                allowedRoles={["client", "Client", "analyst", "Analyst"]}
              >
                <BlogDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/thirdpartcookies"
            element={
              <ProtectedRoute
                allowedRoles={["client", "Client", "analyst", "Analyst"]}
              >
                <Downloadthirdpartcookies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/browsingBehavior"
            element={
              <ProtectedRoute
                allowedRoles={["client", "Client", "analyst", "Analyst"]}
              >
                <DownloadDataCollect />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myLocation"
            element={
              <ProtectedRoute
                allowedRoles={["client", "Client", "analyst", "Analyst"]}
              >
                <LocationApp />
              </ProtectedRoute>
            }
          />
          <Route element={<PrivateRoutes />}>
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  allowedRoles={["client", "Client", "analyst", "Analyst"]}
                >
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["analyst", "Analyst"]}>
                  <EditBlog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute allowedRoles={["analyst", "Analyst"]}>
                  <CreateBlog />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
