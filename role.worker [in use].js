var roleWorker = 
{
    run: function(creep)
    {
        //---- Ручное управление --------------//
        //creep.memory.workerMode = -1;
        //---- Проверка режима ----------------//
        //console.log(creep.memory.workerMode);
        //-------------------------------------//
        //console.log();
        //-------------------------------------//
        
        const totalCarry = _.sum(creep.carry);
        
        //---- При спавне переход в режим 0 (добыча ресурсов) ----//
        if(creep.spawning)
        {
            creep.memory.workerMode = -1;
        }
        
        //---- Проверка наличия упавших ресурсов ----//
        /**
        if(totalCarry == creep.carryCapacity)
        {
            if(creep.memory.workerMode != 10 && creep.memory.workerMode != 4)
            {
                const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                if(target)
                {
                    creep.memory.workerMode = 10;
                }
                else
                {
                    creep.memory.workerMode = -1;
                }
            }
        }
        else
        {
            creep.memory.workerMode = 5;
        }
        **/
        
        //---- Проверка времени жизни крипа ----//
        if(creep.ticksToLive < 10)
        {
            creep.say('Im done☠️️');
        }
        
        //---- Переключатель режимов ----//
        switch(creep.memory.workerMode)
		{
	        case -1: //- Поиск могилы крипа для изъятия ресурсов --------------------------------------------------------------------
	            var findTombstones = creep.room.find(FIND_TOMBSTONES, {filter: (i) =>   (i.store[RESOURCE_ENERGY] > 0) || 
	                                                                                    (i.store[RESOURCE_UTRIUM_HYDRIDE] > 0) ||
	                                                                                    (i.store[RESOURCE_KEANIUM_OXIDE] > 0) ||
	                                                                                    (i.store[RESOURCE_ZYNTHIUM_HYDRIDE] > 0) || 
	                                                                                    (i.store[RESOURCE_GHODIUM_OXIDE] > 0) });
                if (findTombstones != '')
                {
	                findTombstones.forEach(tombstone => 
                    {
                        if(tombstone.creep.my) //Если крип свой
                        {
                            if((tombstone.creep.name == 'Worker1') || (tombstone.creep.name == 'Worker2'))
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
                        }
                        else //Если крип чужой
                        {
                            for(var resourceType in tombstone.store)
                            {
                                switch(resourceType)
                                {
                                    case RESOURCE_GHODIUM_OXIDE:
                                        if(creep.withdraw(tombstone, RESOURCE_GHODIUM_OXIDE) == ERR_NOT_IN_RANGE) 
                                        {
                                            creep.moveTo(tombstone, {visualizePathStyle: {stroke: '#ffaa00'}});
                                            creep.say('⚰️');
                                        }
                                        else
                                        {
                                            if(totalCarry == creep.carryCapacity)
                                            {
                                                creep.memory.workerMode = 5;
                                            }
                                        }
                                    break;
                                    
                                    case RESOURCE_ZYNTHIUM_HYDRIDE:
                                        if(creep.withdraw(tombstone, RESOURCE_ZYNTHIUM_HYDRIDE) == ERR_NOT_IN_RANGE)
                                        {
                                            creep.moveTo(tombstone,{visualizePathStyle: {stroke: '#ffaa00'}});
                                            creep.say('⚰️');
                                        }
                                        else
                                        {
                                            if(totalCarry == creep.carryCapacity)
                                            {
                                                creep.memory.workerMode = 5;
                                            }
                                        }
                                    break;
                                    
                                    case RESOURCE_KEANIUM_OXIDE:
                                        if(creep.withdraw(tombstone, RESOURCE_KEANIUM_OXIDE) == ERR_NOT_IN_RANGE)
                                        {
                                            creep.moveTo(tombstone,{visualizePathStyle: {stroke: '#ffaa00'}});
                                            creep.say('⚰️');
                                        }
                                        else
                                        {
                                            if(totalCarry == creep.carryCapacity)
                                            {
                                                creep.memory.workerMode = 5;
                                            }
                                        }
                                    break;
                                    
                                    case RESOURCE_UTRIUM_HYDRIDE:
                                        if(creep.withdraw(tombstone, RESOURCE_UTRIUM_HYDRIDE) == ERR_NOT_IN_RANGE)
                                        {
                                            creep.moveTo(tombstone,{visualizePathStyle: {stroke: '#ffaa00'}});
                                            creep.say('⚰️');
                                        }
                                        else
                                        {
                                            if(totalCarry == creep.carryCapacity)
                                            {
                                                creep.memory.workerMode = 5;
                                            }
                                        }
                                    break;
                                    
                                    case RESOURCE_ENERGY:
                                        if(creep.withdraw(tombstone, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                                        {
                                            creep.moveTo(tombstone,{visualizePathStyle: {stroke: '#ffaa00'}});
                                            creep.say('⚰️');
                                        }
                                        else
                                        {
                                            if(totalCarry == creep.carryCapacity)
                                            {
                                                creep.memory.workerMode = 5;
                                            }
                                        }
                                    break;
                                    
                                    default:
                                        if(totalCarry > 0)
                                        {
                                            creep.memory.workerMode = 5;
                                        }
                                        else
                                        {
                                            creep.memory.workerMode = 0;
                                        }
                                    break;
                                }
                            }
                        }
                    })
                }
                else
                {
                    creep.memory.workerMode = 0;
                }
	        break;
		    
			case 0: //- Добыча ресурсов --------------------------------------------------------------------------------------------
				if(totalCarry < creep.carryCapacity)
				{
					//---- Добыча из источника по id ----//
                    creep.memory.sourceId = '5bbcadd39099fc012e637efa';
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
		
			case 1: //- Зарядка башни -----------------------------------------------------------------------------------------------
				if(totalCarry > 0)
				{
					var targetTower1 = Game.getObjectById('5beef997c093d8686447a469');
                    if(targetTower1.energy < targetTower1.energyCapacity)
                    {
                        if(creep.transfer(targetTower1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                        {
                            creep.moveTo(targetTower1, {visualizePathStyle: {stroke: '#ffffff'}});
                            creep.say('⚡');
                        }
                        if(creep.transfer(targetTower1, RESOURCE_ENERGY) == ERR_FULL)
                        {
                            creep.memory.workerMode = 2;
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
		
			case 2: //- Строительство строений -------------------------------------------------------------------------------------
				if(totalCarry > 0)
				{
					var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
					
					//console.log(targets);
					if(targets != '')
					{
					    if(targets.length) 
					    {
						    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) 
						    {
							    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
							    creep.say('🛠️');
						    }
					    }
					}
					else
					{
						creep.memory.workerMode = 4;
					}
				}
				else
				{
					creep.memory.workerMode = -1;
				}
			break;
		
			case 3: //- Зарядка Storage -------------------------------------------------------------------------------------------
				if(totalCarry > 0)
				{
					var targetStorage = creep.room.storage;
					
					if( (RESOURCE_ENERGY in targetStorage.store) < 500000 )
					{
						if(creep.transfer(targetStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
						{
							creep.moveTo(targetStorage, {visualizePathStyle: {stroke: '#ffffff'}});
							creep.say('⚡');
						}
					}
				}
				else
				{
					creep.memory.workerMode = -1;
				}
			break;
			
			case 4: //- Улучшение контроллера -------------------------------------------------------------------------------------
				if(totalCarry > 0)
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
			
			case 5: //- Зарядка Storage ресурсами из вражеского крипа -------------------------------------------------------------
			    if(totalCarry > 0)
                {
					var targetStorage = creep.room.storage;
					for(var resourceType in creep.carry)
                    {
                        console.log(resourceType);
                        if(resourceType == RESOURCE_GHODIUM_OXIDE)
                        {
                            if(creep.transfer(targetStorage, RESOURCE_GHODIUM_OXIDE) == ERR_NOT_IN_RANGE)
                            {
                                creep.moveTo(targetStorage, {visualizePathStyle: {stroke: '#ffffff'}});
                                creep.say('⚡');
                            }
                            else
                            {
                                if(totalCarry == 0)
                                {
                                        creep.memory.workerMode = -1;
                                }
                            }
                        }
                            
                        if(resourceType == RESOURCE_ZYNTHIUM_HYDRIDE)
                        {
                            if(creep.transfer(targetStorage, RESOURCE_ZYNTHIUM_HYDRIDE) == ERR_NOT_IN_RANGE)
                            {
                                creep.moveTo(targetStorage, {visualizePathStyle: {stroke: '#ffffff'}});
                                creep.say('⚡');
                            }
                            else
                            {
                                if(totalCarry == 0)
                                {
                                    creep.memory.workerMode = -1;
                                }
                            }
                        }
                            
                        if(resourceType == RESOURCE_KEANIUM_OXIDE)
                        {
                            if(creep.transfer(targetStorage, RESOURCE_KEANIUM_OXIDE) == ERR_NOT_IN_RANGE)
                            {
                                creep.moveTo(targetStorage, {visualizePathStyle: {stroke: '#ffffff'}});
                                creep.say('⚡');
                            }
                            else
                            {
                                if(totalCarry == 0)
                                {
                                    creep.memory.workerMode = -1;
                                }
                            }
                        }
                            
                        if(resourceType == RESOURCE_UTRIUM_HYDRIDE)
                        {
                            if(creep.transfer(targetStorage, RESOURCE_UTRIUM_HYDRIDE) == ERR_NOT_IN_RANGE)
                            {
                                creep.moveTo(targetStorage, {visualizePathStyle: {stroke: '#ffffff'}});
                                creep.say('⚡');
                            }
                            else
                            {
                                if(totalCarry == 0)
                                {
                                    creep.memory.workerMode = -1;
                                }
                            }
		                }
                            
                        if(resourceType == RESOURCE_ENERGY)
                        {
                            if(creep.transfer(targetStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                            {
                                creep.moveTo(targetStorage, {visualizePathStyle: {stroke: '#ffffff'}});
                                creep.say('⚡');
                            }
                            else
                            {
                                if(totalCarry == 0)
                                {
                                    creep.memory.workerMode = -1;
                                }
                            }
                        }
                    }
				}
			    else
				{
					creep.memory.workerMode = -1;
				}
		    
            case 10: //- Сбор упавших ресурсов -----------------------------------------------------------------------------------
                if(totalCarry < creep.carryCapacity)
                {
                    const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                    if(target)
                    {
                        if(creep.pickup(target) == ERR_NOT_IN_RANGE) 
                        {
                            creep.moveTo(target);
                        }
                    }
                    else
                    {
                        creep.memory.workerMode = -1;
                    }
                }
                else
                {
                    creep.memory.workerMode = 4;
                }
            break;
		}
	}
}
module.exports = roleWorker;
