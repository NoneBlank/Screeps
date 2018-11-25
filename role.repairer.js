var roleRepairer = 
{
    run: function(creep) 
    {
        //---- Ручное управление --------------//
        //creep.memory.workerMode = -1;
        //---- Проверка режима ----------------//
        //console.log(creep.memory.workerMode);
        //-------------------------------------//
        
        //---- При спавне переход в режим 0 (добыча ресурсов) ----//
        if(creep.spawning)
        {
            creep.memory.workerMode = 0;
        }
        
        //---- Уведомление о приближении смерти ----//
        if(creep.ticksToLive < 10)
        {
            creep.say('Im done☠️️');
        }
        
        //---- Переключатель режимов ----//
        switch(creep.memory.workerMode)
        {
            case 0: //Добыча ресурсов
                if(creep.carry.energy < creep.carryCapacity)
				{
					//---- Добыча из ближайшего активного источника ----//
                    var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
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
            
            case 1: //Ремонт дорог
                if(creep.carry.energy > 0)
				{
                    var roadToRepair = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_ROAD) && (structure.hits < structure.hitsMax);}});
                    if(roadToRepair)
                    {
                        if (creep.repair(roadToRepair) == ERR_NOT_IN_RANGE)
                        {
                            creep.moveTo(roadToRepair, {visualizePathStyle: {stroke: '#ffffff'}});
                            creep.say('🔧');
                        }
                    }
                    else
                    {
                    creep.memory.workerMode = 2;
                    }
				}
                
				else
				{
					creep.memory.workerMode = 0;
				}
            break;
            
            case 2: //Ремонт стен
                if(creep.carry.energy > 0)
				{
                    var wallToRepair = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_WALL ||
                                                                                                                        structure.structureType == STRUCTURE_RAMPART) && (structure.hits < 2000000);}});
                    if(wallToRepair)
                    {
                        if (creep.repair(wallToRepair) == ERR_NOT_IN_RANGE)
                        {
                            creep.moveTo(wallToRepair, {visualizePathStyle: {stroke: '#ffffff'}});
                            creep.say('🔧');
                        }
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
            break;
        }
	}
};
module.exports = roleRepairer;
