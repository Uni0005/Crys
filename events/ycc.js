module.exports = {
	name: "messageCreate", 
	once: false, 
	async execute (client, message) {
		if(message.author.bot) return;
		if (message.channel.id !== "962005770227028018") return
		if(message.attachments.size || message.member.permissions.has("MANAGE_MESSAGES", true)) return; 
		
		
		message.member.send("Sorry, but <#962005770227028018> isn't for offtopic. If you want to comment on someone's control, create a thread and do it there").catch(async err => {
       		message.channel.send(`${message.author} sorry, but <#962005770227028018> isn't for offtopic. If you want to comment on someone's control, create a thread and do it there`);
     	})
       	message.delete(); 
	}
}