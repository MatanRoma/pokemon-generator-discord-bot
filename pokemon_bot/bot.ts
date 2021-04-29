import { Client, Message } from 'discord.js';
import axios from 'axios';
require('dotenv').config();

const bot: Client = new Client();
bot.on('ready', () => console.log('heyyy'));

const pokemonApiAdress: string = 'https://pokeapi.co/api/v2/pokemon/';

bot.on('message', async (message: Message) => {
  if (message.author.bot) return;
  const { content: messageText }: { content: string } = message;
  if (!messageText.startsWith('!')) return;
  const pokemonName = messageText.slice(1);
  try {
    const { data } = await axios.get(`${pokemonApiAdress}${pokemonName}`);
    const { front_default: pokemonImageUrl } = data.sprites.other['official-artwork'];
    message.channel.send(pokemonImageUrl);
  } catch (ex) {
    message.channel.send(`Pokemon name ${pokemonName} could not be found.`);
  }
});

bot.login(process.env.BOT_TOKEN);
