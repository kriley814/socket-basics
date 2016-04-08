var moment = require('moment');
var now = moment();

// console.log(now.format());
// console.log(now.format('X'));
// console.log(now.valueOf());

var timestamp = 1460121853894;
var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.local().format('h:mm a')); // 11:06 am

// now.subtract(1, 'year');

// console.log(now.format('MMM Do YYYY, h:mm a')); // Oct 5th 2016, 6:45 pm