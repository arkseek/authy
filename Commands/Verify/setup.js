const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, Component, ActionRowBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('setup verification')
    .addRoleOption(option =>
        option.setName('role').setDescription('the role you want the user to recieve').setRequired(true)
    ),
    run: ({ interaction, client, handler }) => {
        const role = interaction.options.getRole('role')

        const verify = new ButtonBuilder().setCustomId('verify').setLabel('🛡️ Verify').setStyle(ButtonStyle.Primary)
        const information = new ButtonBuilder().setCustomId('information').setLabel('📜 Information').setStyle(ButtonStyle.Secondary)

        const row = new ActionRowBuilder().addComponents(verify, information)
        const setupEmbed = new EmbedBuilder().setTitle(`Verification System`).setDescription(`Verify by clicking the button below to start the verification process and to get the ${role} role. \n\n \*\*⚠️ DISCLAIMER ⚠️\*\* \n\n \`\`\`If you have any VPN or Proxy enabled you will be blocked from getting the role. please turn them off.\`\`\``)
        interaction.reply({ embeds: [setupEmbed], components: [row] })
    },
    options: {
        
    },
}