const passtimes = require('./helpers');

const { nextISSTimesForMyLocation } = require('./iss_promised');


nextISSTimesForMyLocation()
.then((body) => passtimes(body))
.catch((error) => {
  console.log('Error Message: ', error.message);
});
