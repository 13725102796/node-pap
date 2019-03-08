'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // return
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  // passport = {
  //   enable: true,
  //   package: 'egg-passport',
  // },
  // passportGithub = {
  //   enable: true,
  //   package: 'egg-passport-github',
  // }
  
};




