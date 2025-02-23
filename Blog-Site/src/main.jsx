import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Protected } from './components/componentsIndex.js'
import { AddPost, AllPost, EditPost, Home, Login , Post, Signup } from './pages/pagesIndex.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route path='' element={<Home />} />
      <Route path='/login' element={
        <Protected authentication={false}>
          <Login />
        </Protected>
      } />
      <Route path='/signup' element={
        <Protected authentication={false}>
          <Signup />
        </Protected>
      } />
      <Route path='/all-posts' element={
        <AllPost />
      } />
      <Route path='/edit-post/:slug' element={
        <Protected>
          <EditPost />
        </Protected>
      } />
      <Route path='/add-post' element={
        <Protected>
          <AddPost />
        </Protected>
      } />
      <Route path='/post/:slug' element={
        <Post />
      } />
    </Route>
  )
)



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
