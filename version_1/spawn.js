/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn'); // -> 'a thing'
 */

var base = [Game.CARRY, Game.WORK, Game.MOVE];
var guard = [Game.TOUGH, Game.ATTACK, Game.ATTACK, Game.MOVE];
var healer = [Game.TOUGH, Game.MOVE, Game.HEAL, Game.MOVE];
var spwns = [base, guard, base, guard, healer];
var roles = ['harvester', 'guard', 'harvester', 'guard', 'healer'];
var pricing = [120, 255, 120, 255, 255];

module.exports = function(spawn) {
    if (!spawn.spawning) {
        if (spawn.memory.nextSpwn === undefined) {
            spawn.memory.nextSpwn = 0;
        }
        var nextSpwn = spawn.memory.nextSpwn;
        var body = spwns[nextSpwn];
        var role = roles[nextSpwn];
        if (spawn.energy > pricing[nextSpwn]) {
            console.log('Creating a ' + roles[nextSpwn]);
            spawn.createCreep(body, undefined, {role: role});
            spawn.memory.nextSpwn = (nextSpwn + 1) % spwns.length;
        }
    }
 }
