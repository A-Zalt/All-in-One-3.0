const Discord = require("discord.js")
const l10n = require("../l10n")

module.exports = {
    examples: ["aio.purge 45"],
    category: "mod",
    usage: "aio.purge",
    permissions: ["MANAGE_MESSAGES"],
    execute: async (message, lang, _, args) => {
        let errorembed = new Discord.MessageEmbed().setColor(0xff0000)
        .setTitle(l10n(lang, "purge_title"))
        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
        .setTimestamp()
        if(!args[0]) return message.channel.send(
            errorembed
            .setDescription(l10n(lang, "purge_notenoughargs"))
        )
        if(isNaN(args[0]) || Number(args[0]) < 2 || Number(args[0]) > 100) return message.channel.send(
            errorembed
            .setDescription(l10n(lang, "purge_wrongnumber"))
        )
        message.delete()
        message.channel.bulkDelete(Number(args[0]))
        message.channel.send(new Discord.MessageEmbed().setColor(0x0000ff)
        .setTitle(l10n(lang, "purge_title"))
        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
        .setDescription(l10n(lang, "purge_success").replace(/{howmany}/g, args[0])).setTimestamp()
        )
        
    }
}