module.exports = {
	name: "messageCreate", 
	once: false, 
	async execute (client, message) {
       	if(message.guild.id !== "724163890803638273") return;
		if(!message.member.permissions.has("MANAGE_MESSAGES", true) || message.author.bot) return;
		if(!message.content.startsWith('*ver') && !message.content.startsWith('*pir')) return;
		let member = await message.mentions.members.first();
		const reply = await message.mentions.repliedUser;
		if(!reply && !member) return;
		if(reply) member = await message.guild.members.fetch(reply.id);
		if(message.content.startsWith("*ver")){
			member.roles.add("951536554856312874");
           member.roles.remove("952235601397161994");
		} else if(message.content.startsWith('*pir')) member.roles.add("952235601397161994");
		message.react('<:allowed:995372622751740084>');
	}
}