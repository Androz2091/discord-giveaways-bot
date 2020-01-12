const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(':x: You need to have the manage messages permissions to reroll giveaways.');
    }

    // Giveaway message ID
    let messageID = args[0];
    // If no channel is mentionned
    if(!messageID){
        return message.channel.send(':x: You have to specify a valid message ID!');
    }

    try {
        // Reroll the giveaway
        client.giveawaysManager.reroll(messageID);
        // Success message
        message.channel.send('Giveaway rerolled!');
    } catch (error) {
        // If the giveaway isn't found
        if(error.startsWith(`No giveaway found with ID ${messageID}.`)){
            message.channel.send('Cannot find any giveaway for the message ID: '+messageID);
        }
        // If the giveaway is not ended
        if(err.startsWith(`Giveaway with message ID ${messageID} is not ended.`)){
            message.channel.send('This giveaway is not ended!');
        }
    }

};