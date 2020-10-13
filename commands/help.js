const Discord = require("discord.js")
const l10n = require("../l10n")
const fs = require("fs")

module.exports = {
    examples: ["aio.help", "aio.help Info", "aio.help help"],
    category: "info",
    usage: "aio.help",
    execute: async (message, lang, _, args) => {
        let categories = []
        for(let i of fs.readdirSync("./commands")) {
            let command = require(`./${i.substr(0, i.length-3)}`)
            console.log(JSON.parse(fs.readFileSync(`./translations/${lang}.json`).toString()).categories[command.category])
            if(!categories.includes(JSON.parse(fs.readFileSync(`./translations/${lang}.json`).toString()).categories[command.category])) categories.push(
                JSON.parse(fs.readFileSync(`./translations/${lang}.json`).toString()).categories[command.category] || command.category
            )
        }
        console.log(categories)
        let categoriesLower = []
        for(let i of categories) {
            categoriesLower.push(i.toLowerCase())
        }
        let commands = []
        let commandNames = []
        for(let i of fs.readdirSync("./commands")) {
            let command = require(`./${i.substr(0, i.length-3)}`)
            if(!command.admin) {
                commandNames.push(i.substr(0, i.length-3))
                commands.push(command)
            }
        }
        if(!args[0]) {
            message.channel.send(
                new Discord.MessageEmbed()
                .setTitle(l10n(lang, "help_title_main"))
                .setURL(l10n(lang, "help_title_url"))
                .setColor(0x0000ff)
                .setDescription(categories.join(", "))
                .setFooter(l10n(lang, "help_invokedby").replace(/{tag}/g, message.author.tag))
                .setTimestamp()
            )
        } else if(categoriesLower.includes(args.join(" ").toLowerCase())) {
            let commands = []
            console.log(fs.readdirSync("./commands"))
            for(let i of fs.readdirSync("./commands")) {
                let command = require(`./${i.substr(0, i.length-3)}`)
                if((JSON.parse(fs.readFileSync(`./translations/${lang}.json`).toString()).categories[command.category] || command.category).toLowerCase() === args.join(" ").toLowerCase() && !command.admin) commands.push(i.substr(0, i.length-3))
            }
            message.channel.send(
                new Discord.MessageEmbed()
                .setTitle(l10n(lang, "help_title_category").replace(/{category}/g, args.join(" ")))
                .setURL(l10n(lang, "help_title_url"))
                .setColor(0x0000ff)
                .setDescription(commands.join(", "))
                .setFooter(l10n(lang, "help_invokedby").replace(/{tag}/g, message.author.tag))
                .setTimestamp()
            )
        } else if(commandNames.includes(args.join(" "))) {

            message.channel.send(
                new Discord.MessageEmbed()
                .setTitle(l10n(lang, "help_title_command").replace(/{command}/g, args.join(" ")))
                .setURL(l10n(lang, "help_title_url"))
                .setColor(0x0000ff)
                .addField(l10n(lang, "help_command_description"), JSON.parse(fs.readFileSync(`./translations/${lang}.json`).toString()).meta_descriptions[args.join(" ")] || "-")
                .addField(l10n(lang, "help_command_usage"), require(`./${args.join(" ")}`).usage)
                .addField(l10n(lang, "help_command_examples"), require(`./${args.join(" ")}`).examples.join("\n").replace(/{username}/g, message.author.username).replace(/{id}/g, message.author.id))
                .addField(l10n(lang, "help_command_category"), (JSON.parse(fs.readFileSync(`./translations/${lang}.json`).toString()).categories[require(`./${args.join(" ")}`).category]) || require(`./${args.join(" ")}`).category)
                .setFooter(l10n(lang, "help_invokedby").replace(/{tag}/g, message.author.tag))
                .setTimestamp()
            )
        } else {
            message.channel.send(
                new Discord.MessageEmbed()
                .setTitle(l10n(lang, "help_notfound_title"))
                .setURL(l10n(lang, "help_title_url"))
                .setDescription(l10n(lang, "help_notfound_description"))
                .setColor(0xff0000)
                .setFooter(l10n(lang, "help_invokedby").replace(/{tag}/g, message.author.tag))
                .setTimestamp()
            )
        }
    }
}