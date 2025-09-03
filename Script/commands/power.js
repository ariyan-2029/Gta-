const fs = require("fs-extra");

let powerTargets = {}; // এখানে লিস্ট থাকবে কার উপর Power চালু আছে

module.exports.config = {
  name: "power",
  version: "1.0.0",
  hasPermssion: 2, // শুধু এডমিন
  credits: "Ariyan",
  description: "Power On/Off System",
  commandCategory: "fun",
  usages: "@mention on/off",
  cooldowns: 2,
};

module.exports.run = async ({ api, event, args }) => {
  const adminID = "61578286892262"; // শুধু তোমার ID

  if (event.senderID != adminID) {
    return api.sendMessage("❌ এই কমান্ড শুধু এডমিন ব্যবহার করতে পারবে!", event.threadID, event.messageID);
  }

  if (args.length < 2) {
    return api.sendMessage("⚠️ ব্যবহার: power @mention on/off", event.threadID, event.messageID);
  }

  const mention = Object.keys(event.mentions)[0];
  if (!mention) return api.sendMessage("⚠️ কাউকে mention করো!", event.threadID, event.messageID);

  const action = args[1].toLowerCase();
  const targetName = event.mentions[mention].replace("@", "");

  if (action === "on") {
    if (!powerTargets[event.threadID]) powerTargets[event.threadID] = {};
    if (powerTargets[event.threadID][mention]) {
      return api.sendMessage(`⚠️ ${targetName}-এর উপর Power আগেই চালু আছে!`, event.threadID, event.messageID);
    }

    api.sendMessage(`⚡ Power On ${targetName}-এর উপর!`, event.threadID);

    // Power Loop
    powerTargets[event.threadID][mention] = true;

    const spamLoop = async () => {
      while (powerTargets[event.threadID] && powerTargets[event.threadID][mention]) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // প্রতি 2 সেকেন্ডে
        api.sendMessage(`🔥 পাওয়ার ওরে ${targetName}! উম্মাহ 😘`, event.threadID);
      }
    };

    spamLoop();

  } else if (action === "off") {
    if (powerTargets[event.threadID] && powerTargets[event.threadID][mention]) {
      powerTargets[event.threadID][mention] = false;
      return api.sendMessage(`🛑 Power Off ${targetName}-এর উপর!`, event.threadID);
    } else {
      return api.sendMessage(`⚠️ ${targetName}-এর উপর Power চালু ছিল না।`, event.threadID);
    }
  } else {
    return api.sendMessage("⚠️ ব্যবহার: power @mention on/off", event.threadID, event.messageID);
  }
};