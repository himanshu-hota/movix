import { useState, useEffect, useCallback } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlInfo, SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./Header.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [location])
  

  const controlNavbar = useCallback(() => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShow('hide');
      } else {
        setShow('show');
      }
      setLastScrollY(window.scrollY);
    } else {
      setShow('top');
    }
  },[lastScrollY]);

  useEffect(() => {

    
    
    window.addEventListener('scroll',controlNavbar);
  
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    }
  }, [controlNavbar])
  

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  }

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  }

  const searchQueryHandler = (event) => {
    if (event.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      } ,1000)
    }
  }

  const navigationHandler = (type) => {
    if(type === 'movie'){
      navigate('/explore/movie');
    }else{
      navigate('/explore/tv');
    }

    setMobileMenu(false);
  }


  return (
    <header className={`header ${mobileMenu && 'mobileView'} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="brand-logo" onClick={() => navigate('/')} />
        </div>

        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler('movie')}>Movies</li>
          <li className="menuItem" onClick={() => navigationHandler('tv')}>TV shows</li>
          <li className="menuItem"><HiOutlineSearch onClick={openSearch} /></li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (<VscChromeClose onClick={() => setMobileMenu(false)} />) : (<SlMenu onClick={openMobileMenu} />)}
        </div>
      </ContentWrapper>

    {showSearch && <div className="searchBar">
        <ContentWrapper>
          <div className="searchInput">
            <input type="text" placeholder='Search fof a movie of tv show' onChange={(e) => setQuery(e.target.value)} onKeyUp={searchQueryHandler} />
            <VscChromeClose onClick={() => setShowSearch(false)} />
          </div>
        </ContentWrapper>
      </div>}
    </header>
  );
};

export default Header;

