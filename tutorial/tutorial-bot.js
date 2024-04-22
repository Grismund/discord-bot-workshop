require('dotenv/config');
const { Client, IntentsBitField } = require('discord.js');
const chatWithGpt = require('./chat-with-gpt.js');
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
    // We need to ignore when `messageCreate` is triggered by the bot...otherwise we create an infinite chat loop.
    // Uncomment the line below.
    // if (message.author.bot) return;

    // Comment out these replies after sending your first successful Discord chat.
    message.reply(`👋 Hi pal.\nI heard you say "*${message.content}*"`);
    message.reply("I can also reply with code blocks ```Code goes here```");

    // Call the `chatWithGpt` function and pass what the user typed as a parameter
    // const replyFromGpt = await // HERE
    
    // Use the Discord client's reply method to reply with the return of the chatWithGpt function 
    // HERE;
})

client.login(process.env.DISCORD_BOT_TOKEN);