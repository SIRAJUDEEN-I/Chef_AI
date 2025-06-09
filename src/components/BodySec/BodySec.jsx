import { useState } from "react";
import {  getRecipeFromGemini } from "../../ai";
// import {ingredientsList} from "../IngredientsList.jsx"
import AiRecipe from "./AiRecipe.jsx";



export default function BodySec(){

   const [ingredients, setIngredients] = useState(
        []
    )
   const [recipe, setRecipe] = useState("")

   const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    



     async function getRecipe() {
        const recipeMarkdown = await getRecipeFromGemini(ingredients)
        setRecipe(recipeMarkdown)
    }

    function addIngredient(formData){
        
        
        const newIngredient = formData.get('ingredient')
        if (!newIngredient) return; // Prevent adding empty ingredients
        setIngredients(prev => [...prev,newIngredient])
    }
    return (
        
        <main className="body-sec flex flex-col items-center justify-center mt-10">
            <h1 className="text-3xl font-bold text-[#141413]">What ingredients do you have? on mind </h1>

            <form action={addIngredient} className="add-ingredient-form flex justify-center gap-[12px] h-[38px] mt-10">
                <input type="text" name="ingredient" placeholder="    eg. Oregano" className="  pl-3 border-dashed border-2 border-[#D1D5DB] rounded mr-4"/>
                <button className=" bg-[#141413] font-medium text-white rounded-3xl pl-5 pr-5 transition-transform focus:scale-90 hover:scale-110 hover:bg-gray-800 ">+ Add Ingredients to the list</button>
            </form>
          
            {ingredients.length > 0 &&
                 <section className="motion-preset-slide-down">
                <h2 className="text-3xl font-bold text-[#141413]} pr-30 mt-7">Ingredients on hand:</h2>
                <ul className="mt-10 mr-70 pl-5 mb-10 list-disc">{ingredientsListItems}</ul>

                <div className="bg-gray-200  flex flex-col rounded-2xl pr-50">
                    <h3 className=" mt-5 text-2xl pl-5 font-bold">Ready for a Recipe?</h3>
                    <p className="p-5 pb-0 mb-0">generate a recipe with your ingredients.</p>
                    <button className="border    ml-50 mt-3 p-0 m-0 mb-5 bg-amber-400 transition-transform focus:scale-90 hover:scale-110 focus:ring-2 rounded-2xl focus:bg-amber-300" onClick={getRecipe}>Get a Recipe</button>
                </div>
                
                </section>
            }
                  {recipe &&  <AiRecipe recipe={recipe} />}
        </main>
        
    )
}