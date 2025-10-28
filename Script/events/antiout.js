module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "Koi Ase Pichware Mai Lath Marta Hai?";
 if (type == "self-separation") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`সরি বস, ${name} ওরে এড করলে রাগ করবে তাই এড করি নাই
\n──────—͟͟͞͞𝐕𝐨𝐢𝐜𝐞 𝐒𝐭𝐚𝐭𝐢𝐨𝐧 𝐁𝐨𝐭─────`, event.threadID)
   } else api.sendMessage(`শোন, ${name}, তুমি আমাকে রেখে চলে গেলা 💔
\n──────—͟͟͞͞𝐕𝐨𝐢𝐜𝐞 𝐒𝐭𝐚𝐭𝐢𝐨𝐧 𝐁𝐨𝐭─────`, event.threadID);
  })
 }
}
