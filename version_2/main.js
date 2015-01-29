var _ = require('lodash');
var C = require('constants');
var spawner = require('spawn');


for (var room_name in Game.rooms) {
    var room = Game.rooms[room_name];
    var nr_extensions = room.find(Game.MY_STRUCTURES, {
        filter: function(structure) {
            return (structure.structureType == Game.STRUCTURE_EXTENSION);
        }
    }).length;
    var total_parts = 5 + nr_extensions;

    var sources = room.find(Game.SOURCES);
    if (!Memory.sources) {
        console.log("Initializing sources");
        Memory.sources = {};
        for (var src_name in sources) {
            var id = sources[src_name].id;
            Memory.sources[id] = {"workforce" : 0, "carryforce" : 0};
        }
    }

    var spawn = room.find(Game.MY_SPAWNS)[0];
    var source = spawn.pos.findClosest(Game.SOURCES);
    source.mem = Memory.sources[source.id];
    console.log(source.mem.workforce);

    if (source.mem.workforce < 5) {
        /* need to update workforce after spawn */
        var new_workforce = spawner(spawn, C.MINER, 5 - source.mem.workforce, total_parts, source);
        Memory.sources[source.id].workforce += new_workforce;
    }
}
