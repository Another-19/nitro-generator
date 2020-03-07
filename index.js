const fs = require("fs");
const child = require("child_process");
const sleep = require('system-sleep');
const express = require("express");
const request = require("request");

const Discord = require('discord.js');

const client = new Discord.Client({disableEveryone: true});

const nutrologs = "650521945514704919";
const validnutrolog = "650521945514704919";

var app = express();

app.get("/", function(request, resend) {
  resend.send("Nitro Generator v1.0.3");
});

app.listen(4444, function() {
});

function ping() {
    try {
        request("https://nutro-gen.anotherguy19.repl.co", function(err, res, body) {
        })
    } catch(e) {
        console.log(e);
    }
  setTimeout(ping, 10000);
}

ping();

function makecode(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function trycodes(many) {
  for(i = 0; i < many; i++) {
    checkcode(makecode(24));
  }
}

function checkcode(nc) {
  code = child.execSync(`curl https://discordapp.com/api/v6/entitlements/gift-codes/${nc}?with_application=true&with_subscription_plan=true`).toString();
  validorno = JSON.parse(code);
  if (validorno.message && validorno.code) {
    let GiftEmbed = new Discord.RichEmbed()
    .setAuthor("Failed - Unknown Gift Code")
    .setColor("#" + (Math.random()*0xFFFFFF<<0).toString(16))
    .setDescription(`**[**:x:**]** [${nc}](https://discord.gift/${nc}) is a unknown gift code!`)
    .setFooter(`⚙️ v${Discord.version}`)
    .setTimestamp()
    client.channels.get(nutrolog).send(GiftEmbed)
  } else if(!validorno.retry_after){
    client.channels.get(validnutrolog).send("Succses?? message recieved from the api: ```json\n"+JSON.stringify(validorno)+"```");
    fs.appendFileSync("./working.txt", `${JSON.stringify(validorno)}`); 
  } else if (validorno.retry_after) {
    let RateEmbed = new Discord.RichEmbed()
    .setAuthor("Failed - Rate Limited")
    .setColor("#" + (Math.random()*0xFFFFFF<<0).toString(16))
    .setDescription(`**[**:x:**]** Rate-limited while checking [${nc}](https://discord.gift/${nc}) on the website!`)
    .setFooter(`🎉 https://discord.gift/${nc} • ⚙️ v${Discord.version}`)
    .setTimestamp()
    client.channels.get(nutrolog).send(RateEmbed)
    return sleep(parseInt(validorno.retry_after) - parseInt(validorno.retry_after) / 2);
  }
}

client.on('message', message => {
	let msg = message.content.toString();
    let cmd = msg.split('')[0];
	  if(cmd == "#") {
        let input = msg.slice(cmd.length).trim();
		    if (message.author.id == "137790212808900609") {
		      try {
			      message.channel.send("```js\n> " + eval(input)+ "```") 
		      } catch (e) { 
		    	  message.channel.send("```js\n> " + e + "```")
		      }
	      }
	  } 
});

client.login(process.env.token);