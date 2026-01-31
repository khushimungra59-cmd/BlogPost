import { IoSearchOutline } from "react-icons/io5";
import "./ExplorePost.css";
import { useContext, useEffect, useState } from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import ConfirmationModel from "./ConfirmationModel";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModeContext } from "../Context/ModeContext";

const ExplorePost = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
   const ctx= useContext(ModeContext);
  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModel, setShowModel] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [postId, setPostId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  /* ---------------- FETCH ---------------- */
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://696b49ac624d7ddccaa0b2d9.mockapi.io/createpost"
      );
      const data = await response.json();
      const reverseData = [...data].reverse();
      setPosts(reverseData);
      setFilteredPosts(reverseData);
    } catch (error) {
      console.error("GET API Error:", error.message);
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ---------------- SEARCH ---------------- */
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setCurrentPage(1);

    const result = posts.filter(
      (item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.body.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPosts(result);
  };

  /* ---------------- FORM ---------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.body.trim()) newErrors.body = "Body is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- CREATE / UPDATE ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      const url = postId
        ? `https://696b49ac624d7ddccaa0b2d9.mockapi.io/createpost/${postId}`
        : "https://696b49ac624d7ddccaa0b2d9.mockapi.io/createpost";

      const method = postId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          body: formData.body,
          image: postId
            ? formData.image
            : `https://picsum.photos/seed/${Date.now()}/200/300`,
        }),
      });

      const data = await response.json();

      if (postId) {
        setFilteredPosts((prev) =>
          prev.map((p) => (p.id === postId ? data : p))
        );
        toast.success("Post Updated Successfully!");
      } else {
        setFilteredPosts((prev) => [data, ...prev]);
        toast.success("Post Created Successfully!");
      }

      setFormData({ title: "", body: "", image: "" });
      setPostId(null);
      setIsOpen(false);
    } catch (error) {
      console.error("Submit Error:", error.message);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- EDIT ---------------- */
  const postDataGetById = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://696b49ac624d7ddccaa0b2d9.mockapi.io/createpost/${id}`
      );
      const data = await response.json();

      setFormData({
        title: data.title || "",
        body: data.body || "",
        image: data.image || "",
      });

      setPostId(id);
      setIsOpen(true);
    } catch (error) {
      console.error("GET BY ID Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const openDeleteModel = (id) => {
    setPostId(id);
    setShowModel(true);
  };

  const deletePostById = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://696b49ac624d7ddccaa0b2d9.mockapi.io/createpost/${postId}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        toast.error("Failed to delete post");
      }
      await response.json();
      toast.success("Post Deleted Successfully!");
      setShowModel(false);
      setPostId(null);
    } catch (error) {
      console.error("DELETE API Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- PAGINATION ---------------- */
  const startIndex = (currentPage - 1) * postsPerPage;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <>
      <ToastContainer />

<div className={`explore-post-container ${ctx.mode}`}>
        <div className="title-search-row">
          <h2 className="explore-title">Explore Posts</h2>

          <div className="search-container">
            <IoSearchOutline className="search-icon" />
            <input
              type="text"
              placeholder="Search Post..."
              className="search-input"
              value={search}
              onChange={handleSearch}
            />
           </div>
           </div>
           

      {!isOpen && (
        <button className="btn5" onClick={() => setIsOpen(true)}>
          Create Post
        </button>
      )} </div>
         

      {isOpen && (
        <div className={`form-wrapper ${ctx.mode}`}>
          <div className="ex">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter Title"
              className="in"
            />
            {errors.title && <p className="error">{errors.title}</p>}
          </div>

          <div className="ex">
            <textarea
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              placeholder="Enter Body"
              className="in"
            />
            {errors.body && <p className="error">{errors.body}</p>}
          </div>

          <button className="btn4" onClick={handleSubmit}>
            {postId ? "Update" : "Submit"}
          </button>

          <button
            className="btun"
            onClick={() => {
              setIsOpen(false);
              setPostId(null);
              setFormData({ title: "", body: "", image: "" });
            }}
          >
            Cancel
          </button>
            </div>
     
        
      
      )}

     <div className={`card-container ${ctx.mode}`}>
  {filteredPosts.length === 0 && !loading ? (
      <h3> No Post Found</h3>
  ) : (
    filteredPosts
      .slice(startIndex, startIndex + postsPerPage)
      .map((item) => (
        <Card
          key={item.id}
          title={item.title}
          desc={item.body}
          id={item.id}
          from="explore"
          onEdit={() => postDataGetById(item.id)}
          onDelete={() => openDeleteModel(item.id)}
        />
      ))
  )}


</div>

 
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => setCurrentPage((p) => p - 1)}
        onNext={() => setCurrentPage((p) => p + 1)}
        postsPerPage={postsPerPage}
        setPostsPerPage={setPostsPerPage}
      />

      {showModel && (
        <ConfirmationModel
          title="Delete Post?"
          desc="Are you sure you want to delete this post?"
          onConfirm={deletePostById}
          onClose={() => {setShowModel(false); setPostId(null);}}
          confirmBtnText="Delete"
        />
      )}
   
    </>
  );
};

export default ExplorePost;
