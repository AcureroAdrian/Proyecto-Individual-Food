import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import { getAllDiets } from "../../redux/dietSlice";
import { findRecipes as search, paginated as actionPaginated } from "../../redux/recipeSlice";
import "./Navbar.css"

const Navbar = () => {

  const dispatch = useDispatch();
  const [isMount, setIsMount] = useState(false)
  const [name, setName] = useState("");
  const [orderName, setOrderName] = useState("default");
  const [orderDiet, setOrderDiet] = useState("default");
  const [orderScore, setOrderScore] = useState("default");
  const { diets } = useSelector((state) => state.diets);
  const { allRecipes, findRecipes, input} = useSelector(state => state.recipes);
  //
  useEffect(() => {

    if(!isMount) {
      setIsMount(true);
      dispatch(getAllDiets())
    }
    else {
      dispatch(
        search({
          name,
          orderName,
          orderDiet,
          orderScore
        })
      );
    }

  }, [name, orderName, orderScore, orderDiet]);

  //

  const handleChange = ({target}) => {
    setName(target.value);
  };

  const handleOrderByName = ({target}) => {
    setOrderName(target.value);
  };

  const handleOrderScore = ({target}) => {
    setOrderScore(target.value);
  };

  const handleOrderDiet = ({target}) => {
    setOrderDiet(target.value);
  };

  //

  const handleClickPaginated = ({target}) => {
    dispatch(actionPaginated(Number(target.name)))
  }

  //

  const paginated = () => {

    const pages = [];
    let count = 1;

    if (findRecipes.length > 0) {
      for (let i = 0; i < findRecipes.length; i+=9) {
        pages[count] = <button name={i} onClick={handleClickPaginated}>{count}</button>
        count++
      }
      return pages
    } else if (input.length !== 0) return [];

      if (allRecipes.length > 0) {
        for (let i = 0; i < allRecipes.length; i+=9) {
          pages[count] = <button name={i} onClick={handleClickPaginated}>{count}</button>
          count++
        }
        return pages
    }
  }

  return (
    <div>
      <h1>NavBar</h1>
      <NavLink to="/recipe-create">Create a Recipe</NavLink>
      <br />
      <br />
      <input type="text" placeholder="Search recipe" onChange={handleChange} />
      {/*  */}
      <select name="" id="selectOrder" onChange={handleOrderByName}>
        <option hidden>Order by Name</option>
        {
          orderName !== "default" ? 
            <option key="cancel" value="default" className="cancel">
              Cancel
            </option>
           : null /* <option hidden>Select by Name</option> */
        }
        <option value="ASC">A/Z</option>
        <option value="DESC">Z/A</option>
      </select>
      {/*  */}
      <select id="selectDiet" onChange={handleOrderDiet}>
        <option hidden>Order by Diets</option>
        {orderDiet !== "default" ? 
            <option key="cancel" value="default" className="cancel">
              Cancel
            </option>
           : null /* <option hidden>Select by Diets</option> */       }
        {diets?.map((e) => 
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        )}
      </select>
      {/*  */}
      <select name="" id="selectScore" onChange={handleOrderScore}>
        <option hidden>Order by Score</option>
        {
          orderScore !== "default" ? 
            <option key="cancel" value="default" className="cancel">
              Cancel
            </option>
           : null /* <option hidden>Select by Score</option> */
        }
        <option value="ASC">Min Score</option>
        <option value="DESC">Max Score</option>
      </select>
      <br />
      {paginated()}
    </div>
  );
};

export default Navbar;
