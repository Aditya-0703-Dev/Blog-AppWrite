import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  

  return (
    <div>
      <h1>Hi MOM!</h1>
      {console.log(import.meta.env.VITE_APPWRITE_URL)
      }
    </div>
  )
}

export default App
