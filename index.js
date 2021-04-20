const TelegramBot = require('node-telegram-bot-api')
const token = '1766804263:AAHONLnxpuSwmIs1o7qQfh0PLe73xVeeJJQ'
const bot = new TelegramBot(token, { polling: true })
const request = require('request')

bot.onText(/\/echo (.+)/, function(msg, match) {
    let chatId = msg.chat.id
    let echo = match[1]
    bot.sendMessage(chatId, echo)
})

bot.onText(/\/movie (.+)/, function(msg, match) {
    let movie = match[1]
    let chatId = msg.chat.id
    request(`http://www.omdbapi.com/?t=${movie}&apikey=d54cf538`, function(error, response, body) {
        if (!error && response.statusCode !== 300) {
            bot.sendMessage(chatId, `Looking for ${movie} ...`, { parse_mode: "Markdown" })
                .then(function(msg) {
                    let res = JSON.parse(body)
                    bot.sendMessage(
                        chatId,
                        `TITLE: ${res.Title} \nYEAR: ${res.Year} \nRATED: ${res.Rated} \nRELEASE: ${res.Released} \nCOUNTRY: ${res.Country}
                        \nDIRECTORirector: ${res.Director} \nWRITER: ${res.Writer} \nACTORS: ${res.Actors} \nGENRE: ${res.Genre}
                        \nRUNTIME: ${res.Runtime} \nPLOT: ${res.Plot} \nLANGUAGE: ${res.Language} \nAWARDS: ${res.Awards}
                        \n[Image link: ${res.Poster} ]
                    `)
                })
        } else {
            bot.sendMessage(chatId, `Error`)
        }
    })
})