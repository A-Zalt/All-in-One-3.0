const Discord = require("discord.js")
const l10n = require("../l10n")

module.exports = {
    examples: ["aio.invite"],
    category: "info",
    usage: "aio.invite [bot]",
    execute: async (message, lang, _, args) => {
        let obligatoryEmbed = new Discord.MessageEmbed()
        .setTitle(l10n(lang, "invite_title"))
        .setColor(0xff0000)
        .setDescription(l10n(lang, "membernotfound"))
        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
        .setTimestamp(Date.now())
        let toInvite
        if(!args[0]) toInvite = message.guild.me.user
        else {
            if(!args[0].match(/[^0-9]/g)) {
                m = args[0]
                args.shift()
                toInvite = await message.guild.members.fetch(m, false)
                if(!toInvite) return message.channel.send(
                    obligatoryEmbed
                )
            } else if((args[0].startsWith("<@") || args[0].startsWith("<@!")) && args[0].endsWith(">")) {
                m = args[0]
                args.shift()
                toInvite = await message.guild.members.fetch(m.replace(/<|@|!|>/g, ""), false)
                if(!toInvite) return message.channel.send(
                    obligatoryEmbed
                )
            } else {
                if(args[1] === "-i") {
                    toInvite = (await message.guild.members.fetch(false)).find(mem => mem.user.username.toLowerCase().includes(args[0].toLowerCase()))
                } else if(args[1] === "-e") {
                    toInvite = (await message.guild.members.fetch(false)).find(mem => mem.user.username.toLowerCase() === args[0].toLowerCase())
                } else {
                    toInvite = (await message.guild.members.fetch(false)).find(mem => mem.user.username.toLowerCase().startsWith(args[0].toLowerCase()))
                }
                if(!toInvite) return message.channel.send(
                    obligatoryEmbed
                )
                args.shift()
                if(args[0] === "-i" || args[0] === "-e") args.shift()
            }
            toInvite = toInvite.user
            if(!toInvite.bot) return message.channel.send(
                obligatoryEmbed
                .setDescription(l10n(lang, "invite_notabot").replace(/{tag}/g, toInvite.tag))
            )
        }
        message.channel.send(new Discord.MessageEmbed().setColor(3066993)
        .setTitle(l10n(lang, "invite_title"))
        .addField(l10n(lang, "invite_admin"), `[${l10n(lang, "invite_clickhere")}](https://discord.com/oauth2/authorize?client_id=${toInvite.id}&permissions=8&scope=bot)`)
        .addField(l10n(lang, "invite_noperm"), `[${l10n(lang, "invite_clickhere")}](https://discord.com/oauth2/authorize?client_id=670682136495390720&permissions=0&scope=bot)`)
        .addField(l10n(lang, "invite_custom"), `[${l10n(lang, "invite_clickhere")}](https://discord.com/oauth2/authorize?client_id=670682136495390720&permissions=2147483647&scope=bot)`)
        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
        .setTimestamp())
    }
}