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

bot.start(async (ctx) => {
    const message = ctx.i18n.t('start', {username: ctx.from.first_name});
    return ctx.replyWithHTML(message);
})

bot.command('language', async (ctx) => {
    const message = ctx.i18n.t('language')
    
    return ctx.replyWithHTML(message, 
    Markup.inlineKeyboard([
      Markup.callbackButton('RU 🇷🇺', 'ru'),
      Markup.callbackButton('EN 🇬🇧', 'en')
    ]).extra()
    )
})

bot.action('ru', async (ctx) => {
    ctx.match = 'ru'
    await ctx.i18n.locale('ru')
    await ctx.deleteMessage()
    return ctx.answerCbQuery(ctx.i18n.t('language_changed'))
})

bot.action('en', async (ctx) => {
    ctx.match = 'en'
    await ctx.i18n.locale('en')    
    await ctx.deleteMessage()
    return ctx.answerCbQuery(ctx.i18n.t('language_changed'))
})

bot.startPolling({clearQueue: true, stopCallback: true})
