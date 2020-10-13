const Discord = require("discord.js")
const l10n = require("../l10n")

module.exports = {
    examples: ["aio.superscript Hello world"],
    category: "textformat",
    usage: "aio.upsidedown <{text}>",
    execute: async (message, lang, _, args) => {
        if(!args[0]) {
            return message.channel.send(
                new Discord.MessageEmbed()
                .setTitle(l10n(lang, "upsidedown_title"))
                .setColor(0xff0000)
                .setDescription(l10n(lang, "invertcase_notext"))
                .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
                .setTimestamp()
            )
        }
        let embed = new Discord.MessageEmbed()
        .setTitle(l10n(lang, "upsidedown_title"))
        .setColor(0x0000ff)
        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
        .setTimestamp()
        let t = args.join(" ").split("").reverse().join("")
        for(let i of [["a", "\u0250"], ["b", "q"], ["c", "\u0254"], ["d", "p"], ["e", "\u01dd"], ["f", "\u025f"], ["g", "\u1d77"], ["h", "\u0265"], ["i", "\u1d09"], ["j", "\u027e\u0e32"], ["k", "\u029e"], ["l", "\ua781"], ["m", "\u026f"], ["n", "u"], ["p", "d"], ["q", "b"], ["r", "\u0279"], ["t", "\u0287"], ["u", "n"], ["v", "\u028c"], ["w", "\u028d"], ["y", "\u028e"],
        ["A", "\u2c6f"], ["B", "q"], ["C", "\u0186"], ["D", "p"], ["E", "Ǝ"], ["F", "\u2132"], ["G", "\u2141"], ["J", "ſ"], ["K", "\ua7b0"], ["L", "\ua780"], ["M", "W"], ["P", "d"], ["R", "\u1d1a"], ["T", "\ua7b1"], ["U", "∩"], ["V", "\u0245"], ["W", "M"], ["Y", "⅄"],
        ["1", "Ɩ"], ["2", "ᄅ"], ["3", "Ɛ"], ["4", "ㄣ"], ["5", "ϛ"], ["6", "9"], ["7", "ㄥ"], ["9", "6"],
        [",", "\u02bb"], ["!", "i"], ["&", "\u214b"], ["\\)", "("], ["\\(", ")"], [";", "\u2e35"]]) {
            t = t.replace(new RegExp(i[0], "g"), i[1])
            console.log(t)
        }
        message.channel.send(embed.setDescription(t))

    }
}