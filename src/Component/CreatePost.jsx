<<<<<<< HEAD
import { useContext, useEffect, useState } from "react";
import './CreatePost.css';
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Loader from "../Component/Loader"; 
import { ModeContext } from "../Context/ModeContext";

export function CreatePost() {
  const [createPostFormData, setCreatePostFormData] = useState({
    title: "",
    body: "",
    image: ""
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false); 
       const ctx= useContext(ModeContext);

  const navigate = useNavigate();
  const location = useLocation();

  const editPostId = location.state?.id || null;

  const handleChange = (field, value) => {
    setError((e) => ({ ...e, [field]: "" }));
    setCreatePostFormData({ ...createPostFormData, [field]: value });
  };

  useEffect(() => {
    if (!editPostId) return;

    const posts = JSON.parse(localStorage.getItem("PostData")) || [];
    const postToEdit = posts.find((p) => p.id === editPostId);

    if (postToEdit) {
      setCreatePostFormData({
        title: postToEdit.title,
        body: postToEdit.body,
        image: postToEdit.image,
      });
    }
  }, [editPostId]);

  const handleImageChange = (file) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setError((e) => ({
        ...e,
        image: "Only jpg, png, jpeg files are allowed",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setCreatePostFormData({ ...createPostFormData, image: reader.result });
      setError((e) => ({ ...e, image: "" }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newError = {};
    if (!createPostFormData.title.trim()) newError.title = "Title is required";
    if (!createPostFormData.body.trim()) newError.body = "Body is required";
    if (!createPostFormData.image.trim()) newError.image = "Image is required";

    setError(newError);
    if (Object.keys(newError).length > 0) return;

    setLoading(true);

    setTimeout(() => {
      const existingPosts = JSON.parse(localStorage.getItem("PostData")) || [];

      if (editPostId) {
        const updatePost = existingPosts.map((p) =>
          p.id === editPostId ? { ...p, ...createPostFormData } : p
        );
        localStorage.setItem("PostData", JSON.stringify(updatePost));
        setLoading(false);
        navigate("/");
        return;
      }

      const updatedPosts = [
        ...existingPosts,
        { id: uuidv4(), ...createPostFormData },
      ];

      localStorage.setItem("PostData", JSON.stringify(updatedPosts));
      toast.success("Post added successfully");
      
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000); 
    }, 1000); 
  };

  return (
    <>
      {loading && <Loader />}
      
     
      
      <ToastContainer />
      <div className={`container ${ctx.mode}`}>
      
      <div className={`form ${ctx.mode}`}>
          <h1 className={`h1 ${ctx.mode}`}>Let's Create New Post</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Title"
            value={createPostFormData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          {error.title && <span className="error">{error.title}</span>}

          <textarea
            placeholder="Enter Body"
            value={createPostFormData.body}
            onChange={(e) => handleChange("body", e.target.value)}
          />
          {error.body && <span className="error">{error.body}</span>}

          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            className="img"
            onChange={(e) => handleImageChange(e.target.files[0])}
          />
          {error.image && <span className="error">{error.image}</span>}

          {createPostFormData.image && (  
            <img
            
              src={createPostFormData.image}
              alt="preview"
              style={{ width: 200, borderRadius: 10 }}
            />
          )}

          <div className="btn-container">
            <input
              type="submit"
              className={`btn ${ctx.mode}`}
              value={editPostId ? "Update Post" : "Add Post"}
            />
            {editPostId && (
              <button
                type="button"
                className="btn cancel-btn"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      </div>
    </>
  );
}

=======
import { useContext, useEffect, useState } from "react";
import './CreatePost.css';
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Loader from "../Component/Loader"; 
import { ModeContext } from "../Context/ModeContext";

export function CreatePost() {
  const [createPostFormData, setCreatePostFormData] = useState({
    title: "",
    body: "",
    image: ""
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false); 
       const ctx= useContext(ModeContext);

  const navigate = useNavigate();
  const location = useLocation();

  const editPostId = location.state?.id || null;

  const handleChange = (field, value) => {
    setError((e) => ({ ...e, [field]: "" }));
    setCreatePostFormData({ ...createPostFormData, [field]: value });
  };

  useEffect(() => {
    if (!editPostId) return;

    const posts = JSON.parse(localStorage.getItem("PostData")) || [];
    const postToEdit = posts.find((p) => p.id === editPostId);

    if (postToEdit) {
      setCreatePostFormData({
        title: postToEdit.title,
        body: postToEdit.body,
        image: postToEdit.image,
      });
    }
  }, [editPostId]);

  const handleImageChange = (file) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setError((e) => ({
        ...e,
        image: "Only jpg, png, jpeg files are allowed",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setCreatePostFormData({ ...createPostFormData, image: reader.result });
      setError((e) => ({ ...e, image: "" }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newError = {};
    if (!createPostFormData.title.trim()) newError.title = "Title is required";
    if (!createPostFormData.body.trim()) newError.body = "Body is required";
    if (!createPostFormData.image.trim()) newError.image = "Image is required";

    setError(newError);
    if (Object.keys(newError).length > 0) return;

    setLoading(true);

    setTimeout(() => {
      const existingPosts = JSON.parse(localStorage.getItem("PostData")) || [];

      if (editPostId) {
        const updatePost = existingPosts.map((p) =>
          p.id === editPostId ? { ...p, ...createPostFormData } : p
        );
        localStorage.setItem("PostData", JSON.stringify(updatePost));
        setLoading(false);
        navigate("/");
        return;
      }

      const updatedPosts = [
        ...existingPosts,
        { id: uuidv4(), ...createPostFormData },
      ];

      localStorage.setItem("PostData", JSON.stringify(updatedPosts));
      toast.success("Post added successfully");
      
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000); 
    }, 1000); 
  };

  return (
    <>
      {loading && <Loader />}
      
     
      
      <ToastContainer />
      <div className={`container ${ctx.mode}`}>
      
      <div className={`form ${ctx.mode}`}>
          <h1 className={`h1 ${ctx.mode}`}>Let's Create New Post</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Title"
            value={createPostFormData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          {error.title && <span className="error">{error.title}</span>}

          <textarea
            placeholder="Enter Body"
            value={createPostFormData.body}
            onChange={(e) => handleChange("body", e.target.value)}
          />
          {error.body && <span className="error">{error.body}</span>}

          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            className="img"
            onChange={(e) => handleImageChange(e.target.files[0])}
          />
          {error.image && <span className="error">{error.image}</span>}

          {createPostFormData.image && (  
            <img
            
              src={createPostFormData.image}
              alt="preview"
              style={{ width: 200, borderRadius: 10 }}
            />
          )}

          <div className="btn-container">
            <input
              type="submit"
              className={`btn ${ctx.mode}`}
              value={editPostId ? "Update Post" : "Add Post"}
            />
            {editPostId && (
              <button
                type="button"
                className="btn cancel-btn"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      </div>
    </>
  );
}

>>>>>>> main
