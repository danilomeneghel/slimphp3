function settings() {
    var callback="";

    $.ajax({
      url: "getSettings",
      async: false,
      success: function(result){
        callback = $.parseJSON(result);
      }
    });

    return callback;
}
