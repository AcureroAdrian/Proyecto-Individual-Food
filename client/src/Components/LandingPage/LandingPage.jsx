import React from 'react'
import "./LandingPage.css";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

  const navigate = useNavigate()
  return (
    <div className='image'>
      <div className="card">
        <h1>Proyecto individual de Adrian Acurero</h1>
        <button className='button' onClick={() => navigate("/home")}>Let's get it!</button>
      </div>
    </div>
  )
}

export default LandingPage