const lodash = require("lodash")
module.exports = {
    examples: ["aio.eval"],
    category: "util",
    usage: "aio.eval",
    admin: true,
    execute: async (message, _, bot, args) => {
        try {
            message.channel.send(require("util").inspect(await eval(args.join(' ').replace("```", "")), true, 0).substr(0, 2000).replace(new RegExp(lodash.escapeRegExp(bot.token)), "[token omitted]").replace(new RegExp(lodash.escapeRegExp(`[${bot.token.split("").join(", ")}]`)), "[token omitted]"))
        } catch(err) {
            message.channel.send(err.stack, {code: "js"})
        }
    }
}