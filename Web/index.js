const express = require("express");
const axios = require("axios");
const ipaddr = require("ipaddr.js");
const path = require("path");
const { clientId, recaptchaSecret, clientSecret, guildId, roleId, vpnApiKey } = require("../config.json");
const app = express();

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));

// Function to run everything.
async function network(client) {
    app.get('/', (req, res) => {
        res.json({ message: "nothing to see here!" });
    });

    app.get("/api/auth/callback", (req, res) => {
        res.redirect('/verify');
    });

    app.get('/verify', async (req, res) => {
        const code = req.query.code;
        try {
            const tokenResponse = await axios.post('https://discord.com/api/v9/oauth2/token', {
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'authorization_code',
                code,
                redirect_uri: 'http://localhost:8080/api/auth/callback',
            });

            const accessToken = tokenResponse.data.access_token;

            const userResponse = await axios.get('https://discord.com/api/v9/users/@me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const userId = userResponse.data.id;
            console.log('User ID:', userId);

            const apiKey = vpnApiKey; // Store API key in environment variable
            const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            const ipv4Address = ipaddr.process(ipAddress).toString();
            const apiURL = `https://vpnapi.io/api/${ipv4Address}?key=${apiKey}`;

            const response = await axios.get(apiURL);
            const responseData = response.data;

            if (responseData.security && (responseData.security.vpn || responseData.security.proxy || responseData.security.tor)) {
                res.status(403).json({ error: "It seems that you have a VPN or Proxy enabled, please disable to continue." });
            } else {
                res.sendFile(path.join(__dirname, 'views', 'verify.html')); // Simplified file path
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error fetching API information, please contact an administrator' });
        }
    });

    app.post('/verify', async (req, res) => {
        const options = {
            method: 'POST',
            url: 'https://www.google.com/recaptcha/api/siteverify',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            form: { secret: recaptchaSecret, response: req.body['g-recaptcha-response'] }
        };

        try {
            const { data } = await axios(options);
            if (data.success) {
                const guild = await client.guilds.fetch(guildId);
                const member = await guild.members.fetch(req.body.userId); // Access userId from the request body
                await member.roles.add(roleId, 'User is verified');
                res.send(`Verified with id ${req.body.userId}`);
                console.log(`${req.body.userId} has passed the captcha`);
            } else {
                res.status(403).json({ error: "You have failed the captcha" });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error verifying reCAPTCHA, please contact an administrator' });
        }
    });

    app.listen(8080, () => {
        console.log("Started server on port 8080.");
    });
}

module.exports = { network };
