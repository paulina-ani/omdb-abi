const listItem = document.getElementById("list");

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

const createList = data => {
  if (data.Response == "False") {
    console.log("falsefalse");
    listItemError = document.createElement("div");
    listItemError.classList.add("errorDiv");
    listItem.appendChild(listItemError);
    listItemError.innerText = "There are no results. Please try again";
  } else {
    data.Search.map(movie => {
      const id = movie.imdbID;
      const urlMovie =
        "http://www.omdbapi.com/?apikey=f4f6588c&i=" + id + "&plot=full";
      requestData(urlMovie, showDetails);
      var c = listItem.getElementsByTagName("ul");
      console.log(c.length);
      return listItem;
    }).forEach(item => {
      list.appendChild(item);
    });
  }
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
