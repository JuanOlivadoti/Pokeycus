$(document).on("ready", function(){

  $('.tooltipped').tooltip({delay: 50});

  var list  = [];
  var items = [];

  function manageResults (response){

    var data = response.results;
    var i = 1;

    data.sort(function(a, b){
      var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
      if (nameA < nameB)
          return -1
      if (nameA > nameB)
          return 1
      return 0
    })

    data.forEach(function(item){
      var name  = item.name.toUpperCase();
      var pkurl = item.url;

      console.log(i);

      list.push(name);
      console.log(name);

      var poke = `
        <div class="col s12 m4">`+
          `<div class="carousel-cell">`+
            `<a class="carousel-item" href="`+pkurl+`">`+
              `<img class="center-block" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`+i+`.png" alt="`+name+`">`+
              `<h4 class="center-align">`+name+`</h4>`+
            `</a>`+
          `</div>`+
      `</div>
        `

      console.log(poke);

      $('#main-carousel').append(poke);

      i++

    })

    for(i in data)
    items.push([i,data[i]]);

    // console.log(items);


  };

  $.ajax({
    url: "http://pokeapi.co/api/v2/pokemon/",
    success:  manageResults
  })

  $(document).ajaxComplete(function(){

    $('.main-carousel').flickity({
      // options
      cellAlign: 'left',
      contain: true,
      wrapAround: true
    });

    // $('.carousel').carousel();
  });

});


