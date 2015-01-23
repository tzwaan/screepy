var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');
var healer = require('healer');
var spawner = require('spawn');
var _ = require('lodash');

var healers = _.filter(Game.creeps, {
    memory: {role: 'healer'}
});
var nrHeal = healers.length;
Memory.nrHeal = nrHeal;
var harvesters = _.filter(Game.creeps, {
    memory: {role: 'harvester'}
});
var nrHarvest = harvesters.length;
Memory.nrHarvest = nrHarvest;
var builders = _.filter(Game.creeps, {
    memory: {role: 'builder'}
});
var nrBuild = builders.length;
Memory.nrBuild = nrBuild;
var guards = _.filter(Game.creeps, {
    memory: {role: 'guard'}
});
var nrGuard = guards.length;
Memory.nrGuard = nrGuard;
var enemies = Game.spawns.Main.room.find(Game.HOSTILE_CREEPS);
var nrEnemies = enemies.length;
Memory.nrEnemies = nrEnemies;


harvesters = _.filter(Game.creeps, {
    filter: function(creep) {
        return creep.getActiveBodyparts(Game.WORK) !== 0;
    }
});
for (var guy in harvesters) {
    var creep = harvesters[guy];
    creep.memory.role = 'harvester';
}
if (nrEnemies > 0) {
    guards = _.filter(Game.creeps, {
        filter: function(creep) {
            return creep.getActiveBodyparts(Game.ATTACK) !== 0;
        }
    });
    for (var guy in guards) {
        var creep = guards[guy];
        creep.memory.role = 'guard';
    }
}
else if (Game.spawns.Main.room.find(Game.CONSTRUCTION_SITES).length > 0) {
    builders = _.filter(Game.creeps, {
        filter: function(creep) {
            return creep.getActiveBodyparts(Game.WORK) !== 0;
        }
    });
    for (var guy in builders) {
        var creep = builders[guy];
        creep.memory.role = 'builder';
    }
}

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
