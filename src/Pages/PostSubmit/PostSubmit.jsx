import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppwriteService from "../../appwrite/confi";
import Loading from "../Loading/Loading";
import parse from "html-react-parser";
import "../PostSubmit/PostSubmit.css"
import PostForm from "../../Components/Post-form/PostForm";
import { useSelector } from "react-redux";

const PostSubmit = () => {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const navigate = useNavigate()
  const [isSame, SetIsSame ] = useState(false)
  const userId = useSelector(state => state.auth.userData.$id)

  useEffect(() => {
    if (id) {
      AppwriteService.getPost(id)
        .then((data) => {
          setPost(data)
          if(data.userId === userId)
          {
            SetIsSame(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  if (!post) return <Loading/>;

  const handleClick = ()=>{
    if (id) 
    {
      AppwriteService.getPost(id)
        .then((data) => {
          setPost(data);
          navigate("/AddPost", { state: { post } });
        })
        .catch((err) => console.log(err));
    }

  }

  return (
    <div id="showpost">
      <h1>{post.title}</h1>
      <img
        src={post.featuredImage ? AppwriteService.getFileView(post.featuredImage) : "errorimg.png"}
        alt={post.title}
        style={{ width: "100%", height: "650px", objectFit: "contain" }}
      />
      <p>{parse(post.content)}</p>
      { isSame && <button onClick={handleClick}>Edit Post</button>}
    </div>
  );
};

export default PostSubmit;
