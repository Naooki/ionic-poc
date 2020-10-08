var exec = require('cordova/exec');

var hotelLister = {
  /* code will be added here later */
  title: 'Hotel Lister Plugin Title',
  queryHotels: function(successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'HotelLister', 'queryHotels');
  },
};

module.exports = hotelLister;