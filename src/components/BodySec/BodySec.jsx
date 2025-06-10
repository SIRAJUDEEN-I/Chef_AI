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
        <li  key={ingredient}>{ingredient}</li>
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
        
        <main className="body-sec flex flex-col items-center justify-center mt-10 px-4 sm:px-8 md:px-16">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#141413] text-center">What ingredients do you have? on mind </h1>

             <form action={addIngredient} className="add-ingredient-form flex flex-col sm:flex-row justify-center gap-4 h-auto sm:h-[38px] mt-10 w-full  max-w-xl">
                <input
                    type="text"
                    name="ingredient"
                    placeholder="eg. Oregano"
                    className="pl-3 border-dashed border-2 border-[#D1D5DB] rounded transition focus:scale-110 py-2 ml-3 mr-3 sm:w-80 w-auto lg:py-5"
                />
                <button className="bg-[#141413] font-medium text-white rounded-3xl py-2 ml-auto mr-auto transition hover:scale-105 w-60  ">
                    + Add Ingredients to the list
                </button>
            </form>
          
            {ingredients.length > 0 &&
                <section className="motion-preset-slide-down w-full max-w-2xl">
                    <h2 className="text-xl sm:text-3xl font-bold text-[#141413] mt-7">Ingredients on hand:</h2>
                    <ul className="mt-5 pl-5 mb-10 list-disc text-[20px] md:text-2xl">{ingredientsListItems}</ul>

                    <div className="bg-gray-200 flex flex-col rounded-2xl p-5">
                        <h3 className="mt-2 text-lg sm:text-2xl font-bold">Ready for a Recipe?</h3>
                        <p className="mb-2">Generate a recipe with your ingredients.</p>
                        <button className="border mt-3 bg-amber-400 transition-transform focus:scale-90 hover:scale-110 focus:ring-2 rounded-2xl focus:bg-amber-300  ml-auto  mr-auto px-5 py-[3px] md:ml-55 md:w-40 m" onClick={getRecipe}>
                            Get a Recipe
                        </button>
                    </div>
                </section>
            }
            {recipe && <AiRecipe recipe={recipe} />}
        </main>
        
    )
}