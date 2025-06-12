import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import FadeContent from '../animation/FadeContent.jsx';



export default function AiRecipe(props) {
    const recipeRef = useRef(null);

    useEffect(() => {
        if (recipeRef.current) {
            recipeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
    }, [props.recipe]);

    return (
        <section>
            <h2 className="text-2xl px-2 pb-2 md:text-3xl font-bold text-[#141413] mt-10">Your Recipe:</h2>
            <div
                ref={recipeRef}
                className="recipe-content mt-3 mb-10 p-5 bg-gray-100 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-400"
                tabIndex={-1}>
                <h2 className="text-2xl font-bold mb-3 pl-auto">Recipe Instructions</h2>
                <FadeContent>
                <p className="text-lg">
                    <Markdown>{props.recipe}</Markdown>
                </p>
                </FadeContent>
            </div>
        </section>
    );
}