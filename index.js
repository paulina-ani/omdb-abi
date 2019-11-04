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

const showDetails = details => {
  var listItemTitle = document.createElement("ul");
  listItemTitle.classList.add("movieTitle");
  listItem.appendChild(listItemTitle);
  listItemTitle.innerText = `Title: ${details.Title}`;

  const listItemReleased = document.createElement("li");
  listItemReleased.classList.add("movieReleased");
  listItemTitle.appendChild(listItemReleased);
  if (details.Released !== "N/A") {
    listItemReleased.innerText = details.Released;
  } else {
    listItemReleased.innerText = "No data available";
  }

  const listItemRated = document.createElement("li");
  listItemRated.classList.add("movieRated");
  listItemTitle.appendChild(listItemRated);
  if (details.Rated !== "N/A") {
    listItemRated.innerText = `Rating: ${details.imdbRating}`;
  } else {
    listItemRated.innerText = "Rating: No data available";
  }

  const listItemRuntime = document.createElement("li");
  listItemTitle.appendChild(listItemRuntime);
  if (details.Runtime !== "N/A") {
    listItemRuntime.innerText = `Runtime: ${details.Runtime}`;
  } else {
    listItemRuntime.innerText = "Runtime: No data available";
  }

  const listItemDescription = document.createElement("li");
  listItemTitle.appendChild(listItemDescription);

  var myDetails = details.Plot;
  var maxLength = 100;
  var shortenedDetails = myDetails.substr(0, maxLength);
  shortenedDetails = shortenedDetails.substr(
    0,
    Math.min(shortenedDetails.length, shortenedDetails.lastIndexOf(" "))
  );

  if (details.Plot !== "N/A") {
    listItemDescription.innerText = `Description: ${shortenedDetails}`;
  } else {
    listItemDescription.innerText = "Description: No data available";
  }

  const listItemAwards = document.createElement("li");
  listItemTitle.appendChild(listItemAwards);
  if (details.Awards !== "N/A") {
    listItemAwards.innerText = `Awards: ${details.Awards}`;
  } else {
    listItemAwards.innerText = "Awards: No data available";
  }

  var imageCreate = document.createElement("img");
  imageCreate.src = details.Poster;

  if (details.Poster !== "N/A") {
    listItemTitle.appendChild(imageCreate);
  } else {
    imageCreate.src = "/pictures/default.png";
    listItemTitle.appendChild(imageCreate);
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
