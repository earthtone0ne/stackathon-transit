
app.factory('AlertFactory', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var alerts = [{
    id: 0,
    route: 190,
    stop: 27175,
    dir: 'New York',
    start: '8:00',
    end: '8:30',
    interval: '5'

  }];

  return {
    all: function() {
      return alerts;
    },
    remove: function(alert) {
      alerts.splice(alerts.indexOf(alert), 1);
    },
    get: function(alertId) {
      for (var i = 0; i < alerts.length; i++) {
        if (alerts[i].id === parseInt(alertId)) {
          return alerts[i];
        }
      }
      return null;
    }
  };
});
