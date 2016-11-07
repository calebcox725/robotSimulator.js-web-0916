'use strict';

function Robot() {
  this.bearing = 'north';
  this.coordinates = [0, 0];
}

Robot.prototype.place = function(args) {
  this.bearing = args.direction;
  this.coordinates = [args.x, args.y];
}

Robot.prototype.orient = function(direction) {
  var directions = [ 'east', 'west', 'north', 'south' ];

  if (directions.includes(direction)) {
    this.bearing = direction;
  } else {
    throw new Error('Invalid Robot Bearing');
  }
};

Robot.prototype.turnRight = function() {
  switch (this.bearing) {
    case 'north':
      this.bearing = 'east';
      break;
    case 'east':
      this.bearing = 'south';
      break;
    case 'south':
      this.bearing = 'west';
      break;
    case 'west':
      this.bearing = 'north';
      break;
  }
};

Robot.prototype.turnLeft = function() {
  switch (this.bearing) {
    case 'north':
      this.bearing = 'west';
      break;
    case 'east':
      this.bearing = 'north';
      break;
    case 'south':
      this.bearing = 'east';
      break;
    case 'west':
      this.bearing = 'south';
      break;
  }
};

Robot.prototype.at = function(x, y) {
  this.coordinates = [x, y];
};

Robot.prototype.advance = function() {
  switch (this.bearing) {
    case 'north':
      this.coordinates[1]++;
      break;
    case 'east':
      this.coordinates[0]++;
      break;
    case 'south':
      this.coordinates[1]--;
      break;
    case 'west':
      this.coordinates[0]--;
      break;
  }
};

Robot.prototype.instructions = function(instructionString) {
  var instructionArray = instructionString.split('')

  return instructionArray.map( function(element) {
    switch (element) {
      case 'L':
        return 'turnLeft';
      case 'R':
        return 'turnRight';
      case 'A':
        return 'advance';
    }
  });
};

Robot.prototype.evaluate = function(instructionString) {
  var instructions = this.instructions(instructionString);

  for (let i = 0; i < instructions.length; i++) {
    this[instructions[i]]();
  }
}