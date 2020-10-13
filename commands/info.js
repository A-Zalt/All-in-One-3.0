const Discord = require("discord.js")
const l10n = require("../l10n")
const fs = require("fs")
const os = require("os")

module.exports = {
    examples: ["aio.info"],
    category: "info",
    usage: "aio.info",
    execute: async (message, lang, bot) => {
        message.channel.send(
            new Discord.MessageEmbed()
            .setTitle(l10n(lang, "info_title"))
            .setColor(0x0000ff)
            .addFields([
                {"name": l10n(lang, "info_lib_title"), "value": l10n(lang, "info_lib")},
                {"name": l10n(lang, "info_mem_usage_title"), "value": l10n(lang, "info_mem_usage").replace(/{used}/g, Math.round(process.memoryUsage().rss/1000/1000)).replace(/{total}/g, Math.round(os.totalmem()/1000/1000))},
                {"name": l10n(lang, "info_guilds_title"), "value": bot.guilds.cache.size},
                {"name": l10n(lang, "info_users_title"), "value": bot.users.cache.size},
                {"name": l10n(lang, "info_channels_title"), "value": bot.channels.cache.size},
                {"name": l10n(lang, "info_github_repo_title"), "value": "https://github.com/A-Zalt/All-in-One-3.0/"},
            ])
            .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
            .setTimestamp()
        )
    }
}
