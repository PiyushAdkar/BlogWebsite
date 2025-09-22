import React, { useEffect } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import RTE from "../RTE/RTE";
import Select from "../Select/Select"
import AppwriteService from "../../appwrite/confi"
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import "../Post-form/PostForm.css"
import { useLocation } from "react-router-dom";

const PostForm = ()=> 
{
    const location = useLocation();
    const Post = location.state?.post; 
    const {register, handleSubmit, setValue, getValues, control, watch} = useForm({
        defaultValues: {
            title: Post?.title || '',
            slug: Post?.slug || '',
            content: Post?.content || '',
            status: Post?.status || 'active'
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data)=> 
    {
        data.slug = await slugTransform(data.title)
        if(Post)
        {   
            const newImg = data.image[0] ? await AppwriteService.uploadFile(data.image[0]) : null
            if(newImg)
            {
                await AppwriteService.deleteFile(Post.featuredImage)
            }
            const newPost = await AppwriteService.updatePost(Post.$id,{...data, featuredImage: newImg? newImg.$id: undefined})
            if(newPost) navigate(`/Post/${newPost.$id}`)
        } 
        else
        {
            const newImg = data.image[0] ? await AppwriteService.uploadFile(data.image[0]) : null
            if(newImg)
            {
                const newImgId = newImg.$id
                data.featuredImage = newImgId
                const newPost = await AppwriteService.createPost({ ...data, userId:userData.$id, userName:userData.name } )
                if(newPost)
                {
                    navigate(`/Post/${newPost.$id}`)
                }
            }
        }
        
    }

    useEffect(()=>{
        if(Post)
        {
            slugTransform(Post.title)
        }
    },[])

    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string' && value.length>0)
        {
            const slug = value.toLowerCase().replace(/ /g, '-');
            setValue("slug",slug)
            return slug
        }
        setValue("slug",'')
        return ""
    })

    useEffect(()=>{
        const subscription = watch((value,{name})=> {
            if(name==='title')
            {
                slugTransform(value.title)
            }
        })
        return ()=>{
                subscription.unsubscribe()
            }
    },[watch,slugTransform,setValue])

    return(
            <form id="Form" onSubmit={handleSubmit(submit)} style={{marginTop:"50px"}}>
            <h2>{Post ? "Edit Post" : "Add Post"}</h2>
            <div className="form-content">
                <div id='titlediv'>
                <Input label='Title:' placeholder="Enter title" {...register("title",{required: true})}/>
                <Input label='Slug:' placeholder="Slug value" {...register("slug",{required:true})} onInput={(e)=>{setValue("slug",slugTransform(e.currentTarget.value))}} disabled />
                <RTE id="RTE" name="content" label="Content:" control={control} defaultValue={getValues("content")}/>
                </div>
                <div id='imagediv'>
                <Input label="Image: " type="file" accept="image/png, image/jpg, image/jpeg, image/gif" {...register("image",{required: !Post})}/>
                {Post && <img style={{height:"170px", objectFit:"contain"}} src={AppwriteService.getFileView(Post.featuredImage)}/>}
                <Select options={["active","inactive"]} label="Status" {...register("status",{required:true})}/>
                <button type="submit" id="Submit">{Post ? "Update" : "Submit"}</button>
                </div>
            </div>
            </form>

    )
} 

export default PostForm