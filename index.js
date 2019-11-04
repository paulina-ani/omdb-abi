const requestData = (url, handler) => {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Something is wrong with the data");
    })
    .then(handler);
};

const submitApp = function() {
  var titleSearch = document.getElementById("inputText").nodeValue;
  var urlSearch = "http://www.omdbapi.com/?apikey=f4f6588c&s=" + titleSearch;
  fetch(urlSearch)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Something is wrong with the data. Please check");
    })
    .then(data => {
      return (data.totalResults / 10).toFixed();
    })
    .then(numberOfResults => {
      for (var i = 0; i < numberOfResults; i++) {
        var urlPages =
          "http://www.omdbapi.com/?apikey=f4f6588c&s=" +
          titleSearch +
          "&page=" +
          [i + 1];
        requestData(urlPages, createList);
      }
    });
};
