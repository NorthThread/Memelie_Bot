const { Client, Intents } = require('discord.js');
const {token} = require('./config.json')
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
    else if(interaction.commandName === 'live'){
        await interaction.reply({content: "Hello @everyone... I'm streaming on twitch right now. Feel free to join [here](https://www.twitch.tv/memelie)"});
    }
});

client.login(token);