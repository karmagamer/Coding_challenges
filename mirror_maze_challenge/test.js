Var helpers = module.exports.testHelper = {
  parse_to_grid: function(str) {
      var grid_lines = str.split('\n');
      var grid = [];
      for (var i = 0; i < grid_lines.length; i++) {
          var grid_line_split = grid_lines[i].split("");
          grid.push(grid_line_split);
      }
      return grid;
  },

  is_mirror: function(chr) {
      return chr == '/' || chr == '\\' || chr == 'O';
  },

  get_start_coords: function(grid, startChar) {
      for (var i = 0; i < grid.length; i++) {
          if (grid[i].includes(startChar)) {
              return [i, grid[i].indexOf(startChar)]
          }
      }
  },

  get_next_coords: function(coords, motion) {
      switch(motion) {
          case 'UP':
              var curr_y = coords[0];
              return [curr_y - 1, coords[1]];
              break;
          case 'DOWN':
              var curr_y = coords[0];
             return [curr_y + 1, coords[1]];
              break;
           case 'LEFT':
              var curr_x = coords[1];
              return [coords[0], curr_x - 1];
              break;
           case 'RIGHT':
              var curr_x = coords[1];
              return [coords[0], curr_x + 1];
              break;
          default:
              break;
      }
  },

  get_next_dir: function(coords, curr_motion, chr) {
      if (chr == '/') {
          switch(curr_motion) {
              case 'UP':
                  return 'RIGHT'
                  break;
              case 'DOWN':
                  return 'LEFT'
                  break;
               case 'LEFT':
                  return 'DOWN'
                  break;
               case 'RIGHT':
                  return 'UP'
                  break;
              default:
                  break;
          }
      } else if (chr == '\\') {
          switch(curr_motion) {
              case 'UP':
                  return 'LEFT'
                  break;
              case 'DOWN':
                  return 'RIGHT'
                  break;
               case 'LEFT':
                 return 'UP'
                 break;
               case 'RIGHT':
                  return 'DOWN'
                  break;
               default:
                  break;
          }
      } else if (chr == 'O') {
          switch(curr_motion) {
              case 'UP':
                  return 'DOWN'
                  break;
              case 'DOWN':
                  return 'UP'
                  break;
               case 'LEFT':
                 return 'RIGHT'
                 break;
               case 'RIGHT':
                  return 'LEFT'
                  break;
               default:
                  break;
          }
      }
  },
}
module.exports = class Grid {
    constructor(start_coords, grid) {
        this.start_coords = start_coords;
        this.grid = grid;
        this.x_left_wall = 0;
        this.x_right_wall = grid[0].length - 1;
        this.y_up_wall = 0;
        this.y_down_wall = grid.length - 1;
        this.coords_examined = [];
    }

   //returns boolean
   has_seen_coords(coords) {
       for (var i = 0; i < this.coords_examined.length; i++) {
           if (JSON.stringify(this.coords_examined[i]) == JSON.stringify(coords)) {
               return true;
           }
       }
       return false;
    }

    //returns boolean
    hit_a_wall(coords) {
        var x = coords[1];
        var y = coords[0];
        if (x > this.x_right_wall || x < this.x_left_wall) {
            return true
        } else if (y > this.y_down_wall || y < this.y_up_wall) {
            return true
        } else {
            return false
        }
    }

    //internal wrapper around get_distance, returns number
    get_total_distance() {
        return this.get_distance(this.start_coords, 'RIGHT');
    }

    //number of steps from lazer to wall, returns number
    get_distance(coords, curr_motion) {
       var coords_with_dir = coords.concat(curr_motion)
       if (this.has_seen_coords(coords_with_dir)) {
           return -1;
       }
       this.coords_examined.push(coords_with_dir);

       if (this.hit_a_wall(coords)) {
           return 0;
       }

       else {
           var chr = this.grid[coords[0]][coords[1]];
           if (helpers.is_mirror(chr)) {
               switch(chr) {
                case '/':
                    var next_dir = helpers.get_next_dir(coords, curr_motion, '/');
                    var next_coords = helpers.get_next_coords(coords, next_dir);
                    var distance_seen = this.get_distance(next_coords, next_dir);
                    if (distance_seen === -1) {
                        return -1;
                    } else {
                        return 1 + distance_seen;
                    }
                    break;
                case '\\':
                    var next_dir = helpers.get_next_dir(coords, curr_motion, '\\');
                    var next_coords = helpers.get_next_coords(coords, next_dir);
                    var distance_seen = this.get_distance(next_coords, next_dir);
                    if (distance_seen === -1) {
                        return -1;
                    } else {
                        return 1 + distance_seen;
                    }
                    break;
                case 'O':
                    var next_dir = helpers.get_next_dir(coords, curr_motion, 'O');
                    var next_coords = helpers.get_next_coords(coords, next_dir);
                    var distance_seen = this.get_distance(next_coords, next_dir);
                    if (distance_seen === -1) {
                        return -1;
                    } else {
                        return 1 + distance_seen;
                    }
                    break;
                default:
                    break;
            }
           }

           switch(chr) {
                case '-':
                    var next_coords = helpers.get_next_coords(coords, curr_motion);
                    var distance_seen = this.get_distance(next_coords, curr_motion);
                    if (distance_seen === -1) {
                        return -1;
                    } else {
                        return 1 + distance_seen;
                    }
                    break;
                case '@':
                    var next_coords = helpers.get_next_coords(coords, curr_motion);
                    var distance_seen = this.get_distance(next_coords, curr_motion);
                    if (distance_seen === -1) {
                        return -1;
                    } else {
                        return 1 + distance_seen;
                    }
                    break;
                case '^':
                    var next_coords = helpers.get_next_coords(coords, 'UP');
                    var distance_seen = this.get_distance(next_coords, 'UP');
                    if (distance_seen === -1) {
                        return -1;
                    } else {
                        return 1 + distance_seen;
                    }
                    break;
                case 'v':
                    var next_coords = helpers.get_next_coords(coords, 'DOWN');
                    var distance_seen = this.get_distance(next_coords, 'DOWN');
                    if (distance_seen === -1) {
                        return -1;
                    } else {
                        return 1 + distance_seen;
                    }
                    break;
                case '>':
                    var next_coords = helpers.get_next_coords(coords, 'RIGHT');
                    var distance_seen = this.get_distance(next_coords, 'RIGHT');
                    if (distance_seen === -1) {
                        return -1;
                    } else {
                        return 1 + distance_seen;
                    }
                    break;
                case '<':
                    var next_coords = helpers.get_next_coords(coords, 'LEFT');
                    var distance_seen = this.get_distance(next_coords, 'LEFT');
                    if (distance_seen === -1) {
                        return -1;
                    } else {
                        return 1 + distance_seen;
                    }
                    break;
                default:
                    break;
            }
       }
    }
}

var fs = require("fs");

var text = fs.readFileSync("./data.txt").toString('utf-8');
var arr_grid = helpers.parse_to_grid(text);
var start_coords = helpers.get_start_coords(arr_grid, '@');

const grid = new Grid(start_coords, arr_grid);
var dist = grid.get_total_distance();

//answer printed to console
console.log("Your answer: ", dist);
