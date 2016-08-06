app.factory('DashFactory', function($http){
  return {
    getNJTdata: function(route, stop){
      var url = '/apiNJT/getStopPredictionsETA.jsp?route='+route +'&stop=' + stop;

      return $http.get(url)
      .then(function (response) {
        if (!response.data) {throw new Error(response.status);}
        var parser = new DOMParser();
        var parsedRes = parser.parseFromString(response.data, 'text/xml');
        console.log(JSON.stringify(response.data))
        var times = parsedRes.getElementsByTagName('pt');
        var text = parsedRes.getElementsByTagName('pu');
        var etaList =[];
        for (var i = 0; i<times.length; i++){
          if (isNaN(+times[i].innerHTML)){
            etaList.push(text[i].innerHTML)
          } else {
            etaList.push(times[i].innerHTML)
          }
        }
        return etaList;
      })
      .catch(function(err){console.log(JSON.stringify(err));});
    }
  };
})
