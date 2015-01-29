/*
 * Carrier module
 */
var C = require('constants');

module.exports = function(creep) {
    var target = 0;
    if (creep.energy == creep.energyCapacity) {
        console.log("energy full");
        target = creep.pos.findClosest(Game.MY_SPAWNS);
        if (creep.pos.isNearTo(target)) {
            creep.transferEnergy(target);
            console.log("transferring to spawn");
            return;
        }
        else {
            creep.moveTo(target);
            console.log("moving to spawn");
            return;
        }
    }
    var targets = creep.pos.findInRange(Game.ENERGY, 4);
    if (targets.length > 0) {
        console.log("energy nearby");
        target = creep.pos.findClosest(targets);
        if (creep.pos.isNearTo(target)) {
            console.log("picking up energy");
            creep.pickup(target);
        }
        else {
            console.log("moving to energy");
            creep.moveTo(target);
        }
    }
    else {
        console.log("finding closest dedicated miner");
        target = creep.pos.findClosest(Game.MY_CREEPS, {
            filter: function(object) {
                return (object.memory.target_id == creep.memory.target_id
                    &&
                    object.memory.type == C.MINER);
            }
        });
        console.log(target);
        creep.moveTo(target);
        console.log("moving to miner");
    }
};
