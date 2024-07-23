import React, { useEffect, useState } from "react";
import Blog from "../components/Blog";
import notfound from "../assets/notfound.png";
import { GetContent } from "../services/GetContent";
import Loader from "../components/Loader";

const Home = ({ searchQuery }) => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    setLoading(true);
    GetContent.fetchAllBlogs().then((data) => {
      setBlogs(data);
      setFilteredBlogs(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = blogs.filter((blog) =>
        blog.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [searchQuery, blogs]);

  return (
    <>
      {loading ? (
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
      ) : filteredBlogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <img src={notfound} alt="Not Found" className="w-1/2" />
          <p className="text-2xl font-semibold text-center">
            No posts entries found!
          </p>
          <p className="text-primary text-center">
            You can create post from your profile tab
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredBlogs.map((blog) => (
            <Blog
              key={blog.id}
              id={blog.id}
              title={blog.title}
              content={blog.content}
              author_name={blog.author_name}
              author_bio={blog.author_bio}
              author_photo={blog.author_photo}
              date_created={blog.date_created}
              date_updated={blog.date_updated}
              image={blog.image}
              category={blog.category}
              total_likes={blog.total_likes}
              likes={blog.likes}
              reading_time={blog.reading_time}
              comment_count={blog.comment_count}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
