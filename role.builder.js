var roleBuilder = 
{
    run: function(creep) 
    {
        //---- Ручное управление --------------//
        //creep.memory.workerMode = -1;
        //---- Проверка режима ----------------//
        //console.log(creep.memory.workerMode);
        //-------------------------------------//
        
        //----- При спавне переход в режим 0 (добыча ресурсов) ----//
        if(creep.spawning)
        {
            creep.memory.workerMode = 0;
        }
        
        //---- Переключатель режимов ----//
        switch(creep.memory.workerMode)
        {
            case 0: //Добыча ресурсов
                if(creep.carry.energy < creep.carryCapacity)
				{
				    //---- Добыча из ближайшего активного источника ----//
					var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
					//creep.memory.sourceId =source.id;
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
            
            case 1: //Строительство
                if(creep.carry.energy > 0)
				{
					var targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
					/**
					if(targets != '')
					{**/
					    /**if(targets.length) **/ if(targets)
					    {
						    if(creep.build(targets) == ERR_NOT_IN_RANGE) 
						    {
							    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
							    creep.say('🛠️');
						    }
					    }
					//}
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
            
            case 2: //Зарядка Storage
				if(creep.carry.energy > 0)
				{
					var targetStorage = creep.room.storage;
					
					if( (RESOURCE_ENERGY in targetStorage.store) < 50000 )
					{
						if(creep.transfer(targetStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
						{
							creep.moveTo(targetStorage, {visualizePathStyle: {stroke: '#ffffff'}});
							creep.say('⚡');
						}
					}
					else
					{
						creep.memory.workerMode = 3;
					}
				}
				else
				{
					creep.memory.workerMode = 0;
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
					creep.memory.workerMode = 0;
				}
            break;
        }
	}
};
module.exports = roleBuilder;
