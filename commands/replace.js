const Discord = require("discord.js")
const l10n = require("../l10n")
module.exports = {
    examples: ["aio.replace all hello", "aio.replace first employee", "aio.replace last employee", "aio.replace remove all employee", "aio.replace remove first stop putting employees into examples", "aio.replace remove last rant about unoriginal examples"],
    category: "textformat",
    usage: "aio.replace {selection:all|first|last|remove {all|first|last}} <{toreplace}>",
    execute: async (message, lang, _, args) => {
        if(!args[1] || (args[0].toLowerCase() === "remove" && !args[2])) {
            return message.channel.send(
                new Discord.MessageEmbed()
                .setTitle(l10n(lang, "replace_title"))
                .setColor(0xff0000)
                .setDescription(l10n(lang, "replace_notenoughargs"))
                .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
                .setTimestamp()
            )
        }
        if(!["all", "first", "last", "remove"].includes(args[0].toLowerCase()) || (args[0].toLowerCase() === "remove" && !["all", "first", "last"].includes(args[1]))) {
            return message.channel.send(
                new Discord.MessageEmbed()
                .setTitle(l10n(lang, "replace_title"))
                .setColor(0xff0000)
                .setDescription(l10n(lang, "replace_invalidselection"))
                .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
                .setTimestamp()
            )
        }
        let embed = new Discord.MessageEmbed()
        .setTitle(l10n(lang, "replace_title"))
        .setColor(0x0000ff)
        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
        .setTimestamp()
        let type = 0
        let secondary = 0
        switch(args[0]) {
            case "first":
                type = 1
                break
            case "last":
                type = 2
                break
            case "remove":
                switch(args[1]) {
                    case "first":
                        secondary = 1
                        break
                    case "last":
                        secondary = 2
                        break
                }
                type = 3
                break
        }
        const filter = m => m.author.id === message.author.id
        args.shift()
        if(type === 3) args.shift()
        let toreplace = args.join(" ")
        let replaceto
        if(type !== 3) {
            const collector = message.channel.createMessageCollector(filter, { time: 100000, max: 1 })
            message.channel.send(new Discord.MessageEmbed()
            .setTitle(l10n(lang, "replace_title"))
            .setColor(0x0000ff)
            .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
            .setTimestamp(Date.now())
            .setDescription(l10n(lang, "replace_waitingformessage1"))
            )
            collector.on('collect', m => {
                replaceto = m.content
                const collector3 = message.channel.createMessageCollector(filter, { time: 100000, max: 1 })
                message.channel.send(new Discord.MessageEmbed()
                .setTitle(l10n(lang, "replace_title"))
                .setColor(0x0000ff)
                .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
                .setTimestamp()
                .setDescription(l10n(lang, "replace_waitingformessage2"))
                )
                collector3.on('collect', m2 => {
                    let text = m2.content
                    switch(type) {
                        case 0:
                            text = text.split(toreplace).join(replaceto)
                            break
                        case 1:
                            text = text.replace(toreplace, replaceto)
                            break
                        case 2:
                            n = text.lastIndexOf(toreplace)
                            if (n >= 0 && n + toreplace.length >= text.length) {
                                text = text.substr(0, n) + replaceto
                            }
                    }
                    message.channel.send(embed.setDescription(text))
                })
            })
        } else {
            const collector2 = message.channel.createMessageCollector(filter, { time: 100000, max: 1 })
            message.channel.send(new Discord.MessageEmbed()
            .setTitle(l10n(lang, "replace_title"))
            .setColor(0x0000ff)
            .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
            .setTimestamp()
            .setDescription(l10n(lang, "replace_waitingformessage2"))
            )
            collector2.on('collect', m2 => {
                let text = m2.content
                switch(secondary) {
                    case 0:
                        text = text.split(toreplace).join("")
                        break
                    case 1:
                        text = text.replace(toreplace, "")
                        break
                    case 2:
                        n = text.lastIndexOf(toreplace)
                        if (n >= 0 && n + toreplace.length >= text.length) {
                            text = text.substr(0, n) + ""
                        }
                        break
                }
                message.channel.send(embed.setDescription(text))
            })
        }
    }
}