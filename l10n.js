const fs = require("fs")
module.exports = (lang, string) => {
    if(!fs.existsSync(`./translations/${lang}.json`) || !(JSON.parse(fs.readFileSync(`./translations/${lang}.json`).toString())[string])) return `l10n.${lang}.${string}`
    return JSON.parse(fs.readFileSync(`./translations/${lang}.json`).toString())[string]
}