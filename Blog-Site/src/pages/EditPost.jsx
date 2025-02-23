import React, {useState, useEffect} from 'react'
import { Container, PostForm } from '../components/componentsIndex'
import postService from '../appwrite/post'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {

    const {post, setPost} = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            postService.GetPost(slug).then((post) => {
                if(post){
                    setPost(post)
                }
            })
        } else {
            navigate('/')
        }
    },[slug, navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost
