var roleRefueller = 
{
    run: function(creep) 
	{
	    //---- Ручное управление --------------//
        //creep.memory.workerMode = -1;
        //---- Проверка режима ----------------//
        //console.log(creep.memory.workerMode);
        //-------------------------------------//
	    
	    //---- При спавне переход к режиму -1 (подбор ресурса прошлого крипа) ----//
	    if(creep.spawning)
        {
            creep.memory.workerMode = -1;
        }
        
        //---- При приблежении смерти переход к режиму 4 (подготовка к смерти на определенной координате) ----//
        if(creep.ticksToLive < 25)
        {
            creep.memory.workerMode = 4;
        }
        
        //---- Переключатель режимов ----//
        switch(creep.memory.workerMode)
		{
            case -1: //Поиск могилы предыдущего крипа для изъятия ресурсов
                var findTombstones = creep.room.find(FIND_TOMBSTONES, {filter: (i) => i.store[RESOURCE_ENERGY] > 0});
                if (findTombstones != '')
                {
                    findTombstones.forEach(tombstone =>  
                    {
                        if((tombstone.creep.name == 'Refueller1') || (tombstone.creep.name == 'Refueller2') || (tombstone.creep.name == 'Builder1'))
                        {
                            if(creep.withdraw(tombstone, RESOURCE_ENERGY) ==ERR_NOT_IN_RANGE) 
                            {
                                creep.moveTo(tombstone, {visualizePathStyle: {stroke: '#ffaa00'}});
                                creep.say('⚰️');
                            }
                            else
                            {
                                creep.memory.workerMode = 0;
                            }
                        }
                        else
                        {
                            creep.memory.workerMode = 0;
                        }
                        
                    })
                }
                else
                {
                    creep.memory.workerMode = 0;
                }
            break;
            
			case 0: //Добыча ресурсов
				if(creep.carry.energy < creep.carryCapacity)
				{
				    //Добыча из источника по id
                    creep.memory.sourceId = '5bbcadd39099fc012e637efb';
                    var source = Game.getObjectById(creep.memory.sourceId);
                    if(creep.harvest(source) == ERR_NOT_IN_RANGE) 
                    {
                        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                        creep.say('⛏️');
                    }
				}
				else
				{
					creep.memory.workerMode = 1;
				}
			break;
		
			case 1: //Зарядка строений
				if(creep.carry.energy > 0)
				{
					var targets = creep.pos.findClosestByRange(FIND_STRUCTURES,{filter: (structure) => {return (//structure.structureType == STRUCTURE_TOWER||
                                                                                                                structure.structureType == STRUCTURE_EXTENSION||
                                                                                                                structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;}});
					if(targets)
					{
						if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
						{
							creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
							creep.say('⚡');
						}
					}
					else
					{
						creep.memory.workerMode = 2;
					}
				}
				else
				{
					creep.memory.workerMode = -1;
				}
			break;
			
			case 2: //Зарядка башни
				if(creep.carry.energy > 0)
				{
					var targetTower2 = Game.getObjectById('5bf6d65653e439726ea18374');
					if(targetTower2.energy < targetTower2.energyCapacity)
					{
						if(creep.transfer(targetTower2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
						{
							creep.moveTo(targetTower2, {visualizePathStyle: {stroke: '#ffffff'}});
							creep.say('⚡');
						}
						if(creep.transfer(targetTower2, RESOURCE_ENERGY) == ERR_FULL)
						{
							creep.memory.workerMode = 3;
						}
					}
					else
					{
						creep.memory.workerMode = 3;
					}
				}
				else
				{
					creep.memory.workerMode = -1;
				}
		    break;
			
			case 3: //Улучшение контроллера
				if(creep.carry.energy > 0)
				{
					if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) 
					{
						creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
						creep.say('⚙️');
					}
				}
				else
				{
					creep.memory.workerMode = -1;
				}
			break;
				
			case 4: //Режим подготовки к смерти
			    creep.moveTo(39,19)
			    creep.say('Im done☠️️');
	        break;
		}
	}
}
module.exports = roleRefueller;
