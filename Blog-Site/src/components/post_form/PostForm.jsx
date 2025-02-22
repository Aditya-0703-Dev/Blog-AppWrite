import React , {useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, ComboBox, RTE} from '../componentsIndex'
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
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) => {
        if(post){
            const file = data.image[0] ? fileUploadService.CreateFile(data.image[0]) : null

            if(file){
                fileUploadService.DeleteFile(post.featuredImage)
            }

            const updatedPost = postService.UpdatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : null
            })

            if(updatedPost){
                navigate(`/post/${updatedPost.$id}`)
            }
        } else {
            const file = data.image[0] ? fileUploadService.CreateFile(data.image[0]) : null

            if(file){
                const fileID = file.$id
                data.featuredImage = fileID
            }

            const newPost = postService.CreatePost({
                ...data,
                userId: userData.$id
            })

            if(newPost){
                navigate(`/post/${newPost.$id}`)
            }
        }

    }

    const slugTransform = useCallback((value) => {
        if(value){
            return value.toLowerCase().trim().replace(/^[a-zA-Z\d]+/g, "-")
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
            subscription.unsubscribe()
        }

    }, [watch, slugTransform, setValue])

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
                            src={fileUploadService.GetFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["Active", "Inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm
