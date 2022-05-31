import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

import { Button } from "bootstrap";
import './Header.css'
const Navbar = () => {
    const [activeTab, setActiveTab] = useState('Object');
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/") {
            setActiveTab("Object");
        } else if (location.pathname === "/add") {
            setActiveTab("AddContact");

        }
    }, [location])
    return (
        <>
    <div className='header'>Contacts
    <Link to='/object'>
<p className={`${activeTab === "Object"? "active" : ""}`}
onClick={ () => setActiveTab("Object")}> Home</p>
</Link>

<Link to='/add'>
<p className={`${activeTab === "AddContact"? "active" : ""}`}
onClick={ () => setActiveTab("AddContact")}
> Add Contact</p></Link>
</div>
</>
    )
}
export default Navbar;