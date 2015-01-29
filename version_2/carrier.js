/*
 * Carrier module
 */
var C = require('constants');

module.exports = function(creep) {
    if (creep.energy == creep.energyCapacity) {
        var target = creep.pos.findClosest(Game.MY_SPAWNS);
        if (creep.pos.isNearTo(target)) {
            creep.transferEnergy(target);
            return;
        }
        else {
            creep.moveTo(target);
            return;
        }
    }
    var targets = creep.pos.findInRange(Game.ENERGY, 4)
    if (targets.length > 0) {
        var target = creep.pos.findClosest(targets);
        if (creep.pos.isNearTo(target)) {
            creep.pickup(target);
        }
        else {
            creep.moveTo(target);
        }
    }
    else {
        var target = creep.pos.findClosest(Game.MY_CREEPS, {
            filter: function(object) {
                return object.memory.target_id == creep.memory.target_id;
            }
        });
        creep.moveTo(target);
    }
}
