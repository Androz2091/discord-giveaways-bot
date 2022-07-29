const Discord = require('discord.js');
const ms = require('ms');
const messages = require("../utils/messages");

module.exports = {

    description: 'Start a giveaway',

    options: [
        {
            name: 'duration',
            description: 'How long the giveaway should last for. Example values: 1m, 1h, 1d',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'winners',
            description: 'How many winners the giveaway should have',
            type: Discord.ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: 'prize',
            description: 'What the prize of the giveaway should be',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'channel',
            description: 'The channel to start the giveaway in',
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true
        }
    ],

    run: async (client, interaction) => {

        // If the member doesn't have enough permissions
        if(!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")){
            return interaction.reply({
                content: ':x: You need to have the manage messages permissions to start giveaways.',
                ephemeral: true
            });
        }
    
        const giveawayChannel = interaction.options.getChannel('channel');
        const giveawayDuration = interaction.options.getString('duration');
        const giveawayWinnerCount = interaction.options.getInteger('winners');
        const giveawayPrize = interaction.options.getString('prize');
        
        if(!giveawayChannel.isTextBased()) {
            return interaction.reply({
                content: ':x: Selected channel is not text-based.',
                ephemeral: true
            });
        }
    
        // Start the giveaway
        client.giveawaysManager.start(giveawayChannel, {
            // The giveaway duration
            duration: ms(giveawayDuration),
            // The giveaway prize
            prize: giveawayPrize,
            // The giveaway winner count
            winnerCount: giveawayWinnerCount,
            // Who hosts this giveaway
            hostedBy: client.config.hostedBy ? interaction.user : null,
            // Messages
            messages
        });
    
        interaction.reply(`Giveaway started in ${giveawayChannel}!`);
    
    } 

};
