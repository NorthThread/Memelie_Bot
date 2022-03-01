const { Client, Intents, MessageEmbed } = require("discord.js");
const { token } = require("./config.json");
const fetch = require("node-fetch");
const io = require("socket.io-client");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const socket = io({
  autoConnect: true,
  value: "https://www.twitch.tv/shylily",
});
const hasAnnounced = false;


function getOnline(){
    return new Promise(something =>{
        setTimeout(() =>{
            something =  fetch(`https://www.twitch.tv/shylily`);
        },60000)
    })

}

const checkOnline = () => {
  while (true) {
   
      const live = await getOnline();
      console.log("fetch");
      if ((await live.text()).includes("isLiveBroadcast") && hasAnnounced === false) {
          console.log("if live");
        client.channels.cache
          .get("698980600001855550")
          .send({ content: "@everyone", embeds: [twitchEmbed] });
          console.log("cache");
        hasAnnounced = true;
      } else {
        hasAnnounced = false;
        console.log("false");
      }
    }
    
  
  
};

const twitchEmbed = new MessageEmbed()
  .setTitle("Twitch Notification")
  .setDescription(
    `Hello people... I'm streaming on twitch right now. Feel free to join!`
  )
  .addFields({
    name: "Link",
    value: "[Click Here!](https://www.twitch.tv/memelie)",
  });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  checkOnline();
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (interaction.commandName === "live") {
    await interaction.channel
      .send({ content: "@everyone", embeds: [twitchEmbed] })
      .then(interaction.reply({ content: "Done!", ephemeral: true }));
  } else if (interaction.commandName === "check") {
    let live = await fetch(`https://www.twitch.tv/shylily`);
    if ((await live.text()).includes("isLiveBroadcast")) {
      await interaction.reply("Memelie is live!");
    } else {
      await interaction.reply("Memelie isn't live!");
    }
  }
  //{content: "Hello @everyone... I'm streaming on twitch right now. Feel free to join https://www.twitch.tv/memelie"}
});

client.login(token);
