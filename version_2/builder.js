/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder'); // -> 'a thing'
 */

require('harvester');

module.exports = function(creep) {
    var target = creep.pos.findNearest(Game.CONSTRUCTION_SITES);
    if (target) {
        creep.moveTo(target);
        creep.build(target);
    }
    else {
        harvester(creep);
    }
}
