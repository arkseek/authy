# Authy
Originally designed for the Doge Unblocker discord server (discord.gg/unblocking), Authy is a discord authentication bot that detects if a user is using a proxy, vpn, and it also has them do a cloudflare turnstile verification to prove they are not a bot.
# Tools
- CommandKit which has a Event handler and a Command handler (+ more!) built into it which makes the code easier to read and understand (https://commandkit.js.org)
- Discord.js v14
- [vpn](https://vpnapi.io/)

# Guide
to get started, head over to the config.example.json file and fill in all the required information
go to the /Web/Views/verify.html page and change the sitekey to the one you get from recaptcha. 
Go to the console and run `npm i` to download all packages
Then finally, run `node .` to run the bot.


