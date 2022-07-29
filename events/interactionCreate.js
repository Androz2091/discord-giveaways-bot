module.exports = (client, interaction) => {

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return void interaction.reply({
        content: `Command \`${interaction.commandName}\` not found.`,
        ephemeral: true
    });
  
    command.run(client, interaction);
};