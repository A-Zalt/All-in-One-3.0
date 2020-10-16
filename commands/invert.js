const Discord = require("discord.js")
const l10n = require("../l10n")
const Canvas = require("canvas")

module.exports = {
    examples: ["aio.invert https://i.imgur.com/DA3A77B.jpg"],
    category: "img",
    usage: "aio.invert {attachment}",
    execute: async (message, lang, bot) => {
        let errorembed = new Discord.MessageEmbed().setColor(0xff0000)
        .setTitle(l10n(lang, "invert_title"))
        .setFooter(l10n(lang, "invoked_by").replace(/{tag}/g, message.author.tag))
        .setTimestamp()
        if(!message.attachments.first()) {
            message.channel.send(
                errorembed
                .setDescription(l10n(lang, "invert_notenoughargs"))
            )
            return // throws an error if not done in this weird way
        }
        (async ()=>{
            try {
                let img = await Canvas.loadImage(message.attachments.first().url);
                const canvas = new Canvas.Canvas(message.attachments.first().width, message.attachments.first().height, "png");
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                let imgdata = ctx.getImageData(0, 0, message.attachments.first().width, message.attachments.first().height);
                let data = imgdata.data
                for(i=0;i<data.length;i+=4) {
                    imgdata.data[i] = 255-data[i]
                    imgdata.data[i+1] = 255-data[i+1]
                    imgdata.data[i+2] = 255-data[i+2]
                }
                ctx.putImageData(imgdata, 0, 0)
                const buffer = canvas.toBuffer();
                console.log("СУКА ЧТО Я ДЕЛАЮ НЕ ТАК")
                message.channel.send(
                    new Discord.MessageAttachment(buffer)
                )
                
            } catch(e) {
                message.channel.send(
                    errorembed
                    .setDescription(l10n(lang, "invert_error"))
                )
            }})();
    }
}