/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('healer'); // -> 'a thing'
 */


module.exports = function(creep) {
    var target = creep.pos.findNearest(Game.MY_CREEPS, {
        filter: function(o) {
            return (o.hits < o.hitsMax) && o != creep;
        }
    });
    if (target) {
        creep.moveTo(target);
        creep.heal(target);
        creep.memory.lastBuddy = target.name;
    }
    else {
        target = Game.creeps[creep.memory.lastBuddy];
        creep.moveTo(target);
    }
}
