const cfg = require("../cfg.json")

module.exports = {
	name: "messageCreate", 
	once: false, 
	async execute (client, message) {
		if (!message.content.startsWith("+support")) return; 
		
		if(message.channel.parent.id == "981140684721492119"){
      		message.channel.send("**Kepemilikan Minecraft Java adalah persyaratan untuk mendapatkan bantuan**. Verifikasi kepemilikan game di <#952456986946052166> untuk mendapatkan akses ke <#824307242533781514> dan dukungan/bantuan")
    	} else if(message.channel.id == '966560230399954964'){
          	//filipino
        	message.channel.send("**Ang pagmamay-ari ng Minecraft: Java Edition ay kailangan upang makakuha ng suporta/tulong.** Patanuyan na pagmamay-ari mo ang laro sa <#952456986946052166> upang mabawi ang access sa <#824307242533781514> at suporta/tulong.")
     	} else if(message.channel.id == "966562285369843712"){
        	//french
           message.channel.send("**Vous devez avoir acheté Minecraft Java pour obtenir du support.** Vérifiez vous dans la canal dédié <#952456986946052166> pour récupérer l'accès à <#824307242533781514>")
      	} else if(message.channel.id == "966559343438868490"){
        	//polski
          	message.channel.send("**Ownership of Minecraft Java Edition is requirement to get support/help. **Verify ownership of the game in the <#952456986946052166> to regain access to <#824307242533781514> and support/help.")
     	} else if(message.channel.parent.id == "981146932279910430"){
       		//portuguese
           message.channel.send("**Posse do Minecraft: Java Edition é um requerimento para ter acesso a suporte/ajuda. ** Verifica a tua posse do jogo em <#952456986946052166>para recuperar acesso a <#824307242533781514>  e suporte/ajuda.")
      	} else if(message.channel.id == "966561583411105792"){
       		//cs
      		message.channel.send("**Vlastnictví Minecraftu Java edice je vyžadóváno abys získal podporu/pomoc.** Ověřiv vlastnictví hry v <#952456986946052166>, znovuzískáš přístup do <#824307242533781514> a podpory/pomoci.")
    	} else if(message.channel.id == "966562677000392724"){
       		//chinese
           message.channel.send("**我們只為擁有Minecraft: Java Edition的玩家們提供協助。** 請先在 <#952456986946052166> 頻道裡照著步驟進行驗證，才能獲得我們在launcher方面的協助，以及重新取得瀏覽 <#824307242533781514> 頻道的權限。")
    	} else if(message.guild.id == cfg.ruserver){
       		//Russian
           message.channel.send("**Владение лицензией игры - это обязательный пункт для получения поддержки.** Подтвердите владение лицензией в <#962295903136387143>, чтобы получить доступ к <#962263127871877126>.")
     	} else if(message.channel.parent.id == "981143449803833364"){
       		//Spanish
           message.channel.send("**Se requiere una cuenta de Minecraft Java edition para tener soporte o ayuda.** Verifica tu cuenta de Minecraft para acceder a <#824307242533781514> y soporte/ayuda")
      	} else if(message.guild.id == cfg.enserver){
      		//English
           message.channel.send("**Ownership of Minecraft Java Edition is requirement to get support/help.** Verify ownership of the game in the <#952456986946052166> to regain access to <#824307242533781514> and support/help.")
     	}
	}
}