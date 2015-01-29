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
        var memory = {"type": C.MINER, "target_id" : target.id};
        spawn.createCreep(body, null, memory);

        return body.length - 2;
    }

    if (type == C.CARRIER) {
        body = [];
        for (var i = 0; i < spec_parts && body.length < total_parts; i++) {
            if (i % 2) {
                body.push(Game.MOVE);
            }
            else {
                body.push(Game.CARRY);
            }
        }
        var memory = {"type": C.CARRIER, "target_id": target.id};
        spawn.createCreep(body, null, memory);
        var distance = Memory.sources[target.id].distance;
        console.log(distance);
        if (body.length % 2) {
            distance *= 3;
        }
        else {
            distance *= 2;
        }
        return Math.ceil(body.length / distance);
    }
}
