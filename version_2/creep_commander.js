/*
 * Call the approptriate functions for every creepp
 */
var C = require('constants');
var miner = require('miner');
var carrier = require('carrier');

module.exports = function(creeps) {
    for (var c_name in creeps) {
        var creep = Game.creeps[c_name];

        if (creep.memory.type == C.MINER) {
            miner(creep);
        }
        else if (creep.memory.type == C.CARRIER) {
            carrier(creep);
        }
    }
}
