var sUrl, oData, setting, apiUrl, apiKey, output, fav;

setting = settings();

apiUrl = setting.api_url;
apiKey = setting.api_key;
output = '';

$.ajax({
  url: "getfavorites",
  success: function(result){
    fav = $.parseJSON(result);

    $.each(fav, (index, movie) => {
        sUrl = apiUrl + '?i=' + movie.imdbID + '&type=movie&apikey=' + apiKey;

        $.ajax(sUrl, {
            complete: function(p_oXHR, p_sStatus){
                oData = $.parseJSON(p_oXHR.responseText);
                //console.log(oData);

          			if (oData.Response === "False") {
        				  output='<b>Movie not found!</b>';
          			} else {
                  output = `
                      <div class="row well">
                        <div class="col-md-3 text-center">
                          <img src="${oData.Poster}" class="movie-poster">
                        </div>
                        <div class="col-md-9">
                          <h3>${oData.Title}</h3>
                          <p>${oData.Year}</p>
                          <a onclick="movieRemove('${oData.imdbID}')" class="btn btn-primary favorite" href="#">Remove</a>
                        </div>
                      </div>
                    `;
                }

                $('.movies-favorites').append(output);
            }
        });
    });
  }
});

function movieRemove(id) {
    $.ajax({
      url: "removefavorite",
      method: "GET",
      data: {imdbID:id},
      success: function(result){
        alert(result);
        location.reload();
      }
    });
}
