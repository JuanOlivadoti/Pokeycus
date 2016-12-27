$(document).on("ready", function(){

  $('.tooltipped').tooltip({delay: 50});

  var data;
  var i = 1;
  var randId = Math.floor(Math.random() * 700) + 1;

  // First list of Pokemons
  $.ajax({
    url: "http://pokeapi.co/api/v2/pokemon/",
    success:  listResults,
    error: handleError
  })

  // Listing Pokemons
  function listResults (response){

    var data = response.results;
    var prev = response.previous;
    var next = response.next;

    $('button#prev').removeAttr('data-src');
    $('button#next').removeAttr('data-src');

    $('button#prev').attr('data-src',prev);
    $('button#next').attr('data-src',next);

    if (prev == null) {
      $('button#prev').attr('class','btn disabled');
    } else {
      $('button#prev').attr('class','btn');
    }

    data.forEach(function(item){
      var name  = item.name.toUpperCase();
      var pkurl = item.url;

      var poke = `
        <li class="collection-item avatar">`+
          `<img class="circle" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`+i+`.png" alt="`+name+`">`+
          `<span class="title">`+name+`</span><br>`+
          `<a href="#" class="green-text" data-src="`+name+`">I Choose you!</a>`+
        `</li>`

      $('#list-body').prepend(poke);

      i++

    })
  };

  // List pokemons on click

  $('#list button').click(function(event){

    var newList = $(event.target).attr('data-src');

    console.log(newList)

    $('#list ul').empty();

    $.ajax({
      url: newList,
      success: listResults,
      error: handleError
    })

  })

  // RANDOM POKEMON SEARCH
  $.ajax({
    url: 'http://pokeapi.co/api/v2/pokemon/'+randId,
    success: pokemonSelection,
    error: handleError
  })

  // pokemon selection function
  function pokemonSelection(response){

    var pokeImg = response.sprites.front_default;
    var pokeNam = response.name.toUpperCase();
    var pokeTwi = "@"+response.name;
    var pokeId  = response.id;
    var pokeHei = (response.height/10);
    var pokeWei = (response.weight/10);
    var pokeExp = response.base_experience;
    var pokeTys = response.types;
    var pokeSta = response.stats;

    $('#inner-card-img').attr('src',pokeImg);
    $('#card-name b').text(pokeNam);
    $('#card-twitter').text(pokeTwi);
    $('#card-id').text(pokeId);
    $('#card-height').text(pokeHei);
    $('#card-weight').text(pokeWei);
    $('#card-base-exp').text(pokeExp);

    $('#types').empty();

    pokeTys.forEach(function(item){
      var pokeType = item.type.name;
      var classColor;

      switch (pokeType) {
        case "normal" :
          classColor = "black-text white";
            break;
        case "fighting" :
          classColor = "white-text red";
            break;
        case "flying" :
          classColor = "black-text yellow";
            break;
        case "poison" :
          classColor = "black-text lime";
            break;
        case "ground" :
          classColor = "white-text brown darken-2";
            break;
        case "rock" :
          classColor = "white-text grey";
            break;
        case "bug" :
          classColor = "white-text indigo";
            break;
        case "ghost" :
          classColor = "white-text light-blue darken-1";
            break;
        case "steel" :
          classColor = "white-text grey darken-2";
            break;
        case "fire" :
          classColor = "white-text orange";
            break;
        case "water" :
          classColor = "white-text blue";
            break;
        case "grass" :
          classColor = "white-text green";
            break;
        case "electric" :
          classColor = "white-text yellow darken-2";
            break;
        case "psychic" :
          classColor = "white-text deep-orange darken-2";
            break;
        case "ice" :
          classColor = "white-text light-blue accent-3";
            break;
        case "dragon" :
          classColor = "white-text red accent-4";
            break;
        case "dark" :
          classColor = "white-text black";
            break;
        case "fairy" :
          classColor = "white-text teal";
            break;
        case "shadow" :
          classColor = "black-text blue-grey darken-2";
            break;
        default:
          classColor = "white-text black"
      };

      var typeButton = `
        <li><a class="btn `+classColor+`" href="#">`+pokeType+`</a></li>`

      $('#types').append(typeButton);

    });

    $('p#spe').css('width',(pokeSta["0"].base_stat*10/25)+"%");
    $('p#sp-def').css('width',(pokeSta["1"].base_stat*10/25)+"%");
    $('p#sp-att').css('width',(pokeSta["2"].base_stat*10/25)+"%");
    $('p#def').css('width',(pokeSta["3"].base_stat*10/25)+"%");
    $('p#att').css('width',(pokeSta["4"].base_stat*10/25)+"%");
    $('p#ps').css('width',(pokeSta["5"].base_stat*10/25)+"%");
  };

  // Pokemon selection on click
  $('ul#list-body').click(function(){

    var pokeUri = $(event.target).data('src');

    $.ajax({
      url: 'http://pokeapi.co/api/v2/pokemon/'+pokeUri.toLowerCase(),
      success: pokemonSelection,
      error: handleError
    })
  })

  function handleError(err){
    console.log(err);
  }

});
