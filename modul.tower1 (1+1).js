var modulTower1 = 
{
    run: function(tower1) 
    {
        //---- Ручное управление ----//
        //console.log(Memory.tower1Mode);
        //Memory.tower1Mode = 0;
        //---------------------------//
	
        //---- При появлении врага ----//
        var closestHostile = tower1.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) 
        {
            Memory.tower1Mode = 0;
        }
        
        //---- Переключатель режимов ----//
        switch(Memory.tower1Mode)
        {
            case 0: //Режим атаки
                if(closestHostile) 
                {
                    tower1.attack(closestHostile);
                    var invaderUsername = closestHostile.owner.username;
                    Game.notify('User ', invaderUsername,' spotted in room "E15S29"');
                    console.log('ALERT!!!! WE ARE UNDER ATTACK!!!!! INVADER NAME: ', invaderUsername);
                }
                else 
                {
                    Memory.tower1Mode = 1;
                }
            break;
		
            case 1: //Будущий режим хила
				if(tower1.energy > (tower1.energyCapacity / 4))
				{
					Memory.tower1Mode = 2;
				}
            break;
		
            //---- Режим ремонта строений ----//
            case 2: //Режим ремонта ворот
                if(tower1.energy > (tower1.energyCapacity / 2))
                {
                    var damagedRamparts = tower1.pos.findInRange(FIND_STRUCTURES, 10, {filter: (structure) => {return (structure.structureType == STRUCTURE_RAMPART) && (structure.hits < 3000000);}});
                    if(damagedRamparts != '') 
                    {
		                for(var oneOfDamagedRamparts of damagedRamparts)
                        tower1.repair(oneOfDamagedRamparts);
                    }
			        else
			        {
				        Memory.tower1Mode = 3;
			        }
                }
                else
                {
                    Memory.tower1Mode = 3;
                }
            break;
		
            case 3: //Режим ремонта стен
                if(tower1.energy > (tower1.energyCapacity / 2))
                {
                    var damagedWalls = tower1.pos.findInRange(FIND_STRUCTURES, 10, {filter: (structure) => {return (structure.structureType == STRUCTURE_WALL) && (structure.hits < 3000000);}});
                    if(damagedWalls != '') 
                    {
                        for(var oneOfDamagedWalls of damagedWalls)
                        tower1.repair(oneOfDamagedWalls);
                    }
                    else
                    {
				        Memory.tower1Mode = 4;
			        }
                }
                else
                {
                    Memory.tower1Mode = 3;
                }
            break;
		
            case 4: //Режим ремонта дорог
                if(tower1.energy > (tower1.energyCapacity / 2))
                {
                    var damagedRoads = tower1.pos.findInRange(FIND_STRUCTURES, 10, {filter: (structure) => {return (structure.structureType == STRUCTURE_ROAD) && (structure.hits < structure.hitsMax);}});
                    if(damagedRoads != '') 
                    {
                        for(var oneOfDamagedRoads of damagedRoads)
                        tower1.repair(oneOfDamagedRoads);
                    }
                        else
                    {
                        Memory.tower1Mode = 0;
                    }
                }
                else
                {
                    Memory.tower1Mode = 3;
                }
            break;
        }
    }
};
module.exports = modulTower1
