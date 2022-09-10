import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, postRecipe } from "../../redux/recipeSlice";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Form.css";

const Form = () => {
  const [stepsInput, setStepsInput] = useState([{ step: 1 }]);
  const [steps, setSteps] = useState([""]);
  const [dietsInput, setDietsInput] = useState([{ diet: 1 }]);
  const [diets, setDiets] = useState([""]);
  const [dishesInput, setDishesInput] = useState([{ dish: 1}]);
  const [dishes, setDishes] = useState([""])
  const [validateName, setValidateName] = useState("Empty");
  const [validateSummary, setValidateSummary] = useState("Empty");
  const [mount, setMount] = useState(false)

  const { allRecipes, idPost } = useSelector(state => state.recipes)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handleClicks

  const handleClickSteps = (e) => {
    e.preventDefault()

    if (e.target.value === "add") {

      setStepsInput([...stepsInput, { step: stepsInput.length + 1 }]);
      setSteps([...steps, ""])
    }
    else if (e.target.value === "subtract" && stepsInput.length > 0){
      const temp = stepsInput;
      temp.pop()
      setStepsInput([...temp]);

      const temp2 = steps;
      temp2.pop()
      setSteps([...temp2]);
    }
  };

  //

  const handleClickDiets = (e) => {
    e.preventDefault()

    if (e.target.value === "add") {

      setDietsInput([...dietsInput, { diet: dietsInput.length + 1 }]);
      setDiets([...diets, ""])
    }
    else if (e.target.value === "subtract" && dietsInput.length > 0){
      const temp = dietsInput;
      temp.pop()
      setDietsInput([...temp]);

      const temp2 = diets;
      temp2.pop()
      setDiets([...temp2]);
    }
  }

  //

  const handleClickDishes = (e) => {
    e.preventDefault();

    if (e.target.value === "add") {
      setDishesInput([...dishesInput, { dish: dishesInput.length + 1 }]);
      setDishes([...dishes, ""])
    }
    else if (e.target.value === "subtract" && dishesInput.length > 0){
      const temp = dishesInput;
      temp.pop()
      setDishesInput([...temp]);

      const temp2 = dishes;
      temp2.pop()
      setDishes([...temp2]);
    }
  }

  // handleChanges

  const handleChange = ({target}) => {

    if (target.name === "step") {
      const temp = steps
      //Si el espacio esta vacio
      if (target.value.match(/^\s+$/) !== null || target.value.length) { 
        temp[target.step - 1] = true
        setSteps([...temp]);
        return
      };
      //Se guarda normalmente
      temp[target.step - 1] = target.value.trim().replace(/\s\s+/g, ' ')
      setSteps([...temp])
    } else if (target.name === "diet") {
      const temp = diets
      //
      if (target.value.match(/^\s+$/) !== null) { 
        temp[target.step - 1] = true
        setDiets([...temp]);
        return
      };
      //
      temp[target.step - 1] = target.value.trim().replace(/\s\s+/g, ' ')
      setDiets([...temp])
    } else if (target.name === "dish") {
      const temp = dishes
      //
      if (target.value.match(/^\s+$/) !== null) { 
        temp[target.step - 1] = true
        setDishes([...temp]);
        return
      };
      //
      temp[target.step - 1] = target.value.trim().replace(/\s\s+/g, ' ')
      setDishes([...temp])
    } 

  }

  //

  const handleChangeName = ({target}) => {

    if (target.value.length < 1 || target.value.match(/^\s+$/) !== null) setValidateName("Name cannot be empty")

    else {
      const validate = allRecipes.find(e => e.name.toLowerCase() === target.value.toLowerCase());
    
    if (validate) {
      setValidateName("This name already exist");
    } else {
      setValidateName("Good")
    }
    }
  }

  //

  const handleChangeSummary = ({target}) => {

    if (target.value.length < 1 || target.value.match(/^\s+$/) !== null) setValidateSummary("Summary cannot be empty")
    else setValidateSummary("Good");

  }

  //handleSubmit

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {target} = e;


    if (target[0].value.length < 1 ) return setValidateName("Name cannot be empty");
    if (target[1].value.length < 1 ) return setValidateSummary("Summary cannot be empty");
    if (diets.find(e => e === true)) return
    if (steps.find(e => e === true)) return
    if (steps.find(e => e === true)) return

    let temp = steps
    for (let i = 0; i < steps.length; i++) {
      if (temp[i].length === 0){
        temp[i] = true
        return setSteps([...temp]) 
      }
    }

    temp = diets
    for (let i = 0; i < diets.length; i++) {
      if (temp[i].length === 0){
        temp[i] = true
        return setDiets([...temp]) 
      }
    }

    temp = dishes
    for (let i = 0; i < dishes.length; i++) {
      if (temp[i].length === 0){
        temp[i] = true
        return setDishes([...temp]) 
      }
    }

    if (validateName === "Good" && validateSummary === "Good") {

      const body = {
        name: null,
        summary: null,
        healthScore: null,
        image: null, 
        steps: steps.length > 0 ? steps : null,
        dishTypes: dishes.length > 0 ? dishes : null,
        typeDiet: diets.length > 0 ? diets : null
      }

      //Hacer este forin no es necesario, pero al momento de escalar el codigo es mucho mas facil asi
      for (const key in target) {

        if (!isNaN(Number(key))) {

          if (target[key].name === "name") body.name = target[key].value.trim().replace(/\s\s+/g, ' ');
          //
          else if (target[key].name === "summary") body.summary = target[key].value.trim().replace(/\s\s+/g, ' ');
          //
          else if (target[key].name === "healthScore") body.healthScore = Number(target[key].value);
          //
          else if (target[key].name === "image") body.image = target[key].value;
  
        } else break;
      }

      await dispatch(postRecipe(body))

    }

    console.log("Esta entrando")
    navigate(`/recipe-detail/${idPost}`)
  }

  

  useEffect(() => {

    if (allRecipes.length < 1) dispatch(getAllRecipes())

    if (typeof idPost === "number") navigate(`/recipe-detail/${idPost}`)

  }, [idPost])


  return (
    <div>
      <h1>Crea tu Receta</h1>
      <NavLink to={"/home"}>Home</NavLink>
      <br />
      <br />
    <form onSubmit={handleSubmit}>
      {/* Name */}
      <label htmlFor="name">Name: </label>
      <br />
      <input name="name" id="name" type="text" className={validateName !== "Good" && validateName !== "Empty" ? "error" : ""} autoComplete="off" onChange={handleChangeName}/>
      {validateName !== "Good" && validateName !== "Empty" ? [<br />, <label className="errorTxt" >{`${validateName}`}</label>] : null}
      <br />
      {/* Summary */}
      <label htmlFor="summary">summary: </label>
      <br />
      <textarea name="summary" id="summary" cols="21" rows="6" className={validateSummary !== "Good" && validateSummary !== "Empty" ? "error" : ""} onChange={handleChangeSummary}/>
      {validateSummary !== "Good" && validateSummary !== "Empty" ? [<br />, <label className="errorTxt" >{`${validateSummary}`}</label>] : null}
      <br />
      {/* HealthScore */}
      <label htmlFor="healthScore">HealthScore: </label>
      <br />
      <input name="healthScore" type="number" min="0" max="100" id="healthScore" placeholder="(between 0 and 100)"
       style={{width: "167px"}} />
      <br />
      {/* Image */}
      <label htmlFor="image">Image: </label>
      <br />
      <input name="image" id="image" type="text" autoComplete="off" placeholder="(URL LINK)"/>
      <br />
      <br />
      {/* Steps */}
      <label htmlFor="steps">Steps: </label>
      <button value="subtract" onClick={handleClickSteps}>-</button>
      <button value="add" onClick={handleClickSteps}>+</button>
      <br />
      {stepsInput.map(e => {
        return [<label htmlFor={`step${e.step}`} >{`Step #${e.step}: `}</label>, 
        <br />,
        <input type="text" name="step" step={e.step} id={`step${e.step}`} minLength="5" className={steps[e.step -1] === true ? "error" : ""}  autoComplete="off" required onChange={handleChange}/>,
        <span>{steps[e.step-1] === true ? [<br />, <label className="errorTxt" >{`Error, the step #${e.step} is empty`}</label>] : null}</span>,
        <br />]
      })}
      <br />
      {/* Diet */}
      <label >Add Diet: </label>
      <button value="subtract" onClick={handleClickDiets}>-</button>
      <button value="add" onClick={handleClickDiets}>+</button>
      <br />
      {dietsInput.map(e => {
        return [<label htmlFor={`diet${e.diet}`} >{`Diet #${e.diet}: `}</label>, 
        <br />,
        <input type="text" name="diet" step={e.diet} id={`diet${e.diet}`} className={diets[e.diet -1] === true ? "error" : ""} autoComplete="off" required onChange={handleChange}/>,
        <span>{diets[e.diet-1] === true ? [<br />, <label className="errorTxt" >{`Error, the diet #${e.diet} is empty`}</label>] : null}</span>,
        <br />]
      })}
      <br />
      {/* dish */}
      <label>Add Dish: </label>
      <button value="subtract" onClick={handleClickDishes}>-</button>
      <button value="add" onClick={handleClickDishes}>+</button>
      <br />
      {dishesInput.map(e => {
        return [<label htmlFor={`dish${e.dish}`} >{`Dish #${e.dish}: `}</label>, 
        <br />,
        <input type="text" name="dish" step={e.dish} id={`dish${e.dish}`} className={dishes[e.dish -1] === true ? "error" : ""}autoComplete="off" required onChange={handleChange}/>,
        <span>{dishes[e.dish-1] === true ? [<br />, <label className="errorTxt" >{`Error, the dish #${e.dish} is empty`}</label>] : null}</span>,
        <br />]
      })}
      <br />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default Form;
