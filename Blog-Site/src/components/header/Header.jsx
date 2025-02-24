import {React} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Container, Logo, LogoutBtn} from '../componentsIndex'

function Header() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const navigate = useNavigate();

    const navItems = [
        {
            title: 'Home',
            slug: '/',
            active: true
        },
        {
            title: 'Login',
            slug: '/login',
            active: !isLoggedIn
        },
        {
            title: 'Register',
            slug: '/signup',
            active: !isLoggedIn
        },
        {
            title: 'All Posts',
            slug: '/all-posts',
            active: isLoggedIn
        },
        {
            title: 'Add Post',
            slug: '/add-post',
            active: isLoggedIn
        }
    ]

    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Logo />
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item) => (
                            item.active ? (
                                <li key={item.title}>
                                    <button onClick={() => navigate(item.slug)} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                                        {item.title}
                                    </button>
                                </li>
                            ) : null
                        ))}
                        {isLoggedIn && (
                            <li>
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
