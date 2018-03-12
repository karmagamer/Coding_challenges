var helpers = require('./helpers');
var Grid = require('./grid');
var fs = require("fs");

var text = fs.readFileSync("./data.txt").toString('utf-8');
var arr_grid = helpers.parse_to_grid(text);
var start_coords = helpers.get_start_coords(arr_grid, '@');

const grid = new Grid(start_coords, arr_grid);
var dist = grid.get_total_distance();

//answer printed to console
console.log("Your answer: ", dist);
