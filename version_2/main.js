var _ = require('lodash');
var C = require('constants');
var spawner = require('spawn');
var creep_commander = require('creep_commander');


for (var room_name in Game.rooms) {
    var room = Game.rooms[room_name];
    var nr_extensions = room.find(Game.MY_STRUCTURES, {
        filter: function(structure) {
            return (structure.structureType == Game.STRUCTURE_EXTENSION);
        }
    }).length;
    var total_parts = 5 + nr_extensions;

    var sources = room.find(Game.SOURCES);
    var spawn = room.find(Game.MY_SPAWNS)[0];
    if (!Memory.sources) {
        console.log("Initializing sources");
        Memory.sources = {};
        for (var src_name in sources) {
            var id = sources[src_name].id;
            var distance = spawn.pos.findPathTo(sources[src_name]).length;
            Memory.sources[id] = {
                "workforce" : 0,
                "carryforce" : 0,
                "distance" : distance
            };
        }
    }

    var source = spawn.pos.findClosest(Game.SOURCES);

    if (Memory.sources[source.id].workforce < 5) {
        var new_workforce = spawner(
                spawn,
                C.MINER,
                5 - Memory.sources[source.id].workforce,
                total_parts,
                source
        );
        Memory.sources[source.id].workforce += new_workforce;
    }
    else if (Memory.sources[source.id].carryforce < 10) {
        var new_workforce = spawner(
                spawn,
                C.CARRIER,
                6,
                total_parts,
                source
        );
        Memory.sources[source.id].carryforce += new_workforce;
    }

    creep_commander(Game.creeps);
}
