import React from "react";
import AppwriteService from "../../appwrite/confi"
import { useState, useEffect } from "react";
import PostCard from "../../Components/PostCard/PostCard.jsx"
import "../AllPosts/AllPosts.css"
import Loading from "../Loading/Loading.jsx";

const AllPosts =  ()=> {
    const [posts, setPosts] = useState(null)
    useEffect(()=>{
         AppwriteService.getPosts([]).then((Posts)=>{if(Posts) return setPosts(Posts.documents)})
    },[])

    if (posts === null) return <Loading />;

    return(
        <div className="posts-container">
            {posts.map((Post)=>{
                return <PostCard 
                key = {Post.$id}
                title = {Post.title}
                featuredImg = {Post.featuredImage}
                $id = {Post.$id}
                userName={Post.userName}
                />
            })}
        </div>
    )
}

export default AllPosts