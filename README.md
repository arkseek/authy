![authy banner](./authy.png)

Originally designed for the Doge Unblocker discord server (https://discord.gg/unblocking), Authy is a discord authentication bot that detects if a user is using a proxy, vpn, and it also has them do a recaptcha verification to prove they are not a bot.
# Tools
- CommandKit (https://commandkit.js.org)
- Discord.js v14 (https://discord.js.org)
- VPNAPI (https://vpnapi.io/)
- ReCaptcha (https://google.com/recaptcha)
  
# Guide
to get started, head over to the config.example.json file and fill in all the required information
go to the /Web/Views/verify.html page and change the sitekey to the one you get from recaptcha. 
Go to the console and run `npm i` to download all packages
Then finally, run `node .` to run the bot.

# ⚠️ DISCLAIMER
this bot is ALMOST finished, i just need to finish the command, fix the oAuth thingy, and then add it so that when a user gets the role they will recieve a message.
