const Discord = require("discord.js")
const l10n = require("../l10n")

module.exports = {
    examples: ["aio.ping"],
    category: "info",
    usage: "aio.ping",
    execute: async (message, lang, bot) => {
        message.channel.send(new Discord.MessageEmbed().setColor(3066993)
        .setTitle(l10n(lang, "ping_title"))
        .setDescription(l10n(lang, "ping_description").replace(/{latency}/, bot.ws.ping))
        .setFooter(l10n(lang, "pinged_by").replace(/{tag}/g, message.author.tag))
        .setTimestamp())
    }
}