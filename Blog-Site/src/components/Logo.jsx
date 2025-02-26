import React from 'react'
import logo from '../assets/image.svg'
import { Link } from 'react-router-dom'

function Logo({width = '130px'}) {
    return (
      <Link to={'/'}>
        <div>
          <img src={logo} alt="Logo" width={width} />
        </div>
      </Link>
      
    )
  }
  
  export default Logo
