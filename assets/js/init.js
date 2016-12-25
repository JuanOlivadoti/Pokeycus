$(document).on("ready", function(){

  $('.tooltipped').tooltip({delay: 50});

  var list  = [];
  var items = [];
  var data = "";
  var i = 1;
  $.ajax({
    url: "http://pokeapi.co/api/v2/pokemon/",
    success:  manageResults,
    error: handleError
  })

  function manageResults (response){

    var data = response.results;

    data.forEach(function(item){
      var name  = item.name.toUpperCase();
      var pkurl = item.url;

      var poke = `
        <div class="col s12 m4">`+
          `<div class="carousel-cell">`+
            `<a class="carousel-item" href="#" data-src="`+pkurl+`">`+
              `<img class="center-block" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`+i+`.png" alt="`+name+`">`+
              `<h4 class="center-align">`+name+`</h4>`+
            `</a>`+
          `</div>`+
      `</div>
        `
      $('#main-carousel').append(poke);

      i++

    })
  };

  $(document).ajaxComplete(function(){

    $('.main-carousel').flickity({
      // options
      cellAlign: 'center',
      contain: true,
      wrapAround: true
    });

  });



  function getPokeInfo(response){
    console.log(response);
  }

  function handleError(err){
    console.log(err);
  }

});


