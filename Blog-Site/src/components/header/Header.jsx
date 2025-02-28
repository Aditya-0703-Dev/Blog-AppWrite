import {React} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Container, Logo, LogoutBtn} from '../componentsIndex'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

function Header() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const navigate = useNavigate();

    const navItems = [
        {
            title: 'Home',
            slug: '/',
            active: true,
            component: <HomeOutlinedIcon style={{marginBottom: "4px"}}/>,
        },
        {
            title: 'Login',
            slug: '/login',
            active: !isLoggedIn,
            component: <LoginOutlinedIcon style={{marginBottom: "4px"}} />,
        },
        {
            title: 'Register',
            slug: '/signup',
            active: !isLoggedIn,
            component: <HowToRegOutlinedIcon style={{marginBottom: "4px"}} />,
        },
        {
            title: 'All Posts',
            slug: '/all-posts',
            active: isLoggedIn,
            component: <ListOutlinedIcon style={{marginBottom: "4px"}} />,
        },
        {
            title: 'Add Post',
            slug: '/add-post',
            active: isLoggedIn,
            component: <AddBoxOutlinedIcon style={{marginBottom: "4px"}} />,
        }
    ]

    return (
        <header className='py-3 shadow bg-white sticky top-0 z-10'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Logo />
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item) => (
                            item.active ? (
                                <li key={item.title} className='content-center'>
                                    <button onClick={() => navigate(item.slug)} className='inline-block px-6 py-2 duration-200 hover:bg-teal-600 hover:text-white rounded-full'>
                                        {item.component} {item.title}
                                    </button>
                                </li>
                            ) : null
                        ))}
                        {isLoggedIn && (
                            <li className="content-center" >
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
