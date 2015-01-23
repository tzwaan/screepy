/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('guard'); // -> 'a thing'
 */

module.exports = function(creep) {
    var target = creep.pos.findNearest(Game.HOSTILE_CREEPS);
    if (target) {
        creep.moveTo(target);
        creep.attack(target);
    }
    else {
        target = creep.pos.findNearest(Game.HOSTILE_SPAWNS);
        if (target) {
            creep.moveTo(target);
            creep.attack(target);
        }
        else {
            target = creep.pos.findNearest(Game.FLAGS);
            if (target) {
                if (!creep.pos.inRangeTo(target.pos, 3)) {
                    creep.moveTo(target);
                }
            }
        }
    }
};
