var modulTower = 
{
    run: function(tower) 
    {
        //---- Ручное управление ----//
        //console.log(Memory.tower1Mode);
        //Memory.tower1Mode = 0;
        //---------------------------//
	
	    //---- Определение башни ----//
	    var towerMode;
	    if(tower.id == '5beef997c093d8686447a469')
	    {
	        towerMode = Memory.tower1Mode;
	    }
	    if(tower.id == '5bf6d65653e439726ea18374')
	    {
	        towerMode = Memory.tower2Mode;
	    }
	
        //---- При появлении врага ----//
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) 
        {
            towerMode = 0;
        }
        
        //---- Переключатель режимов ----//
        switch(towerMode)
        {
            case 0: //Режим атаки
                if(closestHostile) 
                {
                    tower.attack(closestHostile);
                    var invaderUsername = closestHostile.owner.username;
                    if(Memory.notifyMeOnce == 0)
                    {
                        Game.notify('User ', invaderUsername,' spotted in room "E15S29"');
                        console.log('ALERT!!!! WE ARE UNDER ATTACK!!!!! INVADER NAME: ', invaderUsername);
                        console.log('ALERT!!!! WE ARE UNDER ATTACK!!!!! INVADER NAME: ', invaderUsername);
                        console.log('ALERT!!!! WE ARE UNDER ATTACK!!!!! INVADER NAME: ', invaderUsername);
                        Memory.notifyMeOnce = 1;
                    }
                }
                else 
                {
                    Memory.notifyMeOnce = 0;
                    towerMode = 1;
                }
            break;
		
            case 1: //Будущий режим хила
				if(tower.energy > (tower.energyCapacity / 4))
				{
					towerMode = 2;
				}
            break;
		
            //---- Режим ремонта строений ----//
            case 2: //Режим ремонта ворот
                if(tower.energy > (tower.energyCapacity / 2))
                {
                    var damagedRamparts = tower.pos.findInRange(FIND_STRUCTURES, 10, {filter: (structure) => {return (structure.structureType == STRUCTURE_RAMPART) && (structure.hits < 3000000);}});
                    if(damagedRamparts != '') 
                    {
		                for(var oneOfDamagedRamparts of damagedRamparts)
                        tower.repair(oneOfDamagedRamparts);
                    }
			        else
			        {
				        towerMode = 3;
			        }
                }
                else
                {
                    towerMode = 3;
                }
            break;
		
            case 3: //Режим ремонта стен
                if(tower.energy > (tower.energyCapacity / 2))
                {
                    var damagedWalls = tower.pos.findInRange(FIND_STRUCTURES, 10, {filter: (structure) => {return (structure.structureType == STRUCTURE_WALL) && (structure.hits < 3000000);}});
                    if(damagedWalls != '') 
                    {
                        for(var oneOfDamagedWalls of damagedWalls)
                        tower.repair(oneOfDamagedWalls);
                    }
                    else
                    {
				        towerMode = 4;
			        }
                }
                else
                {
                    towerMode = 3;
                }
            break;
		
            case 4: //Режим ремонта дорог
                if(tower.energy > (tower.energyCapacity / 2))
                {
                    var damagedRoads = tower.pos.findInRange(FIND_STRUCTURES, 10, {filter: (structure) => {return (structure.structureType == STRUCTURE_ROAD) && (structure.hits < structure.hitsMax);}});
                    if(damagedRoads != '') 
                    {
                        for(var oneOfDamagedRoads of damagedRoads)
                        tower.repair(oneOfDamagedRoads);
                    }
                        else
                    {
                        towerMode = 0;
                    }
                }
                else
                {
                    towerMode = 3;
                }
            break;
        }
        
        //---- Помещение переменной в память ----//
        if(tower.id == '5beef997c093d8686447a469')
	    {
	        Memory.tower1Mode = towerMode;
	    }
	    if(tower.id == '5bf6d65653e439726ea18374')
	    {
	        Memory.tower2Mode = towerMode;
	    }
    }
};
module.exports = modulTower
