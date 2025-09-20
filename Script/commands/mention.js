module.exports.config = {
 name: "mention",
 version: "1.0.0",
 hasPermssion: 2,
 credits: "Shahadat Islam",
 description: "কাস্টম টেক্সট সহ কাউকে মেনশন করার কমান্ড",
 commandCategory: "group",
 usages: "/mention [text] @mention [count]",
 cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
 const { mentions, threadID } = event;

 if (Object.keys(mentions).length === 0) {
   return api.sendMessage("সব আপনি কাউকে মেনশন করেননি\n\n Example /mention কিরে কই তুই @Farhad 5", threadID);
 }

 const mentionID = Object.keys(mentions)[0];
 const mentionName = mentions[mentionID];

 
 const mentionIndex = args.findIndex(arg => arg.includes('@'));
 const count = parseInt(args[args.length - 1]);
 const repeatCount = isNaN(count) ? 1 : count;

 const customText = args.slice(0, mentionIndex).join(" ");

 for (let i = 0; i < repeatCount; i++) {
   await new Promise(resolve => setTimeout(resolve, 1000));
   await api.sendMessage({
     body: `${mentionName}\n${customText}`,
     mentions: [{ tag: mentionName, id: mentionID }]
   }, threadID);
 }
};
