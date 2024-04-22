
async function interactionCreate(client) {
    client.on(Events.InteractionCreate, async interaction => {
        if(!interaction.isButton()) return;

        if(interaction.customId === 'verify') {
            await interaction.reply({
                content: `Click on the following link to verify: `,
                ephmeral: 'true'
            })
        }

        if(interaction.customId === 'information') {
            await interaction.reply({
                content: 'By continuing, you agree to us getting your IP and running it through an API to get it checked. \n WE DO NOT STORE IPS. We only catch them for checking purposes. ',
                ephmeral: 'true'
            })
        }
    })
}


module.exports = { interactionCreate };