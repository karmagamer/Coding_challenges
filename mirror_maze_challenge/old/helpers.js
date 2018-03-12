module.exports = {
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
