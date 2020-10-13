const Discord = require("discord.js")
const l10n = require("../l10n")

module.exports = {
    examples: ["aio.random number 1 100", "aio.random coin"],
    category: "util",
    usage: "aio.random {randomtype} [additional]",
    execute: async (message, lang, _, args) => {
        errorembed = new Discord.MessageEmbed()
        .setTitle(l10n(lang, "random_title"))
        .setColor(0xff0000)
        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
            .setTimestamp()
        if(!args[0] || !args[1] && !["coin", "member", "channel"].includes(args[0].toLowerCase())) {
            return message.channel.send(
                errorembed
                .setDescription(l10n(lang, "random_notenoughargs"))
            )
        }
        if(!["coin", "choose", "number", "member", "channel"].includes(args[0].toLowerCase())) {
            return message.channel.send(
                errorembed
                .setDescription(l10n(lang, "random_invalidtype"))
            )
        }
        let embed = new Discord.MessageEmbed()
        .setTitle(l10n(lang, "random_title"))
        .setColor(0x0000ff)
        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
        .setTimestamp()
        switch(args[0].toLowerCase()) {
            case "coin":
                message.channel.send(embed.setDescription(l10n(lang, "random_choosecoin").replace(/{flip}/g, Math.floor(Math.random()*2)+1 === 1 ? l10n(lang, "random_heads") : l10n(lang, "random_choosecoin"))))
                break
            case "choose":
                if(!args[2]) {
                    return message.channel.send(
                        errorembed
                        .setDescription(l10n(lang, "random_notenoughargs"))
                    )
                }
                args.shift()
                message.channel.send(embed.setDescription(l10n(lang, "random_choosecustom").replace(/{sel}/g, args[Math.floor(Math.random()*args.length)])))
                break
            case "number":
                if(!args[2]) {
                    return message.channel.send(
                        errorembed
                        .setDescription(l10n(lang, "random_notenoughargs"))
                    )
                }
                if(isNaN(Number(args[1])) || isNaN(Number(args[2])) || Number(args[1]) >= Number(args[2])) {
                    return message.channel.send(
                        errorembed
                        .setDescription(l10n(lang, "random_invalidargsnumber"))
                    )
                }
                message.channel.send(embed.setDescription(l10n(lang, "random_choosenumber").replace(/{min}/g, args[1]).replace(/{max}/g, args[1]).replace(/{rand}/g, Math.round(Math.random()*Number(args[2])+Number(args[1])-1))))
                break
            case "member":
                message.channel.send(embed.setDescription(l10n(lang, "random_choosemember").replace(/{member}/g, message.guild.members.cache.random().user.tag)))
                break
            case "channel":
                message.channel.send(embed.setDescription(l10n(lang, "random_choosechannel").replace(/{channel}/g, message.guild.channels.cache.random().name)))
                break
        }
        

    }
}