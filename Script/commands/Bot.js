module.exports.config = {
  name: "bot",
  version: "1.0.0",
  hasPermission: 0,
  credits: "𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐈𝐬𝐥𝐚𝐦",
  description: "Random fun reply when someone says Bot",
  commandCategory: "Fun",
  usages: "[Bot]",
  cooldowns: 2,
};

const botReplies = [
  "গুতা দেও‌ প্রেম করি 🫵🥲 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐋𝐢𝐧𝐤 : https://www.facebook.com/100001039692046"‚"বলো কিভাবে সাহায্য করতে পারি 😘"
];

module.exports.run = async function ({ api, event }) {
  const reply = botReplies[Math.floor(Math.random() * botReplies.length)];
  api.sendMessage(reply, event.threadID, event.messageID);
};