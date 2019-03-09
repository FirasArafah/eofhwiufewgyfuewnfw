const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setGame("#Pure.","https://www.twitch.tv/idk");
});
client.on('guildMemberAdd', member => {

    const channel = member.guild.channels.find('name', 'chat');
  
    const millis = new Date().getTime() - member.user.createdAt.getTime();
    const now = new Date();
    const createdAt = millis / 1000 / 60 / 60 / 24;




  
    const embed = new Discord.RichEmbed()
    
    .setColor("black")
    .setDescription(`**تاريخ دخولك للدسكورد منذ ${createdAt.toFixed(0)} يوم**`)
    .setAuthor(member.user.tag, member.user.avatarURL);
    channel.sendEmbed(embed);

  
});



    client.on('message',message =>{
         var prefix = "#";
    if(message.content.split(' ')[0].toLowerCase() == prefix + 'myinv') {
   let guild = message.guild
   var codes = [""]
    var nul = 0
         
   guild.fetchInvites()
   .then(invites => {
   invites.forEach(invite => {
   if (invite.inviter === message.author) {
       nul+=invite.uses
   codes.push(`discord.gg/${invite.code}`)
   }
   
   })
     if (nul > 0) {
         const e = new Discord.RichEmbed()
         .addField(`${message.author.username}`, `لقد قمت بدعوة **${nul}** شخص`)
         .setColor('#36393e')
         message.author.send(e).then(() => {
      }).catch(() => {
      });
     }else {
   var embed = new Discord.RichEmbed()
    .setColor("#36393e")
    .addField(`${message.author.username}`, `لم تقم بدعوة أي شخص لهذا السيرفر`)
   message.author.send({ embed: embed }).then(() => {
}).catch(() => {
});
    return;
}
   }).then(m => {
   if (codes.length < 0) {
       var embed = new Discord.RichEmbed()
   .setColor("#36393e")
   .addField(`Your invite codes in ${message.guild.name}`, `You currently don\'t have any active invites! Please create an invite and start inviting, then you will be able to see your codes here!`)
  message.author.send({ embed: embed }).then(() => {
   message.channel.send('**Successfully sent the message! :white_check_mark: **');
}).catch(() => {
   message.channel.send('**The user have dms disabled** :x:')
});
  return;
  } else {
      var embed = new Discord.RichEmbed()
  .addField(`Your invite codes in ${message.guild.name}`, `Invite Codes :\n${codes.join("\n")}`)
  .setColor('#36393e')
  message.author.send({ embed: embed }).then(() => {
   message.channel.send('**Successfully sent the message! :white_check_mark: **');
}).catch(() => {
   message.channel.send('**The user have dms disabled** :x:')
});
  return;
  }
 })
 }
 
});


client.login(process.env.BOT_TOKEN);
