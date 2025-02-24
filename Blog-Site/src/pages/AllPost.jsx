import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components/componentsIndex'
import postService from '../appwrite/post'

function AllPost() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await postService.GetPosts();
            if (posts) {
                setPosts(posts);
            }
        };
        fetchPosts();
    }, []);

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
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        posts.documents.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default AllPost
