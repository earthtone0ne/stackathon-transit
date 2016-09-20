app.factory('DashFactory', function($http){
  return {
    getEtaData: function(route, stop){
      let url = '/apiNJT/getStopPredictionsETA.jsp?route='+route +'&stop=' + stop;

      return $http.get(url)
      .then(function (response) {
        if (!response.data) {throw new Error(response.status);}
        let parsedRes = xmlParse(response.data);
        // console.log('etas: ',JSON.stringify(response.data));
        let times = parsedRes.getElementsByTagName('pt');
        let text = parsedRes.getElementsByTagName('pu');
        let etaList = [];
        for (let i = 0; i<times.length; i++){
          if (isNaN(+times[i].innerHTML)){
            etaList.push(text[i].innerHTML);
          } else {
            etaList.push(times[i].innerHTML);
          }
        }
        return etaList;
      })
      .catch(function(err) {
        console.log(JSON.stringify(err));
      });
    },

    getDirs: function(route, dirName) {
      let url = '/apiNJTmap/getDirectionsStopsForRoute.jsp?route='+route;
      if (dirName) {
        url += '&direction='+encodeURIComponent(dirName);
      }

      return $http.get(url)
      .then(function(response){
        let parsedRes = xmlParse(response.data);
        let elemArray = parsedRes.getElementsByTagName('direction');
        let result = {stops: {}};
        let dirIndex = 0;
        result.dirs = [elemArray[0].firstChild.nextSibling.innerHTML,
          elemArray[1].firstChild.nextSibling.innerHTML];
        if (result.dirs[1] === dirName) {
          dirIndex = 1;}
        result.stops[0] = stopsParse(elemArray[dirIndex]);
        return result;
      })
      .catch(function(err){
        console.log('getDirs',JSON.stringify(err));
      });
    }
  };

  function xmlParse (data){
      const parser = new DOMParser();
      return parser.parseFromString(data, 'text/xml');

  }
  function stopsParse(inputArray){
    let stops = [];
    let nameArray = inputArray.getElementsByTagName('name');
    let idArray = inputArray.getElementsByTagName('id');
    // console.log(idArray[0].innerHTML)
    for (let i = 1; i < nameArray.length; i++) {
      stops.push({
        name: nameArray[i].innerHTML,
        id: idArray[i-1].innerHTML
      });
    }
    return stops;
  }
});
