const axios = require('axios');

async function chatWithGpt(chatInput) {
    const url = 'https://api.openai.com/v1/chat/completions';
    const data = {
        'model': 'gpt-4o-2024-11-20',
        'messages': [
            // Give your assistant a personality in the content field "You are a..."
            {role: 'system', content: 'You are a valley girl. All your responses should be in the overly-flamboyant and exaggerated vernacular of a valley girl. Throw in as many emojis as possible.'},
            // Provide the chatInput as content that the human user gives to GPT
            {role: 'user', content: chatInput}
        ],
        'temperature': 0.7,
    }
    try {
        const gptResponse = await axios.post(url, data, {
            headers: {
                // Add your OpenAI auth token from the .env file
                'Authorization': process.env.OPENAI_API_KEY // Token here
            }
        })
        // use console logging to grab the string response that you want to send back to Discord
        // Hint: you'll need drill further down into 'gptResponse.data.choices'.
        console.log(gptResponse.data['choices'][0]['message']['content']);

        // return that string response from this function
        return gptResponse.data['choices'][0]['message']['content']
    } catch(error) {
        console.log(error)
    }
}

module.exports = chatWithGpt