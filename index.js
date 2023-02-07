const { Telegraf } = require("telegraf");
const translator = require("translation-google");
const http = require("http");
const bot = new Telegraf("6142679038:AAF1fKh8PbeF87d--ImuFJPD58qnyqz0PGk");

bot.start((ctx) => {
  ctx.reply(
    `<b>Merhaba @${ctx.from.username}, bana çevirmek istediğin bir metin gönder senin için türkçeye çevireyim.</b>`,
    { parse_mode: "HTML" }
  );
});

bot.on("text", async (ctx) => {
  const text = ctx.update.message.text;
  const translation = await translator(text, { to: "tr" });
  ctx.reply(`*${translation.text}*`, {
    parse_mode: "Markdown",
    reply_to_message_id: ctx.update.message.message_id,
  });
});

bot.on("photo", async (ctx) => {
  const text = ctx.update.message.caption;
  if (text) {
    const translation = await translator(text, { to: "tr" });
    ctx.replyWithPhoto(ctx.update.message.photo[0].file_id, {
      caption: `*${translation.text}*`,
      parse_mode: "Markdown",
      reply_to_message_id: ctx.update.message.message_id,
    });
  } else {
    ctx.reply("Anlayamadım. Lütfen tekrar edin.");
  }
});

bot.on("video", async (ctx) => {
  const text = ctx.update.message.caption;
  if (text) {
    const translation = await translator(text, { to: "tr" });
    ctx.replyWithVideo(ctx.update.message.video.file_id, {
      caption: `*${translation.text}*`,
      parse_mode: "Markdown",
      reply_to_message_id: ctx.update.message.message_id,
    });
  } else {
    ctx.reply("Lütfen video altına metin ekleyiniz.");
  }
});

bot.on("voice", async (ctx) => {
  const text = ctx.update.message.caption;
  if (text) {
    const translation = await translator(text, { to: "tr" });
    ctx.replyWithVoice(ctx.update.message.voice.file_id, {
      caption: `*${translation.text}*`,
      parse_mode: "Markdown",
      reply_to_message_id: ctx.update.message.message_id,
    });
  } else {
    ctx.reply("Lütfen ses dosyasının altına metin ekleyiniz.");
  }
});

bot.on("audio", async (ctx) => {
  const text = ctx.update.message.caption;
  if (text) {
    const translation = await translator(text, { to: "tr" });
    ctx.replyWithAudio(ctx.update.message.audio.file_id, {
      caption: `*${translation.text}*`,
      parse_mode: "Markdown",
      reply_to_message_id: ctx.update.message.message_id,
    });
  } else {
    ctx.reply("Lütfen ses dosyasına metin ekleyiniz.");
  }
});

bot.launch();

//create a server object:
http
  .createServer(function (req, res) {
    res.write("Hello World!"); //write a response
    res.end(); //end the response
  })
  .listen(8000, function () {
    console.log("server start at port 8000"); //the server object listens on port 3000
  });