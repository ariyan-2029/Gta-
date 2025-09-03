const fs = require("fs-extra");

let powerTargets = {}; // Thread-wise এবং user-wise power state

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

  // শুধু এডমিন ব্যবহার করতে পারবে
  if (event.senderID != adminID) {
    return api.sendMessage("❌ এই কমান্ড শুধু এডমিন ব্যবহার করতে পারবে!", event.threadID, event.messageID);
  }

  // Argument চেক
  if (args.length < 2) {
    return api.sendMessage("⚠️ ব্যবহার: power @mention on/off", event.threadID, event.messageID);
  }

  const mentionIDs = Object.keys(event.mentions);
  if (mentionIDs.length === 0) return api.sendMessage("⚠️ কাউকে mention করো!", event.threadID, event.messageID);

  const action = args[1].toLowerCase();

  if (!powerTargets[event.threadID]) powerTargets[event.threadID] = {};

  for (let mention of mentionIDs) {
    const targetName = event.mentions[mention] || "User";

    if (action === "on") {
      if (powerTargets[event.threadID][mention]) {
        api.sendMessage(`⚠️ ${targetName}-এর উপর Power আগেই চালু আছে!`, event.threadID);
        continue;
      }

      // Power চালু করা
      api.sendMessage(`⚡ Power On ${targetName}-এর উপর!`, event.threadID);
      powerTargets[event.threadID][mention] = true;

      // Loop setInterval দিয়ে
      const interval = setInterval(() => {
        if (!powerTargets[event.threadID][mention]) return clearInterval(interval);
        api.sendMessage(`🔥 পাওয়ার ওরে ${targetName}! উম্মাহ 😘`, event.threadID);
      }, 2000);

    } else if (action === "off") {
      if (powerTargets[event.threadID][mention]) {
        powerTargets[event.threadID][mention] = false;
        api.sendMessage(`🛑 Power Off ${targetName}-এর উপর!`, event.threadID);
      } else {
        api.sendMessage(`⚠️ ${targetName}-এর উপর Power চালু ছিল না।`, event.threadID);
      }
    } else {
      return api.sendMessage("⚠️ ব্যবহার: power @mention on/off", event.threadID, event.messageID);
    }
  }
};