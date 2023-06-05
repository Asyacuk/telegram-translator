const { Telegraf } = require("telegraf");
const translator = require("translation-google");
const http = require("http");

const bot = new Telegraf(TOKEN="");


// Kullanıcının tercih ettiği dilin saklanacağı değişken
let selectedLanguage = "tr"; // Varsayılan dil Türkçe olarak ayarlandı

// Diller ve bayraklar
const languages = [
  ['🇿🇦 Afrikaans', 'af'], ['🇦🇱 Albanian', 'sq'], ['🇪🇹 Amharic', 'am'],
  ['🇸🇦 Arabic', 'ar'], ['🇦🇲 Armenian', 'hy'], ['🇦🇿 Azerbaijani', 'az'],
  ['🇪🇸 Basque', 'eu'], ['🇧🇾 Belarusian', 'be'], ['🇧🇩 Bengali', 'bn'],
  ['🇧🇦 Bosnian', 'bs'], ['🇧🇬 Bulgarian', 'bg'], ['🇪🇸 Catalan', 'ca'],
  ['🇵🇭 Cebuano', 'ceb'], ['🇨🇳 Chinese (Simplified)', 'zh-CN'], ['🇹🇼 Chinese (Traditional)', 'zh-TW'],
  ['🇫🇷 Corsican', 'co'], ['🇭🇷 Croatian', 'hr'], ['🇨🇿 Czech', 'cs'],
  ['🇩🇰 Danish', 'da'], ['🇳🇱 Dutch', 'nl'], ['🇺🇸 English', 'en'],
  ['🌍 Esperanto', 'eo'], ['🇪🇪 Estonian', 'et'], ['🇫🇮 Finnish', 'fi'],
  ['🇫🇷 French', 'fr'], ['🇳🇱 Frisian', 'fy'], ['🇪🇸 Galician', 'gl'],
  ['🇬🇪 Georgian', 'ka'], ['🇩🇪 German', 'de'], ['🇬🇷 Greek', 'el'],
  ['🇬🇹 Gujrati', 'gu'], ['🇭🇹 Haitian Creole', 'ht'], ['🇭🇺 Hungarian', 'hu'],
  ['🇮🇸 Icelandic', 'is'], ['🇮🇳 Hindi', 'hi'], ['🇮🇩 Indonesian', 'id'], 
  ['🇮🇷 Persian', 'fa'], ['🇮🇱 Hebrew', 'he'], ['🇮🇶 Iraqi', 'ar'], 
  ['🇮🇪 Irish', 'ga'], ['🇮🇹 Italian', 'it'], ['🇯🇵 Japanese', 'ja'],
  ['🇯🇵 Japanese (Romaji)', 'ja-Romaji'], ['🇰🇪 Kikuyu', 'ki'], ['🇰🇿 Kazakh', 'kk'], 
  ['🇰🇭 Khmer', 'km'], ['🇰🇬 Kyrgyz', 'ky'], ['🇰🇷 Korean', 'ko'], 
  ['🇰🇼 Kuwaiti Arabic', 'ar'], ['🇱🇻 Latvian', 'lv'], ['🇱🇹 Lithuanian', 'lt'],
  ['🇱🇮 Luxembourgish', 'lb'], ['🇲🇰 Macedonian', 'mk'], ['🇲🇬 Malagasy', 'mg'],
  ['🇲🇾 Malay', 'ms'], ['🇲🇲 Myanmar (Burmese)', 'my'], ['🇲🇳 Mongolian', 'mn'],
  ['🇳🇵 Nepali', 'ne'], ['🇳🇴 Norwegian', 'no'], ['🇺🇿 Uzbek', 'uz'],
  ['🇵🇰 Punjabi', 'pa'], ['🇵🇭 Philippine', 'fil'], ['🇵🇹 Portuguese', 'pt'],
  ['🇷🇴 Romanian', 'ro'], ['🇷🇺 Russian', 'ru'], ['🇷🇼 Rwandan', 'rw'],
  ['🇸🇲 Sammarinese', 'it'], ['🇼🇸 Samoan', 'sm'], ['🇷🇸 Serbian', 'sr'],
  ['🇬🇧 English (Simplified)', 'en'], ['🇺🇦 Ukrainian', 'uk'], ['🇺🇾 Uruguayan Spanish', 'es'],
  ['🇺🇿 Uzbek', 'uz'], ['🇻🇪 Venezuelan Spanish', 'es'], ['🇻🇳 Vietnamese', 'vi'],
  ['🇨🇭 Walser', 'de-CH'], ['🇪🇭 Western Frisian', 'fy'], ['🇬🇳 Wolof', 'wo'],
  ['🇮🇶 Sorani Kurdish', 'ckb'], ['🇶🇦 Qatari Arabic', 'ar'], ['🇸🇴 Somali', 'so'],
  ['🇹🇷 Turkish', 'tr'], ['🇹🇯 Tajik', 'tg'], ['🇹🇲 Turkmen', 'tk'],
  ['🇹🇻 Tuvaluan', 'tvl'], ['🇹🇿 Swahili', 'sw'], ['🇺🇦 Ukrainian', 'uk'],
  ['🇼🇫 Wallisian', 'fr'], ['🇾🇪 Yemeni Arabic', 'ar'], ['🇿🇲 Zambian', 'ny']
];

