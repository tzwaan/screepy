/*
 * Carrier module
 */
var C = require('constants');

module.exports = function(creep) {
    var target = 0;
    if (creep.energy == creep.energyCapacity) {
        creep.say("energy full");
        target = creep.pos.findClosest(Game.MY_SPAWNS);
        if (creep.pos.isNearTo(target)) {
            creep.transferEnergy(target);
            creep.say("transferring to spawn");
            return;
        }
        else {
            creep.moveTo(target);
            creep.say("moving to spawn");
            return;
        }
    }
    var targets = creep.pos.findInRange(Game.DROPPED_ENERGY, 4);
    if (targets.length > 0) {
        creep.say("energy nearby");
        target = creep.pos.findClosest(targets);
        if (creep.pos.isNearTo(target)) {
            creep.say("picking up energy");
            creep.pickup(target);
        }
        else {
            creep.say("moving to energy");
            creep.moveTo(target);
        }
    }
    else {
        creep.say("finding closest dedicated miner");
        target = creep.pos.findClosest(Game.MY_CREEPS, {
            filter: function(object) {
                return (object.memory.target_id == creep.memory.target_id
                    &&
                    object.memory.type == C.MINER);
            }
        });
        creep.say(target);
        creep.moveTo(target);
        creep.say("moving to miner");
    }
};
