const Discord = require("discord.js")
const l10n = require("../l10n")

module.exports = {
    examples: ["aio.ban \"cool super pro 666\"", "aio.ban {username}", "aio.ban {id} 5 toxic", "aio.ban _Za -i 0 toxic"],
    category: "mod",
    usage: "aio.ban {user} [days of messages to delete] <reason>",
    permissions: ["BAN_MEMBERS"],
    execute: async (message, lang, bot, args) => {
        let errorembed = new Discord.MessageEmbed()
        .setTitle(l10n(lang, "ban_title"))
        .setColor(0xff0000)
        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
        .setTimestamp()
        if(!args[0]) {
            return message.channel.send(
                errorembed
                .setDescription(l10n(lang, "kick_notenoughargs"))
            )
        }
        let m 
        if(args[0].startsWith('"')) {
            let args2 = args.join(" ").split('"')
            if(!args2[1]) {
                return message.channel.send(
                    errorembed
                    .setDescription(l10n(lang, "kick_unterminatedquotation"))
                )
            }
            args[0] = args2[0] + args2[1]
            m = args[0]
            for(i=0;i<m.split(" ").length;i++) {
                args.shift()
            }
            args[0] = m
        }
        let toBan
        if(!args[0].match(/[^0-9]/g)) {
            m = args[0]
            args.shift()
            toBan = await message.guild.members.fetch(m, false)
            if(!toBan) return message.channel.send(
                errorembed
                .setDescription(l10n(lang, "membernotfound"))
            )
        } else if((args[0].startsWith("<@") || args[0].startsWith("<@!")) && args[0].endsWith(">")) {
            m = args[0]
            args.shift()
            toBan = await message.guild.members.fetch(m.replace(/<|@|!|>/g, ""), false)
            if(!toBan) return message.channel.send(
                errorembed.setDescription(l10n(lang, "membernotfound"))
            )
        } else {
            console.log(args)
            if(args[1] === "-i") {
                toBan = (await message.guild.members.fetch()).find(mem => mem.user.username.toLowerCase().includes(args[0].toLowerCase()))
            } else if(args[1] === "-e") {
                toBan = (await message.guild.members.fetch()).find(mem => mem.user.username.toLowerCase() === args[0].toLowerCase())
            } else {
                toBan = (await message.guild.members.fetch()).find(mem => mem.user.username.toLowerCase().startsWith(args[0].toLowerCase()))
            }
            if(!toBan) return message.channel.send(
                errorembed.setDescription(l10n(lang, "membernotfound"))
            )
            args.shift()
            if(args[0] === "-i" || args[0] === "-e") args.shift()
        }
        if(toBan.roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID !== message.author.id) return message.channel.send(
            errorembed.setDescription(l10n(lang, "userhighestroleerror"))
        )
        if(!toBan.bannable) return message.channel.send(
            new Discord.MessageEmbed()
            .setTitle(l10n(lang, "ban_title"))
            .setColor(0xff0000)
            .setDescription(l10n(lang, "highestroleerror"))
            .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
            .setTimestamp()
        )
        let days = isNaN(args[0]) || Number(args[0]) > 7 || Number(args[0]) < 0 ? 1 : Number(args[0])
        if(!isNaN(args[0])) args.shift()
        let reason = args[0] ? args.join(" ") : ""
        toBan.ban({days, reason})
        message.channel.send(
            new Discord.MessageEmbed()
            .setTitle(l10n(lang, "ban_success").replace(/{member}/g, toBan.user.tag))
            .setColor(0x0000ff)
            .setDescription(l10n(lang, "kick_reason").replace(/{reason}/g, args[0] ? args.join(" ") : "-"))
            .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
            .setTimestamp()
        )
    }
}