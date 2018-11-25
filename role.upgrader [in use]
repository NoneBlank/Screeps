var roleUpgrader = 
{
    run: function(creep) 
    {
        
        
        /** Включение режима добычи **/
        if(creep.memory.upgrading && creep.carry.energy == 0) 
        {
            creep.memory.upgrading = false;
	    }
	    
	    /** Включение режима улучшения контроллера **/
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) 
	    {
	        creep.memory.upgrading = true;
	    }

	    if(creep.memory.upgrading) //Режим улучшения
	    {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
	            creep.say('⚙️'); 
            }
        }
        else //Режим добычи
        {
            //Добыча из источника по id
            creep.memory.sourceId = '5bbcadd39099fc012e637efa';
            var source = Game.getObjectById(creep.memory.sourceId);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.say('⛏️');
            }
        }
	}
};
module.exports = roleUpgrader;
