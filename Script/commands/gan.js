const fs = require("fs");
const request = require("request");

let lastPlayed = -1;

module.exports.config = {
 name: "gan",
 version: "1.0.0",
 hasPermission: 0,
 credits: "Shahadat Islam",
 description: "Play random song with prefix command",
 commandCategory: "music",
 usages: "[prefix]gan",
 cooldowns: 5
};

const songLinks = [
 "https://drive.google.com/uc?export=download&id=1kmaBUKulLRyrFophTBuULNSm-dTQdwlX",
 " https://drive.google.com/uc?export=download&id=1E43aZZ-EMmbj1nO0HyC2sMhseUM2JE8L",
 "https://drive.google.com/uc?export=download&id=1aTjhRMmXbYbAxomts387Bj--c1QBFU-X",
 "https://drive.google.com/uc?export=download&id=14DT49Bmm8QJqylR67epATwLc3ro4q4CR",
 "https://drive.google.com/uc?export=download&id=1Ex4viD6y-3uY2jjJUCepWxf_FPPOxFpr",
 "https://drive.google.com/uc?export=download&id=1a18p8JJaUTNk7jPLVEOOfNRDJc89fWW1",
 "https://drive.google.com/uc?export=download&id=1RAAGXCRiSXQE7wwkpzKR4xOlHpbSVuBi",
 "https://drive.google.com/uc?export=download&id=1J-ehtxKugRNfNReTs8xg6Utrva0ewGZk",
 "https://drive.google.com/uc?export=download&id=16hxyS9gEP2i4HQ983wx_l08VI8-eIO0l",
 "https://drive.google.com/uc?export=download&id=1Fw_AYfEVEDi8G9E-PIdWAUAwz6E2qE_N",
 "https://drive.google.com/uc?export=download&id=14uaJC_UEj0NBIXsyQAIdthdVlQVRNMFL",
 "https://drive.google.com/uc?export=download&id=1F78Y4GA0dv2qV2itPYKiyJ2pD6Qy68cU",
 "https://drive.google.com/uc?export=download&id=1X_bTzDAbsh7JEBK4VBVyvIdUgdI_0yru",
 "https://drive.google.com/uc?export=download&id=1g18k7GWQlH-D_8kRcEG7RFTz-RIo0rXH",
 "https://drive.google.com/uc?export=download&id=1g18k7GWQlH-D_8kRcEG7RFTz-RIo0rXH",
 "https://drive.google.com/uc?export=download&id=1wJ_ZM8djlQIKbz28-6V61asrsD3S9kfR",
 "https://drive.google.com/uc?export=download&id=1CBUYRgziBH1I-oesl_zfbDvZFuoc-sUv",
 "https://drive.google.com/uc?export=download&id=1pFh6DN8SUqTOev5xgX6pQI5ESfmqs5AZ",
 "https://drive.google.com/uc?export=download&id=1eLoUghjjnN5HSF5-3fQBeUVbfAXTmIK9",
 "https://drive.google.com/uc?export=download&id=1Tp-0Ao8dI-v8dbr9RN_WNIJRgJg_uTGm"
];

module.exports.run = async function ({ api, event, args }) {
 const { threadID, messageID } = event;

 if (songLinks.length === 0) {
 return api.sendMessage("❌ No songs available in the list!", threadID, messageID);
 }

 // Set reaction to indicate processing
 api.setMessageReaction("⌛", messageID, () => {}, true);

 // Select a random song (different from last played)
 let index;
 do {
 index = Math.floor(Math.random() * songLinks.length);
 } while (index === lastPlayed && songLinks.length > 1);

 lastPlayed = index;
 const url = songLinks[index];
 const filePath = `${__dirname}/cache/mysong_${index}.mp3`;

 // Download and send the song
 request(encodeURI(url))
 .pipe(fs.createWriteStream(filePath))
 .on("close", () => {
 api.sendMessage({
 body: "🎶 Here's your requested song:",
 attachment: fs.createReadStream(filePath)
 }, threadID, () => {
 // Delete the file after sending
 try {
 fs.unlinkSync(filePath);
 } catch (err) {
 console.error("Error deleting file:", err);
 }
 }, messageID);
 })
 .on("error", (err) => {
 console.error("Download error:", err);
 api.sendMessage("❌ Failed to download the song. Please try again later.", threadID, messageID);
 });
};
