const Discord = require("discord.js")
const l10n = require("../l10n")
const request = require("request")

module.exports = {
    examples: ['aio.code js console.log("Hello world");', 'aio.code c ```c\n#include <stdio.h>\nint main() {\n\tprintf("Hello world");\n\treturn 0;\n}'],
    category: "util",
    usage: "code {lang:c|cpp|objective-c|java|kotlin|scala|swift|csharp|go|haskell|erlang|perl|python|python3|ruby|php|bash|r|javascript|js|coffeescript|vb|cobol|fsharp|d|clojure|elixir|mysql|rust|scheme|commonlisp|plain} <{code}>",
    execute: async (message, lang, _, args) => {
        if(!args[1]) {
            return message.channel.send(
                new Discord.MessageEmbed()
                .setTitle(l10n(lang, "code_title"))
                .setColor(0xff0000)
                .setDescription(l10n(lang, "code_notenoughargs"))
                .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
                .setTimestamp()
            )
        }
        let language = args[0]
        if(!["js", "py3", "py", "c", "cpp", "objective-c", "java", "kotlin", "scala", "swift", "csharp", "go", "haskell", "erlang", "perl", "python", "python3", "ruby", "php", "bash", "r", "javascript", "coffeescript", "vb", "cobol", "fsharp", "d", "clojure", "elixir", "mysql", "rust", "scheme", "commonlisp", "plain", "rb"].includes(language)) return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle(l10n(lang, "code_title"))
                .setColor(0xff0000)
                .setDescription(l10n(lang, "code_invalidlang"))
                .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
                .setTimestamp()
        )
        args.shift()
        switch(language) {
            case "js":
                language = "javascript"
                break
            case "py":
                language = "python"
                break
            case "py3":
                language = "python3"
                break
            case "rb":
                language = "ruby"
                break
        }
        let code = args.join(" ")
        if(code.startsWith("```")) {
            code = code.split("\n")
            code.shift()
            code.pop()
            code = code.join("\n")
        }
        let msg = await message.channel.send(
            new Discord.MessageEmbed()
                .setTitle(l10n(lang, "code_title"))
                .setColor(0x0000ff)
                .setDescription(l10n(lang, "code_exec1"))
                .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
                .setTimestamp()
        )
        request.post(`http://api.paiza.io:80/runners/create?source_code=${encodeURIComponent(code)}&language=${language}&longpoll=true&longpoll_timeout=30&api_key=guest`, (err, resp, body) => {
            let sessionID = JSON.parse(body.toString())['id'];
            console.log(JSON.parse(body.toString()))
            if(err) return message.channel.send(
                new Discord.MessageEmbed()
                .setTitle(l10n(lang, "code_title"))
                .setColor(0xff0000)
                .setDescription(l10n(lang, "api_error"))
                .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
                .setTimestamp()
            )
            msg.edit(
                new Discord.MessageEmbed()
                .setTitle(l10n(lang, "code_title"))
                .setColor(0x0000ff)
                .setDescription(l10n(lang, "code_exec2"))
                .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
                .setTimestamp()
            )
            request.get(`http://api.paiza.io:80/runners/get_details?id=${sessionID}&api_key=guest`, (err, resp, data) => {
                if(err) {console.log(err); return message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle(l10n(lang, "code_title"))
                    .setColor(0xff0000)
                    .setDescription(l10n(lang, "api_error"))
                    .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
                    .setTimestamp()
                )}   
                data = JSON.parse(data.toString())
                console.log(data)
                let out = data.stdout || data.stderr || data.build_stdout || data.build_stderr || l10n(lang, "code_nooutput")
                msg.edit(
                    new Discord.MessageEmbed()
                        .setTitle(`${l10n(lang, "code_title")} | ${l10n(lang, "code_note")}`)
                        .setColor(0x0000ff)
                        .setDescription(l10n(lang, "code_execres").replace(/{out}/g, out.replace(/`/gi, "\u200b`\u200b").slice(0, 2048-7)))
                        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
                        .setTimestamp()
                )
                message.channel.send(new Discord.MessageEmbed()
                .setTitle(l10n(lang, "code_title"))
                .setColor(0x0000ff)
                .setDescription(l10n(lang, "code_exit").replace(/{exitcode}/g, data.exit_code || data.build_exit_code).replace(/{time}/g, data.time || data.build_time))
                .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
                .setTimestamp())
            })
        })

    }
}