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
 * Generates a recipe using the Google Gemini API based on a list of ingredients.
 *
 * @param {string[]} ingredientsArr - An array of ingredient strings.
 * @returns {Promise<string|undefined>} A promise that resolves to the recipe content in markdown, or undefined if an error occurs.
 */
export async function getRecipeFromGemini(ingredientsArr) {
    // The system prompt provides instructions to the AI model on how to behave.
    const systemPrompt = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. mostly give simple recipes. give step by step and easy to read Format your response in markdown to make it easier to render to a web page.
`;

    // Join the array of ingredients into a single comma-separated string.
    const ingredientsString = ingredientsArr.join(", ");
    
    // The user's request, incorporating the ingredients.
    const userPrompt = `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`;

    // The API endpoint for the Gemini Flash model. An API key is not required for free-tier usage in this environment.
    const apiKey = import.meta.env.VITE_API_KEY; // Ensure you have set this environment variable with your API key.";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    // Structure the conversation history for the API call.
    const chatHistory = [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Understood. I will provide a recipe based on the ingredients provided, formatted in markdown." }] },
        { role: "user", parts: [{ text: userPrompt }] }
    ];

    // The complete payload for the API request.
    const payload = {
        contents: chatHistory,
        generationConfig: {
            // maxOutputTokens is equivalent to max_tokens.
            maxOutputTokens: 1024,
        }
    };

    try {
        // Make the POST request to the Gemini API.
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
        // Log any errors that occur during the API call.
        console.error(err.message);
        return undefined; // Return undefined to indicate failure.
    }
}


