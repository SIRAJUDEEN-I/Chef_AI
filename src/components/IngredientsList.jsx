export default function ingredientsList(props) {
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))
    return (
       <section>
                <h2 className="text-3xl font-bold text-[#141413]} pr-30 mt-7">Ingredients on hand:</h2>
                <ul className="mt-10 mr-70 pl-5 mb-10 list-disc">{ingredientsListItems}</ul>

                <div className="bg-gray-200  flex flex-col rounded-2xl pr-50">
                    <h3 className=" mt-5 text-2xl pl-5 font-bold">Ready for a Recipe?</h3>
                    <p className="p-5 pb-0 mb-0">generate a recipe with your ingredients.</p>
                    <button className="border ml-40 mt-3 p-0 m-0 mb-5 bg-amber-400" onClick={props.getRecipe}>Get a Recipe</button>
                </div>
                
                </section>
    )
}