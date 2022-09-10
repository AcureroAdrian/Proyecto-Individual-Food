import React, { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { getRecipeId } from "../../redux/recipeSlice";
import { useDispatch, useSelector } from "react-redux"
import { reset } from '../../redux/recipeSlice';
/* import { Cards } from   */


const Details = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const { recipeById } = useSelector(state => state.recipes);

//

    useEffect(() => {
        dispatch(getRecipeId(id));
        dispatch(reset());
    }, [])
//

  return (

    <div>
      {typeof recipeById === "object" ? 
        <div>
        <h1>Details</h1>
        <NavLink to="/home" >Home</NavLink>
        {/* Name */}
        <h3>{recipeById.name}</h3>
        {/* Image */}
        <img src={recipeById.image} alt={`Image to ${recipeById.name}`} />
        {/* Summary */}
        <h3>Summary</h3>
        <p>{(recipeById.summary)}</p>
        <h3>HealthScore</h3>
        <h4>{recipeById.healthScore}</h4>
        {/* Steps */}
        {recipeById.steps ? <h2>Steps</h2> : null}
        {recipeById.steps?.map(step => <p>{`• ${step}`}</p>)}
        {/* Dishes */}
        {recipeById.steps ? <h2>Dish Type</h2> : null}
        {recipeById.dishTypes?.map(dish => <p>{`• ${dish}`}</p>)}
        {/* Diets */}
        <h2>Type Diets</h2>
        {recipeById.Diets.map(e => <p>{e.name}</p>)}
        </div> 
        
        : null}

      </div>

  )
}

export default Details