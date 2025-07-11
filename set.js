




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUdmRVZjL2lrZ1hnTjh4OUtwbnN5czNSSGdHOGQwR3V5WDhCa0w2MkgxST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRzh4NUtxV2Rpd0FXWFpicHVhQkRVbzNGSUdXUEp5dEMvYldoR0JGWmhuTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5SWRuNWdjd01kRWUzY2wza2FlSlZ4TktsSVhaRFZpaGF0cmZaVXE5VTBBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoWkQxZkZWc0xaMW5aZk5NZ0Z2K2s4LzU5RVd6RXFqcy9GTnVkODd1OGlVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdPc3J4c3JWS1F5bXNUcUMzWVM2VTJoZkFoTmljRWlHdE1WbEdGQ2xOVVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFVajN0MXFMa0hmYmdaOHdXRDNJcWFzbnhzRjM2WWsvTjdHK25IOEdhUVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaURNYVJpY3BQYW9KZHl3b1V6WU05QVZSRmdKZEwyU2pZRXc5a0xDQzVraz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZDIrMDZnTm5RZXpUNW5NMWwvNk5XaHZpS09hYTB2Q0dvNVZrZ3dMQitFYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IloxNnhwNlVHZmU1d1FYZjNFZitkcjEvRjVZMlRtZ0gyMWtYSmQ2dVo4dDEyclp3SWpLYmtZdjdqWWFIYkx3Vk1uWkFFREpDL2FSemtJVXJpdHdCWmpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgyLCJhZHZTZWNyZXRLZXkiOiJnWldONm5RdXU3eFZkN09qU0dudENYZG0yVHFSYkRQd2RoNWFLc0pBMFJFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxNTQ1NzExNjlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNUEwMDM4QUI0RTYwN0QwOTA5MEY4NEQ1RDY1M0UwNjkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MjI0NzIyMn0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODE1NDU3MTE2OUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1RjA2M0RBODg0OUJGMDI5QTJFQ0Y4QjIyQzM3RUM0MSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUyMjQ3MjI1fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJSN1Q1UkxBWCIsIm1lIjp7ImlkIjoiMjM0ODE1NDU3MTE2OToxNkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjExNTUwMDMxMDg3NjQxMToxNkBsaWQiLCJuYW1lIjoi4LySRU3igZ4g8J2TqfCdk6rwnZO38J2TrfCdk67wnZSB8J2TufCdk7vwnZOy8J2TtvCdk64ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0ordXp3WVFuTmZFd3dZWUJDQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjAwZ3dNNzRDNGlIb0NhZHZBQUY5OFBFbWwvdmZNS2tLWldrRDByV1FNMGs9IiwiYWNjb3VudFNpZ25hdHVyZSI6InY3ejl6eG1mM1BaVDdmNm1ma0EzbDdQNmtWVkJlS3Z6RndWcHdYS0pLVFhGWjR3TklJRDBSL1RUK28xZ0VGbHMxdGM2Q1E4YUVwY0xHWGVvUGhhUERBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJvUktrWXJxbDVVZ2VCREtnWEVwaTdaeXJuNXN3WEtCbDVJV2tvZDlsYnBBdWhIckFQUWlDU2d1czJiNWJsbUIwL1lrVWl0ekJVNXc5eHhxQmpYR1Bndz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxNTQ1NzExNjk6MTZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZE5JTURPK0F1SWg2QW1uYndBQmZmRHhKcGY3M3pDcENtVnBBOUsxa0ROSiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUyMjQ3MjExLCJsYXN0UHJvcEhhc2giOiIyUDFZaGYiLCJteUFwcFN0YXRlS2V5SWQiOiJBQXdBQUF6USJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "2348072253266",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Pkdriller01",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'NEXUS-AI',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/g86c1n.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
