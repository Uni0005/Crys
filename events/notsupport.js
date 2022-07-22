const cfg = require("../cfg.json")

module.exports = {
	name: "messageCreate", 
	once: false, 
	async execute (client, message) {
		if (!message.content.startsWith("+notsupport")) return; 
		
		//russian
		if(message.guild.id == cfg.ruserver){
			message.channel.send("**ДАННЫЙ ЧАТ НЕ ДЛЯ ПОДДЕРЖКИ.** Вы можете получить поддержку *только* в <#962263127871877126>.")
		} else if(message.channel.parent.id == "981140684721492119"){
			//Bahasa Indonesia
			message.channel.send("**CHANNEL INI BUKAN UNTUK BANTUAN**. Kalian hanya bisa mendapatkan bantuan di channel bantuan. <#756396600972017734>, <#724163890803638277>, <#816675053671284736> atau <#981141666851348530>")
		} else if(message.channel.parent.id == "981143449803833364"){
			//Espanol
			message.channel.send("** ESTE CANAL NO ES DE SOPORTE**. Puedes tener soporte solo en los canales de soporte. <#981148657715929128> <#724163890803638277> <#756396600972017734> <#816675053671284736>")
		} else if(message.channel.parent.id == "981146932279910430"){
			//Portuguese
			message.channel.send("**ESTE CANAL NÃO É PARA SUPORTE.** Só podes pedir suporte nos canais de suporte. <#756396600972017734>, <#724163890803638277>, <#816675053671284736>, <#981148685230559282>")
		} else if(message.guild.id == cfg.enserver){
       		//English
          	message.channel.send("**THIS CHANNEL IS NOT FOR SUPPORT.** You can get support only in the support channels. <#756396600972017734>, <#724163890803638277>, <#816675053671284736> or language chats")
       	}
	}
}