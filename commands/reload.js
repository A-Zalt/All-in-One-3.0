const reloadEvent = require("../reloadEvent")

module.exports = {
    examples: ["aio.reload reload"],
    category: "util",
    usage: "aio.reload {command}",
    admin: true,
    execute: async (message, lang, bot, args) => {
        message.channel.send(`Reloading ${args[0]}...`)
        reloadEvent.emit("reload", args[0])
        reloadEvent.once("reloaded", () => {
            message.channel.send("Reloaded!")
        })
        reloadEvent.once("error", (err) => {
            message.channel.send(`Error: \`\`\`js${err.stack}\`\`\``)
        })
    }
}