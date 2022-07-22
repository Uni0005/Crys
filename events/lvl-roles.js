const cfg = require("../cfg.json");
const Levels = require("discord-xp");
Levels.setURL(cfg.mongo_uri);

module.exports = {
	name: "messageCreate", 
	once: false, 
	async execute (client, message) {
        if (!message.guild) return;
        if (message.author.bot) return;

        if(message.guild.id !== cfg.ruserver && message.guild.id !== cfg.enserver) return;
        const user = await Levels.fetch(message.author.id, message.guild.id);
        const member = await message.guild.members.fetch(message.author.id).catch(() => null);

        if(!member) return;

	    let copperminerid = "970405954581569586"; 
	    let ironminerid = "970405915998191636";
	    let lapisminerid = "977830942834053180";
        let goldminerid = "970405861879066624";
        let redstoneminerid = "977831019388502096";
        let diamondminerid = "970405032426078291";
        let emeraldminerid = "970404633317113966"; 
        let netheriteminerid = "977831145746092042"; 

        //ru server
        if(message.guild.id == cfg.ruserver){
            copperminerid = "965965294508060732", 
            ironminerid = "965638425548034128", 
            lapisminerid = "977837822226612255", 
            goldminerid = "965962026704855090", 
            redstoneminerid = "977837728110612542", 
            diamondminerid = "965961801990811689", 
            emeraldminerid = "970285707388149814", 
            netheriteminerid = "977837953135046696"
        }
        
        //copper miner
        if(user.level >= 7 && user.level < 15){
            if(message.member.roles.cache.has(copperminerid)) return;

            member.roles.add(copperminerid)
        };
        //iron miner
        if(user.level >= 15 && user.level < 28){
            if(message.member.roles.cache.has(ironminerid)) return;

            member.roles.remove(copperminerid)
            member.roles.add(ironminerid)
        }; 
        
        //Lapis miner
        if(user.level >= 28 && user.level < 53){
            if(message.member.roles.cache.has(lapisminerid)) return;

            member.roles.remove([ironminerid, copperminerid]);
            member.roles.add(lapisminerid);
        }; 
        
        //gold miner
        if(user.level >= 53 && user.level < 69){
            if(message.member.roles.cache.has(goldminerid)) return;

            member.roles.remove([copperminerid, ironminerid, lapisminerid])
            member.roles.add(goldminerid)
        };
        
        //redstone miner
        if(user.level >= 69 && user.level < 75){
            if(message.member.roles.cache.has(redstoneminerid)) return;

            member.roles.remove([copperminerid, ironminerid, goldminerid, lapisminerid])
            member.roles.add(redstoneminerid)
        };

        //diamond miner
        if(user.level >= 75 && user.level < 89){
            if(message.member.roles.cache.has(diamondminerid)) return;

            member.roles.remove([copperminerid, ironminerid, goldminerid, lapisminerid, redstoneminerid]);
            member.roles.add(diamondminerid)
        };

        //Emerald id
        if(user.level >= 89 && user.level < 110){
            if(message.member.roles.cache.has(emeraldminerid)) return;

            member.roles.remove([copperminerid, ironminerid, goldminerid, lapisminerid, redstoneminerid, diamondminerid]);
            member.roles.add(emeraldminerid);
        }; 
        
        //netherite miner
        if(user.level >= 110){
            if(message.member.roles.cache.has(netheriteminerid)) return;

            member.roles.remove([copperminerid, ironminerid, goldminerid, lapisminerid, redstoneminerid, diamondminerid, emeraldminerid]);
            member.roles.add(netheriteminerid)
        }; 
    }
}