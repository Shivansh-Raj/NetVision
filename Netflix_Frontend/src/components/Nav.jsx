import React,{useState,useEffect} from 'react';
import "./Nav.css";
import reactsvg from '../assets/react.svg'
import SearchIcon from '@mui/icons-material/Search';
import Search from './Search';
import { Navigate, useNavigate } from 'react-router-dom';

const Nav= ({setSearching, searching})=> {
    const navigate = useNavigate()
    const [show, handleShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false); 
    const toLogin = () => {
        navigate("/login")
    }
    const toHome = () => {
        navigate("/")
    }

    useEffect(()=>{
        window.addEventListener("scroll", () =>{
            if(window.scrollY > 50){
                setIsSearchActive(false);
                handleShow(true);
            }else{
                handleShow( false);
            }
            
        });
        return () => {
            window.removeEventListener("scroll",()=>{})
        }
    }, [])
    // Handle search term change
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        if(event.target.value.length != 0) {
            setSearching(true);
            setSearchTerm(event.target.value);
        } else {
            setSearching(false);
        }
    };

    // Toggle search bar on microscope click
    const toggleSearchBar = () => {
        handleShow(!show || window.scrollY > 50);
        setIsSearchActive((prevState) => !prevState);
    };
    return (
    <>
        <nav className={`nav ${show && "nav__black"}`}>
            <img
                alt="Netflix logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
                className="nav__logo"
                onClick={toHome}
            />

            {/* Microscope Icon */}
            <SearchIcon
                    className="nav__microscope"
                    onClick={toggleSearchBar }
                    style={{ cursor: 'pointer' }}
                />
            
            <img
                alt="User logged"
                src={reactsvg}
                className="nav__avatar"
                onClick={toLogin}
            />
        </nav>
        {/* Full-width Search Bar */}
        {isSearchActive && (
            <div className="search__bar">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search__input"
                />
            </div>
        )}
        {searching && <Search content={searchTerm}/>}
    </>
    )
}

export default Nav
