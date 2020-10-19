const Discord = require("discord.js")
const l10n = require("../l10n")
const Canvas = require("canvas")

module.exports = {
    examples: ["aio.grayscale https://i.imgur.com/DA3A77B.jpg"],
    category: "img",
    usage: "aio.grayscale {attachment}",
    execute: async (message, lang, bot) => {
        let errorembed = new Discord.MessageEmbed().setColor(0xff0000)
        .setTitle(l10n(lang, "grayscale_title"))
        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
        .setTimestamp()
        if(!message.attachments.first()) {
            message.channel.send(
                errorembed
                .setDescription(l10n(lang, "grayscale_notenoughargs"))
            )
            return // throws an error if not done in this weird way
        }
        (async ()=>{
            try {
                let img = await Canvas.loadImage(message.attachments.first().url)
                const canvas = new Canvas.Canvas(message.attachments.first().width, message.attachments.first().height, "png")
                const ctx = canvas.getContext("2d")
                ctx.drawImage(img, 0, 0)
                let imgdata = ctx.getImageData(0, 0, message.attachments.first().width, message.attachments.first().height)
                for(i=0;i<imgdata.data.length;i+=4) {
                    let value = imgdata.data[i]*0.2126 + imgdata.data[i+1]*0.7152 + imgdata.data[i+2]*0.0722 //  some uh... formula that i found from stackoverflow, i have no idea how it works
                    imgdata.data[i] = value
                    imgdata.data[i+1] = value
                    imgdata.data[i+2] = value
                }
                ctx.putImageData(imgdata, 0, 0)
                const buffer = canvas.toBuffer()
                message.channel.send(
                    new Discord.MessageAttachment(buffer)
                )
                
            } catch(e) {
                console.log(e.stack)
                message.channel.send(
                    errorembed
                    .setDescription(l10n(lang, "grayscale_error"))
                )
            }})();
    }
}