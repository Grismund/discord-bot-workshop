# Discord GPT Chatbot

## What is a Discord Bot Powered by AI?

We are going to build a way to chat with some of the most advanced AI models in the world through Discord's chat interface!

## What You Need

- Foundational knowledge of JavaScript and programming. Beginner friendly! 👏
- Forked version of this repo so you can mangle it up however you want!
  ![fork repo](/img/fork.png)
- Access to an AI through an API
  - Paid: [OpenAI API](https://platform.openai.com/api-keys) gives you access to the most advanced models of GPT, DallE, and more. This guide presumes you have paid access to the API. If you don't, get it before diving in, or try Anthropic's free version at your own risk. 😜
  - Free: [Anthropic's Claude3](https://www.anthropic.com/api) is available for free up to $5.00 worth of credits (which can last you quite a while). This is a great option if you are really confident with coding, can follow Anthropic's docs, and adapt the shape of your requests to fit what Anthropic requires. This guide will NOT walk you through that.

## How Does This Work?

![illustration of how gpt 3.5 interface works](/img/stockgpt.png)

Above is the way the familiar and free [ChatGPT 3.5 chat tool](https://chat.openai.com/) works.
- We type into the interface as user account.
- ChatGPT has a "user account" that reads what we type.
- The ChatGPT "user account" sends the conversation to the GPT3.5 brain (Large Language Model...the true AI) which is accessed through OpenAI's API.
- The GPT3.5 brain, or AI then looks at the context of the conversation and magically (yeah, basically that) predicts what the most likely response is.
- That response is sent back to the ChatGPT "user account"
- The ChatGPT "user account" then types into the chat session what the AI brain told it to type.

![illustration of how our own chatbot works](/img/botgpt.png)

Above is what we will program!
- We type into the Discord chat with our user account.
- Our bot's user account reads what we write and forwards it to our true bot.
- Our true bot is a JavaScript and Node.js application running on our local computer (or anywhere else if you get fancy with it).
- Our bot receives the chat history and can do a bunch of different things with it like decide to send it to GPT or Anthropic, or email it, or whatever!
- In this case, we send the chat history to ANY GPT AI model we want through the OpenAI API (as long as we have an account).
- The AI we specify does it's magic and sends it back to the bot running on our machine.
- Our bot then decides what to do with it... We tell it to forward it to the bot's user account which is waiting to respond on Discord.
- Our bot's user account then types back!

### Discord

Discord is an ad-free, developer-friendly platform for video calls, voice chat, and text chat. It allows users to create "servers" which are collect ions of persistent chat rooms. 

Discord is also dev-friendly. Their docs are robust and they empower devs with an incredible amount of control over the app.

### Bot

Discord allows developers to create "bots" which are essentially Discord users run by code. These "bot users" can be programmed to interact with real users (such as yourself) in chatrooms among other things. They can be programmed to do all kinds of things including reading user messages and replaying with responses from OpenAI API.

### OpenAI API

For this tutorial, you need access to OpenAI API Keys. These keys allow you to access more advanced versions of ChatGPT, Dall-E text-to-image, text-to-speech and speech-to-text among other things.

## Why Build This?

Chat GPT basic (free) has some limitations:
- ChatGPT interface only allows access to GPT 3.5.
- Code-Playground interface is not optimal for several reasons.
  - Conversations are not persistent. You will lose them over time.
  - Only a single conversation is available.
  - Eventually, the conversation gets so long, that response time is unreasonable.
- You have limited control over your ChatGPT Assistant and the chat environment.

A Discord Chatbot + OpenAI API Keys solves these problems!
- Discord can interface with all versions of GPT that your API Keys provide.
- A Discord Channel has some great advantages.
  - Multiple conversations with multiple versions of your bot are possible.
  - Extensive message history without the bog-down.
- You have extensive control over all aspects of ChatGPT and the Discord Environment.

The three main reasons I wanted to figure this out:
1. My chats in GPT were bogging down.
2. The boilerplate prompt construction was annoying to repeat.
3. I wanted a more advanced version of GPT.

## Tutorial

### Create a Discord Account and Bot-User

1. [Create a Discord Account](https://discord.com/register) or [Log in](https://discord.com/login) to your existing account.
2. Visit the [Discord Developer Portal](https://discord.com/developers/applications) to set up your first application.
3. Create a new application to run on your server. Click `New Application` at the top right, and give it a name, agree to TOS and hit `Create`.
4. Click on `Bot` to set up your first bot user. Give it USERNAME. 
5. Get your bot's private token so the code you write can login and use this bot-user in chat: Click `Reset Token` and `Yes, Do It!`. Copy the token and save it in a safe place. We will use this token later.
6. Make your bot `Private` so that no one can add it to their own server and burn through your Open API usage. Toggle off.
7. Set Privileged Gateway Intents all to ON which gives your bot-user the ability to interact on your server. `Save Changes`. By the way, the checkboxes at the bottom of the page are just for calculating something which we won't need. Don't bother with those.

### Invite the Bot-User to Your Server
1. Go to `OAuth2` on the left
2. We are going to generate a link which invites the bot to our server. Under `SCOPES` select `bot` and `applications.commands`
3. Scroll down to select the permissions we want to grant this bot. Under `BOT PERMISSIONS` select `Send Messages` and `Read Message History`.<br>
![bot permissions to check](/img/bot-permissions.png)
4. Copy the URL at the bottom of the page.
5. Return to your [Discord Dashboard](https://discord.com/channels/@me)
6. Enter your server by selecting it from the left side.
7. Select a channel within your server. `#general` should be the only one you have.
8. Paste the permissions link you copied into the Message Box at the bottom and send it.
9. Click the link. Click `Continue`, then `Authorize` with all permissions checked, and pass the Capcha to add the bot-user as a user on your server.
10. You can verify that your bot has been invited by checking the "Show Member List" icon near the top right...it looks like two people lined up to shop on Black Friday. 😆 <br>![discord users icon](/img/discord-users-icon.png)
11. Click on the bot's avatar. Notice your bot is "offline." That's because we aren't running code for it on a node server yet. So let's get to it!<br>
![bot not online](/img/bot-not-online.png)

### Set Up Your Project

Double check that node and npm are installed with `node -v` and `npm -v`. If it's not, and you're on mac, install node. `brew install node` may be appropriate, but if you aren't sure, reach out for help.

Install the packages for this project: `npm install`. This is what you get:
```json
// Helps us make HTTP requests
"axios": "^1.6.3", 

 // Gives us handy ways of interacting with Discord
"discord.js": "^14.14.1",

// Allows our code to read secret keys in a .env file
"dotenv": "^16.3.1",  
```

Create a `.env` file to store your API keys in. 

Inside your `.env` file, paste your Discord and OpenAI tokens. 

***IMPORTANT:*** Make sure that the OPENAI_API_KEY takes `Bearer` with a space in front of your token (see the example below).
```js
DISCORD_BOT_TOKEN='YourTokenGoesHere'
OPENAI_API_KEY='Bearer YourTokenGoesHere'
```

***IMPORTANT!*** Make sure your `.gitignore` file lists your `.env` file. We don't want our secret keys pushed up to a public repo!!!

### Work on Your Bot

You have some boilerplate code in the `tutorial-bot.js` file.

Run it in node: `node .`

Check that your Bot is now online. <br> ![bot online](/img/bot-online.png)

Say someting to your bot!

As you can see, Discord.js allows you to easily read what is going on in the chat conversation when we pass `message` into the `messageCreate` event listener. We can see the `message.author` or read the `.message.content` and we can `message.reply` with a string.

The rest of the tutorial is in the code. 

You're going to:
- [ ] Keep your bot from replying to it's own Discord message creations.
- [ ] Work through a function which takes your Discord input, creates a POST request to OpenAI with it, and returns OpenAI's response.
- [ ] Send OpenAI's response back to the Discord chat window.

### BONUS TASKS

These are some ideas for you to improve your bot. All of them are implemented in `/parse_bot/parse-bot.js`. Run the full version with `node /parse_bot/parse-bot.js`
- Customize your assistant
- Use Discord's `message.channel.sendTyping()` to indicate in chat that GPT is working on a repsonse
- Read chat history and send it along to OpenAI so conversations have more context
- Work around Discord's 2,000 character limit
- Parse code blocks into their own response
- Deploy somewhere!

### Deploying

#### Android 7.0+

One amusing way to deploy this bot is on an Android phone!

This is done by using an app called Termux which is a CLI for Android 7+

Follow the step by step guide to install Termux, node.js, and your repo on your phone and run it!

Termux
- [Termux Wiki](https://wiki.termux.com/wiki/Main_Page)
- [Step by step guide](https://www.freecodecamp.org/news/building-a-node-js-application-on-android-part-1-termux-vim-and-node-js-dfa90c28958f/)

# Useful Things to Know

- Discord has a 2,000 character limit. So make sure your response to the user's prompt is less than that, or write something handy to break up GPT's resonse into smaller chunks and post them in sequence.
- GPT and Discord had several recent breaking updates, so a lot of guides are out of date.
- Discord docs are extraordinarily comprehensive. OpenAi is a bit messy.
- Discord wants your bot to be chatty! By default, you must respond to a user's /command within 3 seconds or Discord ignores the token from your bot and you have to try again.
- SO... Thankfully, there's a way to communicate with user's that your bot is taking some time to do some thinking. Supply `await interaction.deferReply();` as early as possible. It adds a handy "thinking" notification...

![thinking](https://github.com/Grismund/discord-bot/assets/81186833/af5a7829-ce05-4dfb-8467-5c87943788d7)

## Resources
[GPT4 Video Guide](https://www.youtube.com/watch?v=EUlnKW6Yy94)
[Code Capsules Bot + Deploy Guide](https://codecapsules.io/doc/how-to-deploy-a-node-js-discord-bot-to-production-on-code-capsules-in-5-minutes/)
[Discord Dev Portal](https://discord.com/developers/applications)
[Discord.js](https://discord.js.org/)
[Discord.js Guides](https://discordjs.guide/)
[Termux Wiki](https://wiki.termux.com/wiki/Main_Page)
[Step by step guide](https://www.freecodecamp.org/news/building-a-node-js-application-on-android-part-1-termux-vim-and-node-js-dfa90c28958f/)