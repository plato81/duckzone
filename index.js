// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Duck Zone - coded by nolan#0002`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Developed by nolan. Playing ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {
  
  if(message.author.bot) return;
  
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  
  if(command === "ping") {
    const m = await message.channel.send("huh lol?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
  if(command === "diar32") {
    const diarMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    for (i = 0; i < 50; i++) { 
    message.channel.send("@everyone "+ diarMessage);
    }
  }
  
  if(command === "kick") {
    
    if(!message.member.roles.some(r=>["Bot perms"
    , ":cat:‍:computer:ℂ𝕠𝕕𝕖𝕣:cat:‍:computer:"].includes(r.name)) )
      return message.reply("You don't have permissions to use this! Is this in error? Contact the developer nolan#0002");
    

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("Unable to kick user "+member.user.tag +", do they have a higher role?");
    

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {
  
    if(!message.member.roles.some(r=>["Bot perms"].includes(r.name)) )
      return message.reply("You don't have permissions to use this! Is this in error? Contact the developer @nolan#0002");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("Unable to kick user "+member.user.tag +", do they have a higher role?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  if(command === "warn") {

    if(!message.member.roles.some(r=>["Bot perms"].includes(r.name)) )
      return message.reply("You don't have permissions to use this! Is this in error? Contact the developer @nolan#0002");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("Unable to warn user "+member.user.tag +", do they have a higher role?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
message.channel.sendMessage(member.user.tag+ " has been warned for "+reason)   
  }
  if(command === "purge") {
    
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
  if(command == "donate") {

    message.channel.sendMessage("Thank you for considering donating! This bot is fully custom for the server Duck Zone. I made this for free. If you would like to donate, DM nolan#0002")
  }

  if(command == "about") {
    message.channel.sendMessage("This bot was made fully custom for Duck Zone by nolan#0002. If you want a custom bot, DM him.");
  }
  if(command == "help") {
    message.channel.sendMessage("If you need help, DM a online Moderator. You can find online staff on the sidebar. Roles that are mods: Duck Gods, Coder, Owner, Co-Owner.")
  }
  if(command == "dynosucks") {
    message.channel.sendMessage("true, stating fax");
  }
  if(command == "badbot") {
    message.channel.sendMessage("U sure u dont mean dyno?");
  }
  });

//login
client.login(process.env.BOT_TOKEN);
