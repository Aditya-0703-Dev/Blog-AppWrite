import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components/componentsIndex'
import postService from '../appwrite/post'

function Home() {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        postService.GetPosts().then((posts) => {
            if(posts){
                setPosts(posts)
            }
        })
    }, [])

    if(posts.length === 0){
        return (
            <div className='w-full py-8'>
                <Container>
                    <h1 className='text-3xl font-bold'>No Posts Found</h1>
                </Container>
            </div>
        )
    }

    return (
        <div className='py-8 w-full'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div className='p-2 w-1/4'>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
