import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom"; // Import Link and Navigate
import AuthContext from "../context/AuthContext";
import Loader from "../components/Loader";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { authToken, user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (authToken) {
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/profile/${user.user_id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(authToken.access),
            },
          });
          const data = await response.json();
          setRole(data.role);
        } catch (error) {
          console.error("Failed to fetch user role", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [authToken, user]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Loader type={"bubbles"} color={"deepskyblue"} />
      </div>
    );
  }

  if (!user) {
    // Display a message if the user is not authenticated
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          flexDirection: "column",
        }}
      >
        <h1 className="text-white">
          You are not logged in. Please
          <span className="text-emerald-600">
            <Link to="/login"> login </Link>
          </span>
          to access this page.
        </h1>
      </div>
    );
  }

  if (!allowedRoles.includes(role)) {
    // Redirect to unauthorized page if the user's role is not allowed
    return <Navigate to="/unauthorized" />;
  }

  // If the user is authenticated and has an allowed role, render the children components
  return children;
};

export default ProtectedRoute;
