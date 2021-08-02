const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!';

client.on('message', function (message) {
	if (message.author.bot || !message.content.startsWith(prefix)) {
		return;
	}

	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();

	switch (command) {
		case 'register':
			HandleRegister(message);
			break;
	}
});

async function HandleRegister(message) {
	const user = await client.users.fetch(message.author.id).catch(() => null);

	if (!user) {
		return message.channel.send('User not found :(');
	}

	await user.send('Hello.').catch(() => {
		message.channel.send('User has DMs closed or has no mutual servers with the bot :(');
		return;
	});
	let username;
	await user.send('To register please send me an username you would like to use!');
	const filter = () => message.content.includes('');
	await message.channel
		.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
		.then((msgs) => {
			const collectedMessage = msgs.first();
			collectedMessage.react('✅');
			username = collectedMessage.content;
		})
		.catch(async () => {
			await user.send('You took too long.');
			return;
		});
	if (!username) {
		return;
	}
	await user.send(`Ok, username "${username}"`);
}

module.exports = client;
