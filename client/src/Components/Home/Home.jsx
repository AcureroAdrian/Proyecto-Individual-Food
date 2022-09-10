import React from "react";
import Navbar from "../Navbar/Navbar";
import { getAllRecipes, paginated } from "../../redux/recipeSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import "./Home.css"
import Card from "../Cards/Card";

const Home = () => {
  const dispatch = useDispatch();

  const { findRecipes, allRecipes, statusFind, input, recipePage } = useSelector(
    (state) => state.recipes
  );

  useEffect(async () => {
    await dispatch(getAllRecipes());
    dispatch(paginated(0))
  }, []);

  useEffect( () => {
    dispatch(paginated(0))
  }, [findRecipes])

  return (
    <div>
      <Navbar />

      <div className="container">

        {input.length !== 0 && statusFind !== "Success" ?
         `La receta ${input} no existe` :
         recipePage.map(e =>
         <Card
          name={e.name}
          image={e.image}
          diets={e.Diets}
          healthScore={e.healthScore}
          id={e.id}
        /> )
         }
      </div>
    </div>
  );
};

export default Home;
