require('dotenv/config');
const { Client, IntentsBitField } = require('discord.js');
const parseAndReply = require('./parse-and-reply.js')
const chatWithGpt = require('./chat-with-gpt.js')
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
    if (message.author.bot) return;
    if (message.content.toLowerCase().startsWith('quiet')) return;
    userInput = message.content
    
    await message.channel.sendTyping();

    const sendTypingInterval = setInterval(() => {
        message.channel.sendTyping();
    }, 5000);

    let conversationLog = [
        { role: 'system', content: "You're a Ruby on Rails coding instructor. You will respond to questions with concise answers. You will try to explain your answers with code examples in Ruby. You can also provide hyperlinks resources on the internet which will further explain the concept or examples.. You will provide great similes and metaphors for explaining concepts. These similes and metaphors should be based on real life examples that are relatable to someone who plays video games, likes Lord of the Rings, is a dad, and plays tabletop roleplaying games."}
    ]

    try {
        let prevRawMessages = await message.channel.messages.fetch({ limit: 15 });
        prevRawMessages.reverse();

        prevRawMessages.forEach((msg) => {
            if (message.content.toLowerCase().startsWith('quiet')) return;
            if (msg.author.id == client.user.id) {
                conversationLog.push({
                    role: 'assistant',
                    content: msg.content
                })
            } else {
                conversationLog.push({
                    role: 'user',
                    content: msg.content
                })
            };
        })
        
        const gptResponse = await chatWithGpt(conversationLog);
        
        clearInterval(sendTypingInterval);

        if (!gptResponse) {
            message.reply("I'm having trouble opening OpenAI. Give me a sec.");
            return;
        }

        await parseAndReply(gptResponse, message)

    } catch (error) {
        console.error(error);
    }
})

client.login(process.env.DISCORD_BOT_TOKEN);