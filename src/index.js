require('dotenv').config()

const { Telegraf, Markup, session } = require('telegraf')
const path = require('path')
const TelegrafI18n = require('telegraf-i18n') 

const i18n = new TelegrafI18n({
    useSession: true,
    allowMissing: false,
    defaultLanguage: 'en',
    directory: path.resolve(__dirname, 'locales')
})
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(session())
bot.use(i18n.middleware())

bot.start((ctx) => {
    const message = ctx.i18n.t('start', {username: ctx.from.first_name});
    return ctx.replyWithHTML(message);
})

bot.command('language', (ctx) => {
    const message = ctx.i18n.t('language')
    
    return ctx.replyWithHTML(message, 
    Markup.inlineKeyboard([
      Markup.callbackButton('RU 🇷🇺', 'ru'),
      Markup.callbackButton('EN 🇬🇧', 'en')
    ]).extra())
})

bot.command('photos', (ctx) => {
    // const photo = 
    // const message = ctx.i18n.t('photo', {price: price})
    // return ctx.replyWithPhoto({url: url}, {caption: discription}, 
    //     Markup.inlineKeyboard([
    //     Markup.callbackButton('<<', 'begin'),
    //     Markup.callbackButton('<', 'previous'),
    //     Markup.callbackButton('>', 'next'),
    //     Markup.callbackButton('>>', 'end')], 
    //     [Markup.callbackButton('Buy', 'purchase')]).extra())
})

bot.action('ru', (ctx) => {
    ctx.match = 'ru'; ctx.i18n.locale('ru')
    ctx.deleteMessage()
    return ctx.answerCbQuery(ctx.i18n.t('language_changed'))
})

bot.action('en', (ctx) => {
    ctx.match = 'en'; ctx.i18n.locale('en')    
    ctx.deleteMessage()
    return ctx.answerCbQuery(ctx.i18n.t('language_changed'))
})

bot.startPolling({clearQueue: true, stopCallback: true})
