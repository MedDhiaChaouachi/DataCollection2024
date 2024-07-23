import React, { useEffect, useState, useContext } from "react";
import Blog from "../components/Blog";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
//import "../css/Profile.css"; // Import the CSS file

const Profile = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { user, authToken } = useContext(AuthContext);
  const BLOGS_URL = `${BASE_URL}/api/blogs/myblogs/`;
  const PROFILE_URL = `${BASE_URL}/api/profile/${user?.user_id}/`;
  const UPDATE_PROFILE_URL = `${BASE_URL}/api/profile/${user?.user_id}/update/`;

  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState({
    username: "",
    photo: "",
    email: "",
    password: "",
    bio: "",
    role: ""
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const getBlogs = async () => {
        const response = await fetch(BLOGS_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authToken.access),
          },
        });
        const data = await response.json();
        setBlogs(data);
        setLoading(false);
      };
      getBlogs();
    }
  }, [authToken, user, BLOGS_URL]);

  useEffect(() => {
    if (user) {
      const getProfile = async () => {
        setLoading(true);
        const response = await fetch(PROFILE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authToken.access),
          },
        });
        const data = await response.json();
        setProfile(data);
        setLoading(false);
      };
      getProfile();
    }
  }, [authToken, user, PROFILE_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfile({ ...profile, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in profile) {
      if (profile[key] && key !== 'photo') formData.append(key, profile[key]);
    }
    if (profile.photo instanceof File) {
      formData.append('photo', profile.photo);
    }

    const response = await fetch(UPDATE_PROFILE_URL, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + String(authToken.access),
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      setProfile(data);
      setEditMode(false);
    } else {
      console.error("Profile update failed");
    }
  };

  if (!user) {
    return (
      <h1 className="text-white">
        You are logged out. Please
        <Link to="/login">
          <span className="text-emerald-600"> Login </span>
        </Link>
        first to view your profile.
      </h1>
    );
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <Loader type={"bubbles"} color={"deepskyblue"} />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="flex flex-wrap md:flex-nowrap justify-around items-center">
        <div className="space-y-5">
          <p className="text-4xl font-semibold">
            Hi! <span className="text-primary">{profile.username}.</span> welcome to
            <span className="site-logo">
              <span className="text-primary"> A</span>naly
              <span className="text-primary">T</span>ica
            </span>
          </p>
          {profile.role === 'analyst' && (
            <p className="text-lg font-semibold">
              {blogs.length > 0 ? (
                <>
                  You have written <span className="text-primary">{blogs.length}</span>
                  {blogs.length > 1 ? " posts" : " post"} so far.
                </>
              ) : (
                <>
                  You have not written any posts yet. Write your first analytic post now!
                </>
              )}
            </p>
          )}
          {(profile.role === 'client' || profile.role === 'Client')&& (
            <p className="text-lg font-semibold">
              Go explore our features and enjoy your time.
            </p>
          )}
          {(profile.role === 'analyst' || profile.role === 'Analyst') && (
            <button className="btn btn-sm bg-blue-500 text-white capitalize">
              <Link to="/create">Create post</Link>
            </button>
          )}
        </div>
        <img className="max-w-md rounded-full" src={`${BASE_URL}${profile.photo}`} alt="Profile" />
      </div>

      {(profile.role === 'analyst' || profile.role === 'Analyst') && blogs.length > 0 && (
        <>
          <p className="text-3xl font-bold text-center blog-title my-10">My Posts</p>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                id={blog.id}
                title={blog.title}
                content={blog.content}
                author_name={blog.author_name}
                date_created={blog.date_created}
                date_updated={blog.date_updated}
                image={blog.image}
                category={blog.category}
                total_likes={blog.total_likes}
                reading_time={blog.reading_time}
                author_bio={blog.author_bio}
                author_photo={blog.author_photo}
                comment_count={blog.comment_count}
              />
            ))}
          </div>
        </>
      )}

      <div className="my-account-section">
        <h2 className="text-3xl font-bold text-center blog-title my-10">My Account</h2>
        {editMode ? (
        
          <form onSubmit={handleSubmit} className="profile-form">
            <label className="block mb-4">
              <span className="block text-sm font-medium text-white">Username</span>
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </label>
            <label className="block mb-4">
              <span className="block text-sm font-medium text-white">Email</span>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </label>
            <label className="block mb-4">
              <span className="block text-sm font-medium text-white">Password</span>
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </label>
            <label className="block mb-4">
              <span className="block text-sm font-medium text-white">Bio</span>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              ></textarea>
            </label>
            <label className="block mb-4">
              <span className="block text-sm font-medium text-white">Photo</span>
              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
            <label className="block mb-4">
              <span className="block text-sm font-medium text-white">Role</span>
              <input
                type="text"
                name="role"
                value={profile.role}
                readOnly
                className="mt-1 block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md shadow-sm sm:text-sm"
              />
            </label>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Bio:</strong> {profile.bio}</p>
            <p><strong>Role:</strong> {profile.role}</p>
            <button onClick={() => setEditMode(true)} className="btn">Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
