const axios = require('axios');

async function chatWithGpt(conversationLog) {
    const url = 'https://api.openai.com/v1/chat/completions';
    const data = {
        'model': 'gpt-4o-2024-11-20',
        'messages': conversationLog,
        'temperature': 0.7,
    }
    try {
        const gptResponse = await axios.post(url, data, {
            headers: {
                'Authorization': process.env.OPENAI_API_KEY
            }
        })
        console.log(gptResponse.data['choices'][0]['message'])
        return gptResponse.data['choices'][0]['message']['content']
    } catch(error) {
        console.log(error)
    }
}

module.exports = chatWithGpt