var modulTower2 = 
{
    run: function(tower2) 
    {
        //---- Ручное управление ----//
        //console.log(Memory.tower2Mode);
        //Memory.tower2Mode = 0;
        //---------------------------//
	
        //---- При появлении врага ----//
        var closestHostile = tower2.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) 
        {
            Memory.tower2Mode = 0;
        }
        
        //---- Переключатель режимов ----//
        switch(Memory.tower2Mode)
        {
            case 0: //Режим атаки
                if(closestHostile) 
                {
                    tower2.attack(closestHostile);
                    var invaderUsername = closestHostile.owner.username;
                    Game.notify('User ', invaderUsername,' spotted in room "E15S29"');
                    console.log('ALERT!!!! WE ARE UNDER ATTACK!!!!! INVADER NAME: ', invaderUsername);
                }
                else 
                {
                    Memory.tower2Mode = 1;
                }
            break;
		
            case 1: //Будущий режим хила
				if(tower2.energy > (tower2.energyCapacity / 4))
				{
					Memory.tower2Mode = 2;
				}
            break;
		
            //---- Режим ремонта строений ----//
            case 2: //Режим ремонта ворот
                if(tower2.energy > (tower2.energyCapacity / 2))
                {
                    var damagedRamparts = tower2.pos.findInRange(FIND_STRUCTURES, 10, {filter: (structure) => {return (structure.structureType == STRUCTURE_RAMPART) && (structure.hits < 2000000);}});
                    if(damagedRamparts != '') 
                    {
		                for(var oneOfDamagedRamparts of damagedRamparts)
                        tower2.repair(oneOfDamagedRamparts);
                    }
			        else
			        {
				        Memory.tower2Mode = 3;
			        }
                }
                else
                {
                    Memory.tower2Mode = 3;
                }
            break;
		
            case 3: //Режим ремонта стен
                if(tower2.energy > (tower2.energyCapacity / 2))
                {
                    var damagedWalls = tower2.pos.findInRange(FIND_STRUCTURES, 10, {filter: (structure) => {return (structure.structureType == STRUCTURE_WALL) && (structure.hits < 2000000);}});
                    if(damagedWalls != '') 
                    {
                        for(var oneOfDamagedWalls of damagedWalls)
                        tower2.repair(oneOfDamagedWalls);
                    }
                    else
                    {
				        Memory.tower2Mode = 4;
			        }
                }
                else
                {
                    Memory.tower2Mode = 3;
                }
            break;
		
            case 4: //Режим ремонта дорог
                if(tower2.energy > (tower2.energyCapacity / 2))
                {
                    var damagedRoads = tower2.pos.findInRange(FIND_STRUCTURES, 10, {filter: (structure) => {return (structure.structureType == STRUCTURE_ROAD) && (structure.hits < structure.hitsMax);}});
                    if(damagedRoads != '') 
                    {
                        for(var oneOfDamagedRoads of damagedRoads)
                        tower2.repair(oneOfDamagedRoads);
                    }
                        else
                    {
                        Memory.tower2Mode = 0;
                    }
                }
                else
                {
                    Memory.tower2Mode = 3;
                }
            break;
        }
    }
};
module.exports = modulTower2
