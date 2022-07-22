module.exports = {
	name: "messageDelete", 
	once: false, 
	async execute (client, message) {
		if(message.channel.id !== "962263127871877126") return;
		if (message.system || message.author.bot) return;
		
		const thread = message.channel.threads.cache.get(message.id);
       	if (thread) await thread.delete()
	}
}