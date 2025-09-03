const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
 name: "admin",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "আরিয়ান",
 description: "Show Owner Info",
 commandCategory: "info",
 usages: "admin",
 cooldowns: 2
};

module.exports.run = async function({ api, event }) {
 const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

 // Facebook Profile ID
 const fbID = "61578286892262";
 const profilePicURL = `https://graph.facebook.com/${fbID}/picture?width=500&height=500`;

 const callback = () => api.sendMessage({
 body: `
┌───────────────⭓
│ 𝗢𝗪𝗡𝗘𝗥 𝗗𝗘𝗧𝗔𝗜𝗟𝗦
├───────────────
│ 👤 Name : Ariyan 
│ 🚹 Gender : Male
│ ❤️ Relation : Single
│ 🎂 Age : 17+
│ 🏫 Education : Currently studying in College
│ 🏡 Address : Tangail
└───────────────⭓

┌───────────────⭓
│ 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗟𝗜𝗡𝗞𝗦
├───────────────
│ 📘 Facebook: https://www.facebook.com/profile.php?id=61578286892262
│ 
│ 💬 WhatsApp:
│ Not Provided
└───────────────⭓

┌───────────────⭓
│ 🕒 Updated Time
├───────────────
│ ${time}
└───────────────⭓
 `,
 attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
 }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/owner.jpg"));

 // Download FB Profile Picture
 return request(profilePicURL)
 .pipe(fs.createWriteStream(__dirname + '/cache/owner.jpg'))
 .on('close', () => callback());
};