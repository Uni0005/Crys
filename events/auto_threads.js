module.exports = {
	name: "messageCreate", 
	once: false, 
	async execute (client, message) {
		if(message.channel.id !== "962263127871877126") return;
		if (message.system || message.author.bot) return;

   		//if(message.member.permissions.has("MANAGE_MESSAGES", true)) return;

   		const thread = await message.startThread({
			name: `[${message.member.displayName}] - Поддержка`
		})

 		if (message.member.roles.cache.find(role => role.id == "962297433918935070")){
			thread.send({content: `Привет, ${message.author}! Я вижу тебе нужна помощь. Постарайся максимально подробно описать свою проблему, чтобы наши помощники могли быстрее помочь тебе с ней.\Также отправь **latestlog.txt ** ** (Если не знаешь, что это - используй команду __+latestlog__)* и скриншот, если необходимо.\nПосле того, как ты все это сделаешь, просто подожди, пока кто-нибудь тебе ответит`})
		} else {
			thread.send({content: `Привет, ${message.author}! Похоже ты тут новенький, ведь я не нашёл у тебя роль <@&962297433918935070>. Пройди проверку в <#962295903136387143>, потому что **Владение Minecraft Java Edition является обязательным условием для получения поддержки / помощи.**`, allowedMentions: {parse: ["users"]} })
    }
  }
}