app.factory('DashFactory', function($http){
  return {
    getEtaData: function(route, stop){
      var url = '/apiNJT/getStopPredictionsETA.jsp?route='+route +'&stop=' + stop;

      return $http.get(url)
      .then(function (response) {
        if (!response.data) {throw new Error(response.status);}
        var parsedRes =xmlParse(response.data);
        // console.log('etas: ',JSON.stringify(response.data));
        var times = parsedRes.getElementsByTagName('pt');
        var text = parsedRes.getElementsByTagName('pu');
        var etaList =[];
        for (var i = 0; i<times.length; i++){
          if (isNaN(+times[i].innerHTML)){
            etaList.push(text[i].innerHTML);
          } else {
            etaList.push(times[i].innerHTML);
          }
        }
        return etaList;
      })
      .catch(function(err){console.log(JSON.stringify(err));});
    },

    getDirs: function(route, dirName) {
      console.log('getdirs dirname:'+ dirName, 'route:' +route );
      var url = '/apiNJTmap/getDirectionsStopsForRoute.jsp?route='+route;
      if (dirName){url+= '&direction='+encodeURIComponent(dirName)}

      return $http.get(url)
      .then(function(response){
        var parsedRes= xmlParse(response.data);
        var elemArray = parsedRes.getElementsByTagName('direction');
        var result ={stops: {}};
        var dirIndex= 0;
        result.dirs = [elemArray[0].firstChild.nextSibling.innerHTML,
          elemArray[1].firstChild.nextSibling.innerHTML];
        // console.log('resultdirs1',result.dirs[1]) //confirmed dirName
        if (result.dirs[1] === dirName){ dirIndex = 1;}
        result.stops[0] = stopsParse(elemArray[dirIndex]);
        return result;
      })
      .catch(function(err){console.log('getDirs',JSON.stringify(err));});
    }
  };

  function xmlParse (data){
      var parser = new DOMParser();
      var done= parser.parseFromString(data, 'text/xml');
      // console.log('parser', done);
      return done;
  }
  function stopsParse(inputArray){
    var stops = [];
    var nameArray=inputArray.getElementsByTagName('name');
    var idArray=inputArray.getElementsByTagName('id');
    // console.log(idArray[0].innerHTML)
    for (var i = 1; i < nameArray.length; i++) {
      stops.push({name: nameArray[i].innerHTML, id: idArray[i-1].innerHTML});
      }
    return stops;
  }
});
