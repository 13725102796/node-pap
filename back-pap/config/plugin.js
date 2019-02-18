'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
};


exports.cors = {
  enable: true,
  credentials: true,
  package: 'egg-cors',
}
