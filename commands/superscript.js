const Discord = require("discord.js")
const l10n = require("../l10n")

module.exports = {
    examples: ["aio.superscript Hello world"],
    category: "textformat",
    usage: "aio.superscript <{text}>",
    execute: async (message, lang, _, args) => {
        if(!args[0]) {
            return message.channel.send(
                new Discord.MessageEmbed()
                .setTitle(l10n(lang, "superscript_title"))
                .setColor(0xff0000)
                .setDescription(l10n(lang, "invertcase_notext"))
                .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
                .setTimestamp()
            )
        }
        let embed = new Discord.MessageEmbed()
        .setTitle(l10n(lang, "superscript_title"))
        .setColor(0x0000ff)
        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
        .setTimestamp()
        let t = args.join(" ")
        for(i of [["a", "\u1d43"], ["b", "\u1d47"], ["c", "\u1d9c"], ["d", "\u1d48"], ["e", "\u1d49"], ["f", "\u1da0"], ["g", "\u1d4d"], ["h", "\u02b0"], ["i", "\u2071"], ["j", "\u02b2"], ["k", "\u1d4f"], ["l", "\u02e1"], ["m", "\u1d50"], ["n", "\u207f"], ["o", "\u1d52"], ["p", "\u1d56"], ["r", "\u02b3"], ["s", "\u02e2"], ["t", "\u1d57"], ["u", "\u1d58"], ["v", "\u1d5b"], ["w", "\u02b7"], ["x", "\u02e3"], ["y", "\u02b8"], ["z", "\u1dbb"], 
        ["A", "\u1d2c"], ["B", "\u1d2e"], ["D", "\u1d30"], ["E", "\u1d31"], ["G", "\u1d33"], ["H", "\u1d34"], ["I", "\u1d35"], ["J", "\u1d36"], ["K", "\u1d37"], ["L", "\u1d38"], ["M", "\u1d39"], ["N", "\u1d3a"], ["O", "\u1d3c"], ["P", "\u1d3e"], ["R", "\u1d3f"], ["T", "\u1d40"], ["U", "\u1d41"], ["V", "\u2c7d"], ["W", "\u1d42"],
        ["0", "\u2070"], ["1", "\u00b9"], ["2", "\u00b2"], ["3", "\u00b3"], ["4", "\u2074"], ["5", "\u2075"], ["6", "\u2076"], ["7", "\u2077"], ["8", "\u2078"], ["9", "\u2079"],
        ["\\+", "\u207a"], ["-", "\u207b"], ["=", "\u207c"], ["\\(", "\u207d"], ["\\)", "\u207e"], ["\\.", "\u00b7"]]) {
            t = t.replace(new RegExp(i[0], "g"), i[1])
        }
        message.channel.send(embed.setDescription(t))

    }
}