import { useState } from "react";

export default function BodySec(){

    const [ingredients,setIngredient] = useState([])

    

    const ingredientsListItem = ingredients.map(ingredient=>(
        <li key={ingredient}>{ingredient}</li>
    ))

    function handleSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get('ingredient')
        setIngredient(prev => [...prev,newIngredient])
    }
    return (
        
        <main>

            <form onSubmit={handleSubmit} className="add-ingredient-form flex justify-center gap-[12px] h-[38px] mt-10">
                <input type="text" name="ingredient" placeholder="    eg. Oregano" className="   border-dashed border-2 border-[#D1D5DB] rounded mr-4"/>
                <button className=" bg-[#141413] font-medium text-white rounded-3xl pl-5 pr-5 ">+ Add Ingredients</button>
            </form>
            <ul>{ingredientsListItem}</ul>
        </main>
        
    )
}