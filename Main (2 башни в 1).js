//---- Пространство определения ролей --------//
var roleWorker = require('role.worker');
var roleUpgrader = require('role.upgrader');
var roleRepairer = require('role.repairer');
var roleRefueller = require('role.refueller');
var roleBuilder = require('role.builder');
//---- Модуль башни --------------------------//
var modulTower = require('modul.tower');
//--------------------------------------------//

//---- Озвучивание количества энергии в комнате -----------------------------------------------------------------//
//for(var name in Game.rooms) { console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy'); }
//---------------------------------------------------------------------------------------------------------------//

//---- Цикличная функция ----//
module.exports.loop = function () 
{
    //---- Запуск ролей ----//
    for(var name in Game.creeps)
    {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'worker') 
        {
            roleWorker.run(creep);
        }
        if(creep.memory.role == 'repairer') 
        {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'builder')
        {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'refueller')
        {
            roleRefueller.run(creep);
        }
        if(creep.memory.role == 'upgrader')
        {
            roleUpgrader.run(creep);
        }
    }
    
    //---- Запуск башен ----//
    /**
    //Модуль башен 1 + 1 - CPU?
    var tower1 = Game.getObjectById('5beef997c093d8686447a469');
    modulTower1.run(tower1);
    
    var tower2 = Game.getObjectById('5bf6d65653e439726ea18374');
    modulTower2.run(tower2);
    **/
    
    //Модуль башен 2 в 1 - CPU?
    var towers = Game.rooms.E15S29.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER});
    for(let tower of towers)
    {
        modulTower.run(tower);
    }
    
    //---- Автоспавн умершего крипа ----//
    for(var name in Memory.creeps) //Взятие имени из массива имен
    {
        if(!Game.creeps[name]) //Проверка жив ли крип
        {
            switch(name) //Проверка роли крипа по его имени
            {
                case 'Worker1':
                case 'Worker2':
                //case 'Worker3':
                    Game.spawns['SpawnHome'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], name, {memory: {role: 'worker'}});
                break;
                
                case 'Refueller1':
                case 'Refueller2':
                    Game.spawns['SpawnHome'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], name, {memory: {role: 'refueller'}});
                break;
                
                //case 'Repairer1':
                    Game.spawns['SpawnHome'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], name, {memory: {role: 'repairer'}});
                break;
                    	        
                case 'Upgrader1':
                case 'Upgrader2':
                    Game.spawns['SpawnHome'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], name, {memory: {role: 'upgrader'}});
                break;
                
                //case 'Builder1':
                    Game.spawns['SpawnHome'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], name, {memory: {role: 'builder'}});
                break;
                
                default: 
                    delete Memory.creeps[name];
                    console.log('Clearing non-existing creep memory:', name);
                break;
            }
        }
    }
    
    //---- Визуализация спавна крипа ----//
    if(Game.spawns['SpawnHome'].spawning) 
    { 
        var spawnHome = Game.spawns['SpawnHome']
        var spawningCreep = spawnHome.spawning.name;
        var spawningTimeInPercent = (100 - 100 / spawnHome.spawning.needTime * spawnHome.spawning.remainingTime).toFixed(0);
        
        switch(spawningCreep)
        {
            case 'Worker1':
            case 'Worker2':
                spawnHome.room.visual.text('🛠️️' + spawningCreep + '🛠️', spawnHome.pos.x+0.9, spawnHome.pos.y, {align: 'left', opacity: 0.8});
            break;
            
            case 'Refueller1':
            case 'Refueller2':
                spawnHome.room.visual.text('🛠️️' + spawningCreep + '🛠️', spawnHome.pos.x+0.9, spawnHome.pos.y, {align: 'left', opacity: 0.8});
            break;
            
            case 'Builder1':
            case 'Builder2':
                spawnHome.room.visual.text('⚒️️️' + spawningCreep + '⚒️️', spawnHome.pos.x+0.9, spawnHome.pos.y, {align: 'left', opacity: 0.8});
            break;
            
            default:
                spawnHome.room.visual.text('💡️️' + spawningCreep + '💡️️', spawnHome.pos.x+0.9, spawnHome.pos.y, {align: 'left', opacity: 0.8});
            break;
        }
        spawnHome.room.visual.text('⚙️[' + spawningTimeInPercent + '%] - [' + spawnHome.spawning.remainingTime + 't.]', spawnHome.pos.x+0.9, spawnHome.pos.y+0.8, {align: 'left', opacity: 0.8});
        
        //---- Вывод в консоль ----//
        if(Memory.typeOnce == 0)
        {
            console.log('Spawning creep with role', Game.creeps[Game.spawns['SpawnHome'].spawning.name].memory.role, ': ', spawningCreep);
            Memory.typeOnce = 1;
        }
    }
    else
    {
        Memory.typeOnce = 0;
    }
    
}
//---- Конец цикличной функции ----//
