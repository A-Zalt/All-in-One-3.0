const Discord = require("discord.js")
const l10n = require("../l10n")
const fs = require("fs")
const userinfo = require("../userinfo.json")

module.exports = {
    examples: ["aio.lang en_US", "aio.lang ru_RU"],
    category: "custom",
    usage: "aio.lang {lang}",
    execute: async (message, lang, _, args) => {
        let errorembed = new Discord.MessageEmbed().setColor(0xff0000)
        .setTitle(l10n(lang, "lang_title"))
        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
        .setTimestamp()
        if(!args[0]) return message.channel.send(
            errorembed
            .setDescription(l10n(lang, "lang_notenoughargs"))
        )
        let langs = []
        fs.readdirSync("./translations").forEach(l => {
            if(l.endsWith(".json")) langs.push(l.substr(0, l.length-5))
        })
        if(!langs.includes(args[0])) return message.channel.send(
            errorembed
            .setDescription(l10n(lang, "lang_nosuchlang"))
        )
        userinfo.translations[message.author.id] = args[0]
        fs.writeFileSync("userinfo.json", JSON.stringify(userinfo))
        lang = args[0]
        message.channel.send(
            new Discord.MessageEmbed().setColor(0x0000ff)
        .setTitle(l10n(lang, "lang_title"))
        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
        .setTimestamp()
        .setDescription(l10n(lang, "lang_success").replace(/{lang}/g, l10n(lang, "language")).replace(/{author}/g, l10n(lang, "author")))
        )
    }
}