var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');
var healer = require('healer');
var spawner = require('spawn');
var _ = require('lodash');


for (var room_name in Game.rooms) {
    var room = Game.rooms[room_name];
    console.log(room_name);
}

/*
for (var sp_name in Game.spawns) {
    var spawn = Game.spawns[sp_name];
    spawner(spawn);
}
for (var cr_name in Game.creeps) {
    var creep = Game.creeps[cr_name];
    var role = creep.memory.role;

    if (role == 'harvester') {
        harvester(creep);
    }
    else if (role == 'builder') {
        builder(creep);
    }
    else if (role == 'guard') {
        guard(creep);
    }
    else if (role == 'healer') {
        healer(creep);
    }
}
*/
