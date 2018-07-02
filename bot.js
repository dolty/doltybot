const Discord = require('discord.js');
const bot = new Discord.Client();
const weather = require('weather-js');

bot.on('Dolty hazir!', () => {
  console.log(`Dolty Aktif! ${bot.user.tag}!`);
  bot.user.setGame("&help | Hii!!");
});



const PREFİX = "&";

bot.on('message', message => {
   let msg = message.content.toUpperCase();
   let sender = message.author;
   let cont = message.content.slice(PREFİX.length).split(" ");
   let args = cont.slice(1);



    if(message.author.bot) return;
    if(!message.content.startsWith(PREFİX)) return;

  if (message.content.startsWith(PREFİX + 'montaj')) {
    message.channel.sendMessage(':ballot_box_with_check: ' + 'https://ahmethocafanclub.weebly.com/montajlar.html');
  }

  if (message.content.startsWith(PREFİX + 'gifler')) {
    message.channel.sendMessage('https://ahmethocafanclub.weebly.com/uploads/1/1/8/3/118390772/ahmetteachergif.gif');
  }
   
   //havadurumu-weather system.
   if (message.content.startsWith(PREFİX + 'weather?')) {
             
       weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result){
            
           if(err) message.channel.send(err);

           if(result === undefined|| result.length === 0){
                message.channel.send('*(MacCroyyBot) *Lütfen bir yer girin.*')
                 return;
           }

          
           
       

           
       
            
           var current = result[0].current;
           var location = result[0].location;

           const embed = new Discord.RichEmbed()
               .setDescription(`**${current.skytext}**`)
               .setAuthor(`Ülke - Şehir ${current.observationpoint}`)
               .setThumbnail(current.imageUrl)
               .setColor(0x00AE86)
               .addField('Zaman Dilimi', `UTC${location.timezone}`, true)
               .addField('Sıcaklık',location.degreetype, true)
               .addField('Hava Durumu', `${current.temperature} Degrees`, true)
               .addField('Hava Nasıl' , `${current.feelslike} Degrees`, true)
               .addField('Winds',current.winddisplay, true)
               .addField('Humidity', `${current.humidity}%`, true)

               message.channel.send({embed});


       });

  }


  if (message.content.startsWith(PREFİX + 'help')) {
    message.channel.sendMessage(' Komutlar: &montaj  &clearchat, &weather?, &gifler');
  }

  if (message.content.startsWith(PREFİX + 'clearchat')) {
   
     async function clear() {
           message.delete();

           if(isNaN(args[0])) {
              message.channel.send('Örnek: ' + PREFİX+'clearchat ' + 'ne kadar mesaj sileceğin');
              return;
           }

           const bekleme = await message.channel.fetchMessages({limit: [args]});

           console.log(bekleme.size + 'deleting.. bekleyin, mesajlar, siliniyor..');

           message.channel.bulkDelete(bekleme)
               .catch(error => message.channel.send('Hata: ${error}'));

     }

      clear();   //mesajları temizleme kodu.
      

  }


  
  

});





bot.login(process.env.BOT_TOKEN);
