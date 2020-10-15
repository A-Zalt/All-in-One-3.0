const Discord = require("discord.js")
const l10n = require("../l10n")

module.exports = {
    examples: ["aio.serverinfo"],
    category: "util",
    usage: "aio.serverinfo",
    execute: async (message, lang) => {
        let rglist = l10n(lang, "regions")
        let online = 0
        let idle = 0
        let dnd = 0
        let offline = 0
        let members
        if(message.guild.members.cache.size !== message.guild.memberCount) { // if not all members are fetched
            message.guild.members.fetch().then(f => {
                members = f.cache
            })
        } else members = message.guild.members.cache
        members.forEach(m => {
            switch(m.user.presence.status) {
                case "online":
                    online++
                    break
                case "idle":
                    idle++
                    break
                case "dnd":
                    dnd++
                    break
                case "offline":
                    offline++
                    break
            }
        })
        message.channel.send(new Discord.MessageEmbed().setColor(0x0000ff)
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setTitle(l10n(lang, "serverinfo_title"))
        .addField(l10n(lang, "serverinfo_id"), message.guild.id, true)
        .addField(l10n(lang, "serverinfo_icon_url"), message.guild.iconURL({format: "png", size: 1024}) || l10n(lang, "serverinfo_noicon"), true)
        .addField(l10n(lang, "serverinfo_splash_url"), message.guild.splashURL({format: "png", size: 1024}) || l10n(lang, "serverinfo_nosplash"), true)
        .addField(l10n(lang, "serverinfo_region"), rglist[message.guild.region], true)
        .addField(l10n(lang, "serverinfo_owner"), message.guild.owner.user.toString(), true)
        .addField(l10n(lang, "serverinfo_membercount"), l10n(lang, "serverinfo_members")
        .replace(/{total}/g, message.guild.memberCount).replace(/{online}/g, online).replace(/{idle}/g, idle)
        .replace(/{dnd}/g, dnd).replace(/{offline}/g, offline), true)
        .addField(l10n(lang, "serverinfo_afkchannel"), message.guild.afkChannel ? message.guild.afkChannel.name : l10n(lang, "none"), true)
        .addField(l10n(lang, "serverinfo_afktimeout"), message.guild.afkTimeout, true)
        .addField(l10n(lang, "serverinfo_channelcount"), message.guild.channels.cache.size, true)
        .addField(l10n(lang, "serverinfo_emojicount"), message.guild.emojis.cache.size, true)
        .addField(l10n(lang, "serverinfo_rolecount"), message.guild.roles.cache.size, true)
        .addField(l10n(lang, "serverinfo_createdat"), message.guild.createdAt, true)
        .addField(l10n(lang, "serverinfo_defaultmsgnotif"), message.guild.defaultMessageNotifications === "ALL" ? l10n(lang, "serverinfo_notifall") : l10n(lang, "serverinfo_notifmentions"), true)
        .addField(l10n(lang, "serverinfo_explicitcntfilter"), message.guild.explicitContentFilter === "DISABLED" ? l10n(lang, "serverinfo_filteroff") : message.guild.explicitContentFilter === "MEMBERS_WITHOUT_ROLES" ? l10n(lang, "serverinfo_filterrole") : l10n(lang, "serverinfo_filterall"), true)
        .addField(l10n(lang, "serverinfo_features"), message.guild.features[0] ? message.guild.features.join(", ").replace(/_/g, " ").toLowerCase() : l10n(lang, "serverinfo_nofeatures"), true)
        .addField(l10n(lang, "serverinfo_mfalevel"), l10n(lang, "mfalevels")[message.guild.mfaLevel], true)
        .addField(l10n(lang, "serverinfo_premiumtier"), l10n(lang, "premiumtiers")[message.guild.premiumTier], true)
        .addField(l10n(lang, "serverinfo_publicupdateschannel"), message.guild.publicUpdatesChannel ? message.guild.publicUpdatesChannel.toString() : l10n(lang, "none"), true)
        .addField(l10n(lang, "serverinfo_ruleschannel"), message.guild.rulesChannel ? message.guild.rulesChannel.toString() : l10n(lang, "none"), true)
        .addField(l10n(lang, "serverinfo_systemchannel"), message.guild.systemChannel ? message.guild.systemChannel.toString() : l10n(lang, "none"), true)
        .addField(l10n(lang, "serverinfo_vanityurlcode"), message.guild.vanityURLCode || l10n(lang, "none"), true)
        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
        .setTimestamp())
    }
}