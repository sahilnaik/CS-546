(function ($) {
  $.get("http://api.tvmaze.com/shows", function (data) {
    for (var i = 0; i < data.length; i++) {
      $("#showList").append(
        "<li> <a href='http://api.tvmaze.com/shows/" +
          data[i].id +
          "'>" +
          data[i].name +
          "</a></li>"
      );
    }
    $("#showList").removeAttr("hidden");
  });
  let myForm = $("#searchForm");
  myForm.submit(function (e) {
    e.preventDefault();
    let myForm = $("#searchForm");
    let searchTerm = myForm.find('input[name="search_term"]').val();
    let url = "http://api.tvmaze.com/search/shows?q=" + searchTerm;
    $.get(url, function (data) {
      $("#showList").empty();
      $("#errorDiv").empty();
      $("#errorDiv").attr("hidden", true);
      $("#show").empty();
      $("#show").attr("hidden", true);
      if (data.length == 0) {
        if (searchTerm.trim() == "") {
          $("#errorDiv").append(
            "<p id='error'>Search term cannot be empty</p>"
          );

          $("#errorDiv").removeAttr("hidden");
        } else {
          $("#errorDiv").append("<p id='error'>No results found</p>");
          $("#errorDiv").removeAttr("hidden");
        }
      }

      for (var i = 0; i < data.length; i++) {
        $("#showList").append(
          "<li><a  href='http://api.tvmaze.com/shows/" +
            data[i].show.id +
            "'>" +
            data[i].show.name +
            "</a></li>"
        );
      }
      $("#homeLink").removeAttr("hidden");
      $("#showList").removeAttr("hidden");
    });
  });
  $("#showList").click(function (e) {
    e.preventDefault();
    let url = e.target.href;

    $.get(url, function (data) {
      $("#errorDiv").empty();
      $("#errorDiv").attr("hidden", true);
      if (data.name != undefined) {
        $("#showList").attr("hidden", true);
        $("#showList").empty();
        $("#show").empty();
        $("#show").append("<h1>" + data.name + "</h1>");
        if (data.image != null) {
          $("#show").append(
            "<img src='" + data.image.medium + "' alt='" + data.name + "'>"
          );
        } else {
          $("#show").append("<img src='/public/media/img.jpeg'>");
        }
        $("#show").append("<dl id='definition'></dl");
        if (data.language != null) {
          $("#definition").append(
            "<dt>Language</dt><dd>" + data.language + "</dd>"
          );
        } else {
          $("#definition").append("<dt>Language</dt><dd>N/A</dd>");
        }
        $("#definition").append("<dt>Genre</dt>");
        $("#definition").append("<dd id='genre'></dd>");
        $("#genre").append("<ul id='genreUL'></ul>");
        if (data.genres != null) {
          let genres = data.genres;
          if (genres.length == 0) {
            $("#definition").append("<dd>N/A</dd>");
          } else {
            for (var i = 0; i < data.genres.length; i++) {
              $("#genreUL").append("<li>" + data.genres[i] + "</li>");
            }
          }
        } else {
          $("#definition").append("<ul>N/A</ul>");
        }

        if (data.rating != null) {
          if (data.rating.average != null) {
            $("#definition").append(
              "<dt>Rating</dt><dd>" + data.rating.average + "</dd>"
            );
          } else {
            $("#definition").append("<dt>Rating</dt><dd>N/A</dd>");
          }
        } else {
          $("#definition").append("<dt>Rating</dt><dd>N/A</dd>");
        }
        if (data.network != null) {
          if (data.network.name != null) {
            $("#definition").append(
              "<dt>Network</dt><dd>" + data.network.name + "</dd>"
            );
          } else {
            $("#definition").append("<dt>Network</dt><dd>N/A</dd>");
          }
        } else {
          $("#definition").append("<dt>Network</dt><dd>N/A</dd>");
        }
        if (data.summary != null) {
          $("#definition").append(
            "<dt>Summary</dt><dd>" + data.summary + "</dd>"
          );
        } else {
          $("#definition").append("<dt>Summary</dt><dd>N/A</dd>");
        }

        $("#homeLink").removeAttr("hidden");
        $("#show").removeAttr("hidden");
      }
    });
  });
})(jQuery);
