const Discord = require("discord.js")
const l10n = require("../l10n")

module.exports = {
    examples: ["aio.invertcase hELLO WORLD"],
    category: "textformat",
    usage: "aio.invertcase <{text}>",
    execute: async (message, lang, _, args) => {
        if(!args[0]) {
            return message.channel.send(
                new Discord.MessageEmbed()
                .setTitle(l10n(lang, "invertcase_title"))
                .setColor(0xff0000)
                .setDescription(l10n(lang, "invertcase_notext"))
                .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
                .setTimestamp()
            )
        }
        let embed = new Discord.MessageEmbed()
        .setTitle(l10n(lang, "invertcase_title"))
        .setColor(0x0000ff)
        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
        .setTimestamp()
        function invert(text) {
            let txt = ""
            for(i=0;i<text.length;i++) {
                console.log(text[i], i)
                j = text[i]
                if(j.toLowerCase() === j) j = j.toUpperCase()
                else j = j.toLowerCase()
                txt += j
            }
            return txt
        }
        message.channel.send(embed.setDescription(invert(args.join(" "))))

    }
}