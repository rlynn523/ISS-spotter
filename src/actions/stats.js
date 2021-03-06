import fetch from 'isomorphic-fetch';

let STATS_COUNTER = 'STATS_COUNTER';
let statsCounter = function(counter) {
    return {
        type: STATS_COUNTER,
        counter: counter
    }
}

let FETCH_CURRENT_STATS_SUCCESS = 'FETCH_CURRENT_STATS_SUCCESS';
let fetchCurrentStatsSuccess = function(velocity, visibility) {
    return {
        type: FETCH_CURRENT_STATS_SUCCESS,
        velocity: velocity,
        visibility: visibility
    }
};

// Fetches velocity and visibility from Where The ISS At? API
// setInterval function allows for this action to fire every 20 Seconds
// The statsCounter action is dispatched every time the fetchStats action is
// The setInterval function creates a counter that represents the time until the next statsCounter action

let fetchStats = function(velocity, visibility) {
    return function(dispatch) {
        var execStats = function() {
        let url = 'https://api.wheretheiss.at/v1/satellites/25544';
        return fetch(url).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText)
               error.response = response
               throw error;
           }
           return response.json();
       })
       .then(function(data) {
           let velocity = data.velocity;
           let visibility = data.visibility;
           let i = 20;
           setInterval(function() {
               if(i === 0) {
                   return
               } else {
                   i=i-1;
                   dispatch(
                      statsCounter(i)
                   )
               }
           }, 1000);
           return dispatch(
               fetchCurrentStatsSuccess(velocity, visibility)
           )
       })
       .catch(function(error) {
           return dispatch(
            console.log(error)
           )
       })
    }
    execStats();
    setInterval(function() {
        execStats();
    }, 20000);
    }
}

exports.fetchStats = fetchStats;
exports.FETCH_CURRENT_STATS_SUCCESS = FETCH_CURRENT_STATS_SUCCESS;
exports.fetchCurrentStatsSuccess = fetchCurrentStatsSuccess;
exports.STATS_COUNTER = STATS_COUNTER;
exports.statsCounter
