const { Client, Intents, MessageEmbed } = require("discord.js");
const { token } = require("./config.json");
const fetch = require("node-fetch");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

var hasAnnounced = false;

const checkOnline = async () => {
  setInterval(() => {
    ping();
  }, 60000);
};
const ping = async () => {
  let live = await fetch(`https://www.twitch.tv/memelie`);
  let text = await live.text();
  if (text.includes("isLiveBroadcast") && hasAnnounced === false) {
    console.log("if live");
    client.channels.cache
      .get("698980600001855550")
      .send({ content: "everyone", embeds: [twitchEmbed] });
    hasAnnounced = true;
    console.log("cache");
  } else if (!text.includes("isLiveBroadcast")) {
    hasAnnounced = false;
    console.log("false");
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
  }
  //{content: "Hello @everyone... I'm streaming on twitch right now. Feel free to join https://www.twitch.tv/memelie"}
});

client.login(token);
