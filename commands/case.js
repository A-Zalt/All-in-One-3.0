const Discord = require("discord.js")
const l10n = require("../l10n")
const lodash = require("lodash")

module.exports = {
    examples: ["aio.case lower everything", "aio.case capitalize all turkey"],
    category: "textformat",
    usage: "aio.case {case:lower|upper|capitalize} <{selection}>",
    execute: async (message, lang, _, args) => {
        let errorembed = new Discord.MessageEmbed()
        .setTitle(l10n(lang, "case_title"))
        .setColor(0xff0000)
        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
        .setTimestamp()
        if(!args[1]) {
            return message.channel.send(
                errorembed
                .setDescription(l10n(lang, "case_notenoughargs"))
            )
        }
        if(!["lower", "upper", "capitalize"].includes(args[0].toLowerCase())) {
            return message.channel.send(
                errorembed
                .setDescription(l10n(lang, "case_invalidcase"))
            )
        }
        if(!["everything", "all", "after", "before"].includes(args[1].toLowerCase())) {
            return message.channel.send(
                errorembed
                .setDescription(l10n(lang, "case_invalidselection"))
            )
        }
        if(["all", "after", "before"].includes(args[1].toLowerCase()) && !args[1]) {
            return message.channel.send(
                errorembed
                .setDescription(l10n(lang, "case_notextselection"))
            )
        }
        let embed = new Discord.MessageEmbed()
        .setTitle(l10n(lang, "case_title"))
        .setColor(0x0000ff)
        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
        .setTimestamp()
        let type = 0
        switch(args[1]) {
            case "all":
                type = 1
                break
            case "after":
                type = 2
                break
            case "before":
                type = 3
                break
            // case "not":
            //     type = 4
            //     break
        }
        
        let Case 
        switch(args[0].toLowerCase()) {
            case "lower":
                Case = 0
                break
            case "upper":
                Case = 1
                break
            case "capitalize":
                Case = 2
                break
        }
        const filter = m => m.author.id === message.author.id
        const collector = message.channel.createMessageCollector(filter, { time: 100000, max: 1 });
        message.channel.send(new Discord.MessageEmbed()
        .setTitle(l10n(lang, "case_title"))
        .setColor(0x0000ff)
        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
        .setTimestamp()
        .setDescription(l10n(lang, "case_waitingformessage"))
        )
        function capitalize(text) {
            let txt = []
            for(i of text.split(" ")) {
                txt.push(i[0].toUpperCase())
                txt[txt.length-1] += i.substr(1, i.length).toLowerCase()
            }
            return txt.join(" ")
        }
        // function invert(text) {
        //     let txt = text
        //     for(i=0;i<text.length;i++) {
        //         j = text[i]
        //         if(j.toLowerCase() === j) txt[i] = j.toUpperCase()
        //         else txt[i] = j.toLowerCase()
        //     }
        //     return txt
        // }
        args.shift()
        args.shift()
        collector.on('collect', m => {
            let text = m.content
            switch(type) {
                case 0:
                    Case === 0 ? text = text.toLowerCase() : Case === 1 ? text = text.toUpperCase() : text = capitalize(text)
                    break
                case 1:
                    text = text.replace(new RegExp(lodash.escapeRegExp(args.join(" ")), "g"), Case === 0 ? args.join(" ").toLowerCase() : Case === 1 ? args.join(" ").toUpperCase() : capitalize(args.join(" ")))
                    break
                case 2:
                    console.log(lodash.escapeRegExp(args.join(" ")))
                    console.log(text)
                    text = text.replace(new RegExp(`(${lodash.escapeRegExp(args.join(" "))}).+$`), (Case === 0 ? text.toLowerCase() : Case === 1 ? text.toUpperCase() : capitalize(text)).substr(text.toLowerCase().indexOf(args.join(" ").toLowerCase()), text.length))
                    console.log(text)
                    break
                case 3:
                    console.log(lodash.escapeRegExp(args.join(" ")))
                    console.log(text)
                    text = text.replace(new RegExp(`^.+(${lodash.escapeRegExp(args.join(" "))})`), (Case === 0 ? text.toLowerCase() : Case === 1 ? text.toUpperCase() : capitalize(text)).substr(0, text.toLowerCase().indexOf(args.join(" ").toLowerCase())+args.join(" ").length))
                    console.log(text)
                    break
                // case 4:
                //     text = (Case === 0 ? text.toLowerCase().replace() : Case === 1 ? text.toUpperCase() : capitalize(text))
                //     break
                
            }
            message.channel.send(embed.setDescription(text))
        });

    }
}