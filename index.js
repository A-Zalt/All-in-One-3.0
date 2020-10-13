const Discord = require("discord.js")
console.log(`[${new Date()}] Loaded Discord.js`)
const fs = require("fs")
const l10n = require("./l10n")
const reloadEvent = require("./reloadEvent")
const config = JSON.parse(fs.readFileSync("./config.json").toString())
const client = new Discord.Client()
client.options.ws.properties.$browser = "Discord iOS"
let info = {commands: {}, userinfo: JSON.parse(fs.readFileSync("userinfo.json").toString())}

fs.readdirSync("./commands").forEach((c) => {
    if(c.endsWith(".js")) info.commands[c.substr(0, c.length-3)] = require(`./commands/${c}`)
    console.log(`[${new Date()}] Loaded command ${c.substr(0, c.length-3)}`)
})
client.on("ready", () => {
    client.user.setActivity("3.0 Alpha! | aio.help")
    console.log(`[${new Date()}] Logged in!`)
})
reloadEvent.on("reload", async(command) => {
    delete require.cache[`${__dirname}\\commands\\${command}.js`] && delete require.cache[`${__dirname}/commands/${command}.js`]
    console.log(`[${new Date()}] Unloading command ${command}`)
    try {
        info.commands[command] = require(`./commands/${command}.js`)
        console.log(`[${new Date()}] Reloaded command ${command}`)
    } catch(err) {
        console.log(`[${new Date()}] Error while reloading command ${command}`)
        return reloadEvent.emit("error", err)
    }
    reloadEvent.emit("reloaded")
    console.log(`[${new Date()}] Logged in!`)
})
client.on("message", async (message) => {
    let command = message.content.slice(config.prefix.length).split(" ")[0]
    let args = message.content.split(" ")
    args.shift()
    if(message.author.bot) return
    if(!message.content.startsWith(config.prefix)) return
    if(Object.keys(info.commands).includes(command)) {
        info.userinfo = JSON.parse(fs.readFileSync("userinfo.json").toString())
        if(info.commands[command].admin && message.author.id !== "381469857587134465") return
        if(info.commands[command].permissions && Array.isArray(info.commands[command].permissions)) {
            for(let i of info.commands[command].permissions) {
                if(!message.member.hasPermission(i, {checkAdmin: true, checkOwner: true})) return message.channel.send(l10n(info.userinfo.translations[message.author.id] || config.defaultLang, "user_no_perm_error").replace(/{perms}/g, info.commands[command].permissions.join(", ").replace(/_/g, " ")))
                if(!message.guild.me.hasPermission(i, {checkAdmin: true, checkOwner: true})) return message.channel.send(l10n(info.userinfo.translations[message.author.id] || config.defaultLang, "no_perm_error").replace(/{perms}/g, info.commands[command].permissions.join(", ").replace(/_/g, " ")))
            }
        } 
        info.commands[command].execute(message, info.userinfo.translations[message.author.id] || config.defaultLang, 
            client, 
            args).catch((err) => {
            message.channel.send(l10n(info.userinfo.translations[message.author.id] || config.defaultLang, "error"))
            client.users.fetch(config.owner).then(u => u.send(`Command: ${command}
Error: ${err.stack}`))
        })
    }
})

client.login(config.token)
