import '../PostCard/PostCard.css'
import {Link} from 'react-router-dom'
import databaseService from '../../appwrite/confi'
import errorimg from "../../Images/pngegg.png"
import { useEffect, useState } from 'react'

const PostCard = ({featuredImg, $id, title, userName})=> {
    const [preview, setPreview] = useState()
   useEffect(() => {
    if(featuredImg)
    {
        const prev = databaseService.getFileView(featuredImg)
        setPreview(prev)
    }
    else
    {
        setPreview(errorimg)
    }
}, [featuredImg])

    return(
        <div id='postgrid'>
            <Link to={`/Post/${$id}`} id='postcard'>
                <div id="PostContain">
                    <p id='title'style={{fontWeight:"bold"}}>{title}</p>
                    <div>
                        <img src={preview} alt="FeaturedImage" /> 
                    </div>
                    <p>{userName}</p>
                </div>
            </Link>
        </div>
        
    )
}

export default PostCard