import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Card.css"

const Card = (props) => {

  return (
    <div className='container'>
        <h4 className='name'>{props.name}</h4>
        <img src={props.image} className='img'/>
        <div className='diet'>{props.diets.map(e => <p>{e.name}</p>)}</div>
        <p className='score'>{props.healthScore}</p>
        <NavLink to={`/recipe-detail/${props.id}`}>Details</NavLink>
    </div>
  )
}

export default Card