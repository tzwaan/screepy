/*
 * Spawner module. Handles all functions of the spawn
 */
var C = require('constants');

module.exports = function(spawn, type, spec_parts, total_parts, target) {
    if (spawn.spawning) {
        return 0;
    }
    if (type == C.MINER) {
        var body = [Game.CARRY, Game.MOVE];
        for (var i = 0; i < spec_parts && body.length < total_parts ; i++) {
            body.push(Game.WORK);
        }
        /* need to add initialization memory */
        var memory = {"type": C.MINER, "target_id" : target.id};
        spawn.createCreep(body, null, memory);

        return body.length - 2;
    }
 }
