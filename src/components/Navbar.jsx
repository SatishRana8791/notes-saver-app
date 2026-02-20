import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 justify-around pt-3 pb-3 bg-slate-900'>

        <NavLink 
          to="/"
          style={({ isActive }) => ({ color: isActive ? '#60a5fa' : 'white' })}
          >
            Home
        </NavLink>
    
        <NavLink 
          to="/pastes"
          style={({ isActive }) => ({ color: isActive ? '#60a5fa' : 'white' })}
        >
          Pastes
        </NavLink>
        
        </div>
      )
}

export default Navbar;