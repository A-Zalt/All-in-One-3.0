const Discord = require("discord.js")
const l10n = require("../l10n")
const request = require("request")

module.exports = {
    examples: ['aio.calc 2+5', 'aio.calc sin(90)'],
    category: "util",
    usage: "calc <{mathexpr}>",
    execute: async (message, lang, _, args) => {
        if(!args[0]) {
            return message.channel.send(
                new Discord.MessageEmbed()
                .setTitle(l10n(lang, "calc_title"))
                .setColor(0xff0000)
                .setDescription(l10n(lang, "calc_notenoughargs"))
                .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
                .setTimestamp()
            )
        }
        try {
            let expr = require("mathjs").evaluate(args.join(" "))
            message.channel.send(new Discord.MessageEmbed()
            .setTitle(l10n(lang, "calc_title"))
            .setColor(0x0000ff)
            .setDescription(expr)
            .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
            .setTimestamp())
        } catch(e) {
            message.channel.send(new Discord.MessageEmbed()
            .setTitle(l10n(lang, "calc_error"))
            .setColor(0xff0000)
            .setDescription(e)
            .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
            .setTimestamp())
        }

    }
}