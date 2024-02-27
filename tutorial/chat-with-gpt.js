const axios = require('axios');

async function chatWithGpt(chatInput) {
    const url = 'https://api.openai.com/v1/chat/completions';
    const data = {
        'model': 'gpt-4-1106-preview',
        'messages': [
            // Give your assistant a personality in the content field "You are a..."
            {role: 'system', content: 'You are a...'},
            // Provide the chatInput as content that the "user" (not GPT) gives to GPT
            {role: 'user', content: ''}
        ],
        'temperature': 0.7,
    }
    try {
        const gptResponse = await axios.post(url, data, {
            headers: {
                // Add your OpenAI auth token from the .env file
                'Authorization': ''
            }
        })
        // use console logging to grab the string response that you want to send back to Discord
        // Hint: you'll need drill further down into 'gptResponse.data.choices'.
        console.log(gptResponse);

        // return that string from this function
        return 
    } catch(error) {
        console.log(error)
    }
}

module.exports = chatWithGpt