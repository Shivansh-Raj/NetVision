import React, {useEffect, useState} from 'react';
import './Login.css';
import loginImg1 from "../assets/loginImg1.png"
import loginImg2 from "../assets/loginImg2.png"
import loginImg3 from "../assets/loginImg3.png"
import loginKids from "../assets/loginKids.png"
import Form from './form';
import { Navigate, useNavigate } from 'react-router-dom'

function Login({isLogin, isSignup}) {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(""); 
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        const handleScroll = () => {
          const sections = document.querySelectorAll('.app__section');
          const triggerPoint = window.innerHeight/1.2;
    
          sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
    
            if (sectionTop < triggerPoint) {
              section.classList.add('visible');
            }
          });
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
      const handleUsernameChange = (e) => {
        setUsername(e.target.value)
      }
      const handlePasswordChange = (e) => {
        setPassword(e.target.value)
      }
      const handleEmailChange = (e) => {
        setEmail(e.target.value)
      }
      const handleGetStarted = async () => {
        console.log("Getting started!!")
        setShowForm(true)
      }
      const navigateToRegister = () => {
        setShowForm(false);
        if (isLogin) {
          navigate("/signup");
        } else {
          navigate("/login");
        }
      }

  return (
    <div className="app">
      <div className="app__background">
        <img 
          className="app__logo" 
          src="https://assets.nflxext.com/ffe/siteui/common/icons/nficon2016.png" 
          alt="Netflix Logo" 
        />
        <button className="app__button" onClick={navigateToRegister}>{isSignup? "Login": "SignUp"}</button>
        <div className="app__gradient"></div>
      </div>
      <div className="app__body">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>Ready to watch? Enter your email to create or restart your membership.</p>
        <div className="app__input">
            {showForm && <><input 
                type="text"
                placeholder="username"
                value={username}
                onChange={handleUsernameChange}
            />
            <input 
                type="text"
                placeholder="password"
                value={password}
                onChange={handlePasswordChange}
            /></>}
            
            {isSignup && <input 
                type="email"
                placeholder="Email address"
                value={email}
                onChange={handleEmailChange}
            />}
          {!showForm && <button className="app__getStarted" onClick={handleGetStarted}>Get Started</button>}
        </div>
        {showForm && isLogin && (
            <Form
            method="login"
            route="/api/token/"
            username={username}
            password={password}
            />
        )}
        {showForm && isSignup && (
            <Form
            method="signup"
            route="/api/user/register"
            username={username}
            password={password}
            email = {email}
            />
        )}
      </div>

      {/* Scroll Feature */}
      <div className="app__sections">
        <section className="app__section app__section--left">
          <div className="app__text">
            <h3>Enjoy on your TV.</h3>
            <p>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
          </div>
          <img src={loginImg1} alt="TV Image" />
        </section>
        <section className="app__section app__section--right">
          <img src={loginImg2} alt="Download Image" />
          <div className="app__text">
            <h3>Download your shows to watch offline.</h3>
            <p>Save your favorites easily and always have something to watch.</p>
          </div>
        </section>
        <section className="app__section app__section--left">
          <div className="app__text">
            <h3>Watch everywhere.</h3>
            <p>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.</p>
          </div>
          <img src={loginImg3} alt="Watch Everywhere Image" />
        </section>
        <section className="app__section app__section--right">
          <img src={loginKids} alt="Kids Profile Image" />
          <div className="app__text">
            <h3>Create profiles for kids.</h3>
            <p>Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