// Dilleri 3'lü olarak yazdır
let i = 0;
while (i < languages.length) {
  console.log(
    languages[i][0], '\t', languages[i + 1][0], '\t', languages[i + 2][0],
    languages[i][1], '\t', languages[i + 1][1], '\t', languages[i + 2][1],
    '\n'
  );
  i += 3;
}

const rows = [];
for (let i = 0; i < languages.length; i += 3) {
  const row = languages.slice(i, i + 3);
  rows.push(row);
}

// Bot başladığında kullanıcıya dil seçeneklerini gönder
bot.start((ctx) => {
  const message = `Hello ${ctx.from.username || ctx.from.first_name + " " + ctx.from.last_name || "there"}, choose a language for translation:`;
  const keyboard = {
    reply_markup: {
      inline_keyboard: rows.map(row =>
        row.map(language => ({
          text: language[0],
          callback_data: language[1]
        }))
      )
    }
  };

  ctx.reply(message, keyboard);
});

// Kullanıcı dil seçeneğine tıkladığında tetiklenecek olan fonksiyon
bot.action(/.+/, async (ctx) => {
  selectedLanguage = ctx.match[0];
  const message = `selected language: ${languages.find((language) => language[1] === selectedLanguage)[0]}`;
  ctx.answerCbQuery(message, {to: selectedLanguage});
});


// beta ve teta



// beta ve teta

bot.on("text", async (ctx) => {
  const text = ctx.update.message.text;
  const translation = await translator(text, { to: selectedLanguage });
  ctx.reply(`*${translation.text}*`, {
    parse_mode: "Markdown",
    reply_to_message_id: ctx.update.message.message_id,
  });
});

bot.on("photo", async (ctx) => {
  const text = ctx.update.message.caption;
  if (text) {
    const translation = await translator(text, { to: selectedLanguage });
    ctx.replyWithPhoto(ctx.update.message.photo[0].file_id, {
      caption: `*${translation.text}*`,
      parse_mode: "Markdown",
      reply_to_message_id: ctx.update.message.message_id,
    });
  } else {
    //ctx.reply("error");
  }
});

bot.on("video", async (ctx) => {
  const text = ctx.update.message.caption;
  if (text) {
    const translation = await translator(text, { to: selectedLanguage });
    ctx.replyWithVideo(ctx.update.message.video.file_id, {
      caption: `*${translation.text}*`,
      parse_mode: "Markdown",
      reply_to_message_id: ctx.update.message.message_id,
    });
  } else {
    //ctx.reply("");
  }
});

bot.on("voice", async (ctx) => {
  const text = ctx.update.message.caption;
  if (text) {
    const translation = await translator(text, { to: selectedLanguage });
    ctx.replyWithVoice(ctx.update.message.voice.file_id, {
      caption: `*${translation.text}*`,
      parse_mode: "Markdown",
      reply_to_message_id: ctx.update.message.message_id,
    });
  } else {
   //ctx.reply("");
  }
});

bot.on("audio", async (ctx) => {
  const text = ctx.update.message.caption;
  if (text) {
    const translation = await translator(text, { to: selectedLanguage });
    ctx.replyWithAudio(ctx.update.message.audio.file_id, {
      caption: `*${translation.text}*`,
      parse_mode: "Markdown",
      reply_to_message_id: ctx.update.message.message_id,
    });
  } else {
    //ctx.reply("");
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
