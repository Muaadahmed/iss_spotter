const request = require('request');

const fetchMyIp = function(callback) {
  request('https://api.ipify.org/?format=json%27{%22ip%22:%2272.137.83.224%22}', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(error, body);

  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`;
      callback(msg, null);
      return;
    }

    if (!error) {
      let obj = {};
      obj['latitude'] = `${JSON.parse(body).latitude}`;
      obj['longitude'] = `${JSON.parse(body).longitude}`;
      callback(error, obj);
    } else {
      callback(error, null);
      return;
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords['latitude']}&lon=${coords['longitude']}`, (error, response, body) => {
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when loading in data for ISS passby times: ${body}`;
      callback(msg, null);
      return;
    }

    if (!error) {
      const issTimesPassed = JSON.parse(body);
      callback(error, issTimesPassed);
    } else {
      callback(error, null);
      return;
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIp((error, ip) => {
    if (error) {
      callback(null, error);
      return;
    }
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        callback(null, error);
        return;
      }
      fetchISSFlyOverTimes(data, (error, body) => {
        if (error) {
          callback(null, error);
          return;
        }
        callback(null, body);
      });
    });
  });
};

module.exports = { fetchMyIp, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };