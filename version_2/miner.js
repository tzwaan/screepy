/*
 * Miner module. Handles the miner creep
 */
var C = require('constants');

module.exports = function(creep) {
    var target = Game.getObjectById(creep.memory.target_id);
    if (creep.pos.isNearTo(target)) {
        creep.harvest(target);
    }
    else {
        creep.moveTo(target);
    }
}
