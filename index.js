// const { fetchCoordsByIP, fetchISSFlyOverTimes, fetchMyIp } = require('./iss');

const { nextISSTimesForMyLocation } = require('./iss');


const passtimes = function(passtimes) {
  for (const pass of passtimes['response']) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  passtimes(passTimes);
});