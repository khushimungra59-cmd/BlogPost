import "./PostDetail.css";
import { useContext, useEffect, useState } from "react";
import ConfirmationModel from "./ConfirmationModel";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import { ModeContext } from "../Context/ModeContext";

export const PostDetail = () => {

   const loggedInUserData =
    JSON.parse(localStorage.getItem("lognData")) || {};

  const [showModel, setShowModel] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();
   const location = useLocation();
       const ctx= useContext(ModeContext);

  console.log(location,"Location value");

  const[postData,setPostData]=useState();
  const [currentPost, setCurrentPost] = useState({});
  const allPostData = JSON.parse(localStorage.getItem("PostData")) || [];

  useEffect(() => {
    const filtered = allPostData.find(
      item => String(item.id) === String(postId)
    );
    if (filtered) setCurrentPost(filtered);
  }, []);

  const confirmDelete = () => {
    const updatedPostData = allPostData.filter(
      item => String(item.id) !== String(postId)
    );
    setPostData(updatedPostData);
    localStorage.setItem("PostData",JSON.stringify(updatedPostData));
    setShowModel(false);
    navigate("/");
  };
    
       const editHandle=(id)=>{
            console.log({id});
            //pass data from one page to another
            navigate("/new-post",{ state: {id:postId} });
          }
  return (
    <div className={`container ${ctx.mode}`}>
    <div className={`post-container ${ctx.mode}`}>
      <div className="post-left">
        <img src={currentPost.image} alt={currentPost.title} />
      </div>

      <div className="post-right">
        <h2>{currentPost.title}</h2>
        <p>{currentPost.body}</p>
      </div>

      {loggedInUserData?.role ==="admin"?<div className="button-group">
        <button type="button" onClick={() => navigate("/")}>Back</button>

        <button type="button"  onClick={editHandle}>Edit</button>
        
        <button type="button" onClick={() => setShowModel(true)}>
          Delete
        </button>
      </div>:<></>}

      {showModel && (
        <ConfirmationModel
          title="Delete Post"
          desc="Are you sure you want to delete this post?"
          onConfirm={confirmDelete}
          onClose={() => setShowModel(false)}
          confirmBtnText="Delete"
        />
      )}
    </div>
    </div>
  );
};
