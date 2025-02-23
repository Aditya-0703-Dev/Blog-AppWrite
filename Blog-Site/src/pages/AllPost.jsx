import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components/componentsIndex'
import postService from '../appwrite/post'

function AllPost() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        postService.GetPosts().then((posts) => {
            if(posts){
                setPosts(posts)
            }
        })
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard post={post} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default AllPost
