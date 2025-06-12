// import { HfInference } from '@huggingface/inference'


// const SYSTEM_PROMPT = `
// You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
// `


// const hf = new HfInference(import.meta.env.VITE_ACCESS_TOKEN)

// export async function getRecipeFromMistral(ingredientsArr) {
//     const ingredientsString = ingredientsArr.join(", ")
//     try {
//         const response = await hf.chatCompletion({
//             model: "mistralai/Mistral-7B-Instruct-v0.1",
//             messages: [
//                 { role: "system", content: SYSTEM_PROMPT },
//                 { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
//             ],
//             max_tokens: 1024,
//         })
//         return response.choices[0].message.content  
//     } catch (err) {
//         console.error(err.message)
//     }
// }


/**
 * 
 *
 * @param {string[]} ingredientsArr 
 * @returns {Promise<string|undefined>} 
 */
export async function getRecipeFromGemini(ingredientsArr) {
    
    const systemPrompt = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. mostly give simple recipes. dont entertain any request not related to ingredients , food or cooking give step by step and easy to read Format your response in markdown to make it easier to render to a web page.
`;

    // Join the array of ingredients 
    const ingredientsString = ingredientsArr.join(", ");
    
    // The user's request
    const userPrompt = `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`;


    const apiKey = import.meta.env.VITE_API_KEY; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  
    const chatHistory = [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Understood. I will provide a recipe based on the ingredients provided, formatted in markdown." }] },
        { role: "user", parts: [{ text: userPrompt }] }
    ];

  
    const payload = {
        contents: chatHistory,
        generationConfig: {
            
            maxOutputTokens: 1024,
        }
    };

    try {
      
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();

     
        if (result.candidates && result.candidates.length > 0) {
            return result.candidates[0].content.parts[0].text;
        } else {
            throw new Error("No content generated in the API response.");
        }

    } catch (err) {
      
        console.error(err.message);
        return undefined;
    }
}


