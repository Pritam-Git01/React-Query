import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Header.css"
const Header = () => {
  return (
    <div className='header'>
        <Link to={"/"}>Home</Link>
        <Link to={"/rq-super-heroes"}>EQ Super Heroes</Link>
        <Link to={"/super-heroes"}>Super Heroes</Link>
        <Link to={"/temp-heroes"}>Temp Heroes</Link>
        <Link to={"/dynamic-parallel-query"}>Dynamic Query</Link>
        <Link to={'/dependent-queries'}>Dependent Query</Link>
        <Link to={"/paginated-queries"}>Paginated Query</Link>
        <Link to={"/infinite-queries"}>Infinte Query</Link>

    </div>
  )
}

export default Header