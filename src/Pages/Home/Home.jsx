import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const isLogin = useSelector(state => state.auth.status)
  const navigate = useNavigate()
  const [blogIdea, setBlogIdea] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const userData = useSelector(state => state.auth.userData)

  const generateBlogIdea = async () => {
    setIsLoading(true);
    setError(null);
    setBlogIdea(null);

    try {
      setTimeout(() => {
        setBlogIdea("The Future of AI in Everyday Design Decisions");
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError("Failed to generate idea. Please try again.");
      setIsLoading(false);
    }
  };

  if(isLogin)
  {
    return (
    <div className="homepage-container">
      {/* Welcome & Action Section */}
      <section className="header-section">
        <div className="header-content">
          <h1>Welcome Back, {userData?userData.name:null}!</h1>
          <p>
            Your blog is waiting for your next great idea. Ready to share something new with the world?
          </p>
        </div>
        <div className="action-buttons">
          <button className="add-post-btn" onClick={()=>{navigate("/AddPost")}}>
            <span className="icon">📝</span> Add New Post
          </button>
          <button className="view-posts-btn" onClick={()=>{navigate("/AllPosts")}}>
            <span className="icon">📚</span> View All Posts
          </button>
        </div>
      </section>
      <section className="stats-section">
        <h2>Your Blogging Inspiration</h2>
        <div className="stats-cards">
          <div className="card">
            <h3>Tip of the Day</h3>
            <p>Write first, edit later. Creativity flows better without restrictions.</p>
          </div>
          <div className="card">
            <h3>Quote</h3>
            <p>"The scariest moment is always just before you start." – Stephen King</p>
          </div>
          <div className="card">
            <h3>Prompt</h3>
            <p>Write about a technology trend that will change everyday life in 5 years.</p>
          </div>
        </div>
      </section>
    </div>
    )
  }
  else
  {
  return (
    <div className="containeer">
      <div className="hero">
        <h1>Write. Share. Inspire.</h1>
        <p>
          Join a community of creators and thinkers. Share your stories, explore fresh perspectives, and discover insights that spark ideas and drive change.
        </p>
        <button className="btn" onClick={()=>{navigate("/SignUp")}}>Sign Up to Get Started</button>
      </div>

      {/* Features Section */}
      <div className="section">
        <h2>What You'll Find</h2>
        <div className="cards">
          <div className="card">
            <h3>Insightful Articles</h3>
            <p>
              Discover thought-provoking articles on technology, design, and
              business.
            </p>
          </div>
          <div className="card">
            <h3>Diverse Perspectives</h3>
            <p>
              Hear from industry leaders and passionate writers on a variety of
              topics.
            </p>
          </div>
        </div>
      </div>

      {/* AI Blog Idea Generator */}
      <div className="section">
        <h2>Spark Your Next Idea ✨</h2>
        <p>Tap the button to get a fresh, AI-powered blog post idea.</p>
        <button onClick={generateBlogIdea} className="btn" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Idea"}
        </button>

        {isLoading && <div className="loader"></div>}
        {error && <p className="error">{error}</p>}
        {blogIdea && <div className="idea-box">"{blogIdea}"</div>}
      </div>

      <div className="section">
        <h2>What Our Readers Say</h2>
        <div className="card" style={{backgroundColor:"white"}}>
          <p style={{color:"#1A1A1A" , fontWeight:"bold"}}>
            "This blog is a fantastic resource. The content is always relevant
            and helps me stay informed about the latest industry trends."
          </p>
          <p style={{color:"grey"}}>- Alex S., Regular Reader</p>
        </div>
      </div>

      <div className="section">
        <h2>Ready to Dive In?</h2>
        <button className="btn" onClick={()=>{navigate("/SignUp")}}>Start Reading</button>
      </div>
    </div>
  );
}
}

export default Home;