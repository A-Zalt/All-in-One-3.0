const Discord = require("discord.js")
const l10n = require("../l10n")

module.exports = {
    examples: ["aio.invite"],
    category: "info",
    usage: "aio.invite",
    execute: async (message, lang, bot) => {
        message.channel.send(new Discord.MessageEmbed().setColor(3066993)
        .setTitle(l10n(lang, "invite_title"))
        .addField(l10n(lang, "invite_admin"), `[${l10n(lang, "invite_clickhere")}](https://discord.com/oauth2/authorize?client_id=670682136495390720&permissions=8&scope=bot)`)
        .addField(l10n(lang, "invite_noperm"), `[${l10n(lang, "invite_clickhere")}](https://discord.com/oauth2/authorize?client_id=670682136495390720&permissions=0&scope=bot)`)
        .addField(l10n(lang, "invite_custom"), `[${l10n(lang, "invite_clickhere")}](https://discord.com/oauth2/authorize?client_id=670682136495390720&permissions=2147483647&scope=bot)`)
        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
        .setTimestamp())
    }
}