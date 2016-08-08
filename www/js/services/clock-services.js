app.factory('ClockSvc', function($interval){
  var clock = null;
  var service = {
    startClock: function(fn){
      if(clock === null){
        clock = $interval(fn, 1000);
      }
    },
    stopClock: function(){
      if(clock !== null){
        $interval.cancel(clock);
        clock = null;
      }
    },
    getNow: function () {
      var dateNow = {
        currDate: new Date(),
        mins: ('0' + this.currDate.getMinutes()).slice(-2),
        time: this.currDate.getHours() + ":" + this.mins,
        dateStr: this.currDate.getMonth()+1 + '-' + this.currDate.getDate() + '-' + this.currDate.getFullYear()
      };
      console.log('date', dateNow);
      return dateNow
    }
  };

  return service;
})
// Display the month, day, and year.


