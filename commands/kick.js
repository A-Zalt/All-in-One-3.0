const Discord = require("discord.js")
const l10n = require("../l10n")

module.exports = {
    examples: ["aio.kick \"cool super pro 666\"", "aio.kick {username}", "aio.kick {id} toxic", "aio.kick _Za -i toxic"],
    category: "mod",
    usage: "aio.kick {user} <reason>",
    permissions: ["KICK_MEMBERS"],
    execute: async (message, lang, bot, args) => {
        if(!args[0]) {
            return message.channel.send(
                new Discord.MessageEmbed()
                .setTitle(l10n(lang, "kick_title"))
                .setColor(0xff0000)
                .setDescription(l10n(lang, "kick_notenoughargs"))
                .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
                .setTimestamp(Date.now())
            )
        }
        let m 
        if(args[0].startsWith('"')) {
            let args2 = args.join(" ").split('"')
            if(!args2[1]) {
                return message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle(l10n(lang, "kick_title"))
                    .setColor(0xff0000)
                    .setDescription(l10n(lang, "kick_unterminatedquotation"))
                    .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
                    .setTimestamp(Date.now())
                )
            }
            args[0] = args2[0] + args2[1]
            m = args[0]
            for(i=0;i<m.split(" ").length;i++) {
                args.shift()
            }
            args[0] = m
        }
        let toKick
        if(!args[0].match(/[^0-9]/g)) {
            m = args[0]
            args.shift()
            toKick = await message.guild.members.fetch(m, false)
            if(!toKick) return message.channel.send(
                new Discord.MessageEmbed()
                .setTitle(l10n(lang, "kick_title"))
                .setColor(0xff0000)
                .setDescription(l10n(lang, "membernotfound"))
                .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
                .setTimestamp(Date.now())
            )
        } else if((args[0].startsWith("<@") || args[0].startsWith("<@!")) && args[0].endsWith(">")) {
            m = args[0]
            args.shift()
            toKick = await message.guild.members.fetch(m.replace(/<|@|!|>/g, ""), false)
            if(!toKick) return message.channel.send(
                new Discord.MessageEmbed()
                .setTitle(l10n(lang, "kick_title"))
                .setColor(0xff0000)
                .setDescription(l10n(lang, "membernotfound"))
                .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
                .setTimestamp(Date.now())
            )
        } else {
            if(args[1] === "-i") {
                toKick = (await message.guild.members.fetch(false)).find(mem => mem.user.username.toLowerCase().includes(args[0].toLowerCase()))
            } else if(args[1] === "-e") {
                toKick = (await message.guild.members.fetch(false)).find(mem => mem.user.username.toLowerCase() === args[0].toLowerCase())
            } else {
                toKick = (await message.guild.members.fetch(false)).find(mem => mem.user.username.toLowerCase().startsWith(args[0].toLowerCase()))
            }
            if(!toKick) return message.channel.send(
                new Discord.MessageEmbed()
                .setTitle(l10n(lang, "kick_title"))
                .setColor(0xff0000)
                .setDescription(l10n(lang, "membernotfound"))
                .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
                .setTimestamp(Date.now())
            )
            args.shift()
            if(args[0] === "-i" || args[0] === "-e") args.shift()
        }
        if(toKick.roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID !== message.author.id) return message.channel.send(
            new Discord.MessageEmbed()
            .setTitle(l10n(lang, "kick_title"))
            .setColor(0xff0000)
            .setDescription(l10n(lang, "userhighestroleerror"))
            .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
            .setTimestamp(Date.now())
        )
        if(!toKick.kickable) return message.channel.send(
            new Discord.MessageEmbed()
            .setTitle(l10n(lang, "kick_title"))
            .setColor(0xff0000)
            .setDescription(l10n(lang, "highestroleerror"))
            .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
            .setTimestamp(Date.now())
        )
        toKick.kick(args[0] ? args.join(" ") : "")
        message.channel.send(
            new Discord.MessageEmbed()
            .setTitle(l10n(lang, "kick_success").replace(/{member}/g, toKick.user.tag))
            .setColor(0x0000ff)
            .setDescription(l10n(lang, "kick_reason").replace(/{reason}/g, args[0] ? args.join(" ") : "-"))
            .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
            .setTimestamp(Date.now())
        )
    }
}
