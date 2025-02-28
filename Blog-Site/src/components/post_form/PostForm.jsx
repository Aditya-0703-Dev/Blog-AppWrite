import React , {useCallback, useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, ComboBox, RTE, Loader} from '../componentsIndex'
import postService from '../../appwrite/post'
import fileUploadService from '../../appwrite/fileupload'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {
    const {register, handleSubmit, control, watch, getValues, setValue} = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            slug: post?.slug || "",
            status: post?.status || "Active"
        }
    })

    const navigate = useNavigate()

    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const userData = useSelector(state => state.userData)

    const submit = async (data) => {
        setError("");
        setLoading(true);
        try {
            if(post){
                const file = data.image[0] ? await fileUploadService.CreateFile(data.image[0]) : null
                console.log(post);
                if(file){
                    await fileUploadService.DeleteFile(post.featuredImage)
                }
    
                const updatedPost = await postService.UpdatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage
                })
    
                if(updatedPost){
                    navigate(`/post/${updatedPost.$id}`)
                }
            } else {
                const file = data.image[0] ? await fileUploadService.CreateFile(data.image[0]) : null
                if(file){
                    const fileID = file.$id;
                    data.featuredImage = fileID;
                }
    
                const newPost = await postService.CreatePost({
                    ...data,
                    userId: userData.$id
                })
    
                if(newPost){
                    navigate(`/post/${newPost.$id}`)
                }
            }
        } catch (error) {
            setError(error.message)
        }
        setLoading(false);
    }

    const slugTransform = useCallback((value) => {
        if(value){
            return value.toLowerCase().trim().replace(/\s/g, "-")
        }
        return ""
    }, [])

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === "title"){
                setValue("slug", slugTransform(value.title))
            }
        })

        return () => {
            subscription.unsubscribe();
        }

    }, [watch, slugTransform, setValue])

    useEffect(() => {
		const fetchImage = async () => {
			const src = await fileUploadService.GetFilePreview(post.featuredImage);
			setImage(src);
		}
        if(post){
            fetchImage();
            setValue("slug", post.title ? slugTransform(post.title) : "");
        }
	}, [post]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={image}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <ComboBox
                    options={["Active", "Inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                {error && <p className="text-red-600">{error}</p>}
                <Button type="submit" bgColor={post ? "bg-green-500" : "bg-teal-600"} className={`w-full ${post ? "hover:bg-green-600" : "hover:bg-teal-800"} text-white`}>
                    {loading ? <Loader /> : post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm
