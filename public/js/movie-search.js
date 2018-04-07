var $form = $('.search-movie'), $movies = $('.movies');
$movies.hide();

$form.on('submit', function(p_oEvent){
    p_oEvent.preventDefault();
    var sUrl, sMovie, oData, setting, apiUrl, apiKey, output;
    setting = settings();

    apiUrl = setting.api_url;
    apiKey = setting.api_key;

		sMovie = $form.find('input').val();
    sUrl = apiUrl + '?s=' + sMovie + '&type=movie&apikey=' + apiKey;

    $.ajax(sUrl, {
        complete: function(p_oXHR, p_sStatus){
            oData = $.parseJSON(p_oXHR.responseText);
            //console.log(oData);

      			if (oData.Response === "False") {
    				  output='<b>Movie not found!</b>';
      			} else {
              output = '';
              $.each(oData.Search, (index, movie) => {
                output += `
                  <div class="row well">
                    <div class="col-md-3 text-center">
                      <img src="${movie.Poster}" class="movie-poster">
                    </div>
                    <div class="col-md-9">
                      <h3>${movie.Title}</h3>
                      <p>${movie.Year}</p>
                      <a onclick="movieFavorite('${movie.imdbID}')" class="btn btn-primary favorite" href="#">Favorite</a>
                    </div>
                  </div>
                `;
              });
            }

            $movies.html(output);
            $movies.show();
        }
    });
});

function movieFavorite(id) {
    $.ajax({
      url: "addfavorite",
      method: "GET",
      data: {imdbID:id},
      success: function(result){
        alert(result);
      }
    });
}
