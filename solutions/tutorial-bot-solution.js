require('dotenv/config');
const { Client, IntentsBitField } = require('discord.js');
const axios = require('axios');
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', () => {
    console.log('The bot is online!');
});

client.on('messageCreate', async (message) => {
    // We need to ignore when `messageCreate` is triggered by the bot...otherwise we create an infinite chat loop
    if (message.author.bot) return;
    // Comment out these replies after sending your first successful Discord chat.
    // message.reply(`👋 Hi pal.\nI heard you say "*${message.content}*"`);
    // message.reply("I can also reply with code blocks ```Code goes here```");

    // Call the `chatWithGpt` function and pass what the user typed as a parameter
    const replyFromGpt = await chatWithGpt(message.content);
    
    // Reply in the Discord chat with the return of the `chatWithGpt` function
    message.reply(replyFromGpt);
})

async function chatWithGpt(chatInput) {
    const url = 'https://api.openai.com/v1/chat/completions';
    const data = {
        'model': 'gpt-4-1106-preview',
        'messages': [
            // Give your assistant a personality in the content field "You are a..."
            {role: 'system', content: 'You are a motivational speaker who gives code advice with a little flair to boost my confidence with encouragement.'},
            // Provide the chatInput as content that the "user" (not GPT) gives to GPT
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
        console.log(gptResponse.data['choices'][0]['message']);

        // return that string from this function
        return gptResponse.data['choices'][0]['message']['content']
    } catch(error) {
        console.log(error)
    }
}

client.login(process.env.DISCORD_BOT_TOKEN);