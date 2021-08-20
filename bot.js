/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/************************************TELEGRAM BOT FOR CIVILIZATION V0.1*******************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
const { Telegraf } = require("telegraf");
const {MenuTemplate, MenuMiddleware} = require('telegraf-inline-menu')

const botlink = new Telegraf(process.env.BOT_TOKEN);
const botingresso = new Telegraf(process.env.BOT2_TOKEN);
const chat_id = process.env.CHAT_ID;
const chat2_id = process.env.CHAT2_ID;

/*************************************VARIABILI IMPOSTABILI****************************************************/
const timeExpireLink = 30; //secondi destinati all'expire del link
const timedeletes = 10; //secondi di attesa prima di cancellare il messaggio
var memberlimit = 99999; //limite massimo di membri nella chat per accettare nuove entrate

/*******************************************VARIABILI**********************************************************/
const secondsSinceEpoch = Math.round(Date.now() / 1000);
var epoch = 0;
var linkok
var data2
var messageId
var messageId2
var sec = secondsSinceEpoch;
var y = timeExpireLink;
var timedeletems = timedeletes * 1000;

/********************************************************BOT************************************************************/
//Accetta gli utenti nel primo gruppo e pone il link per il secondo
botlink.start(ctx => {})
botingresso.start(ctx =>{})

botingresso.on('new_chat_member', (ctx) => {
  const secondsSinceEpoch = Math.round(Date.now() / 1000);
  var sec = secondsSinceEpoch;
  epoch = sec;
  var y = timeExpireLink;
  var result = epoch + y;
  botlink.telegram.createChatInviteLink(chat2_id, { expire_date: result }, { members_limit: memberlimit }).then((data) => {
  const stringjson = JSON.stringify(data);
  const obj = JSON.parse(stringjson);
  const menuTemplate = new MenuTemplate(ctx => `Hello ${ctx.from.first_name}, you have 30 seconds to press the button below and join our group. Welcome!`)
  const menuMiddleware = new MenuMiddleware('/', menuTemplate)
  menuMiddleware.replyToContext(ctx)
  menuTemplate.url('Join Group!', obj.invite_link)

  function sleep(ms) { 
    return new Promise(resolve => setTimeout(resolve, ms));
    }
  async function delayKick() {

             await sleep(timedeletems);
             messageId = ctx.message.message_id
             messageId2 = ctx.message.message_id + 1
             ctx.deleteMessage(messageId2)
             ctx.deleteMessage()
             ctx.kickChatMember(ctx.from.id, ctx.chat.id)  
             await sleep(5000)
             ctx.unbanChatMember(ctx.from.id, ctx.chat.id)
    return 0
    }
  delayKick(); 
  
  })
  
  return false
  
  })
//***************************************************************************************************************
  botlink.launch()
  botingresso.launch()
//***************************************************************************************************************