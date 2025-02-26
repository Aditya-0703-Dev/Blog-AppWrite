import React, {useState, useEffect} from 'react'
import { Button, Container, PostCard } from '../components/componentsIndex'
import postService from '../appwrite/post'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';


function Home() {

    const [posts, setPosts] = useState({documents: []});
    const authStatus = useSelector((state) => state.isLoggedIn);
    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await postService.GetPosts();
            if (posts) {
                setPosts(posts);
                console.log(posts.documents.length);
            }
        };
        fetchPosts();
    }, []);

    if(!authStatus && posts.documents.length === 0){
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-col justify-center items-center h-96'>
                        <h1 className='text-5xl font-bold mb-4'>Welcome to ThoughtStream</h1>
                        <h3 className='text-xl text-gray-500'>Where ideas flow, stories unfold, and insights shape perspectives.</h3>
                        <Link to={'/login'}>
                            <Button className='mt-4 bg-teal-600 hover:bg-teal-800 duration-200 rounded-md'>Unlock the Stream - Log In to Explore!</Button>
                        </Link>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='py-8 w-full'>
            <Container>
                <div className='flex flex-wrap'>
                    {authStatus && posts.documents.map((post) => (
                        <div className='p-2 w-1/4' key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
