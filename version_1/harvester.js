/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */

module.exports = function(creep) {
    var target1, target2;
    if (creep.energy === 0) {
        creep.memory.isEmpty = true;
    }
    else if (creep.energy === creep.energyCapacity){
        creep.memory.isEmpty = false;
    }
    if (creep.memory.isEmpty) {
        target1 = creep.pos.findNearest(Game.SOURCES_ACTIVE);
        target2 = creep.pos.findNearest(Game.DROPPED_ENERGY);
        if (target1) {
            if (target2) {
                if (creep.pos.findPathTo(target1).length > creep.pos.findPathTo(target2).length) {
                    creep.moveTo(target2);
                    creep.pickup(target2);
                    return;
                }
            }
            creep.moveTo(target1);
            creep.harvest(target1);
        }
    }
    else {
        target1 = creep.pos.findNearest(Game.MY_SPAWNS);
        creep.moveTo(target1);
        creep.transferEnergy(target1);
    }
}
