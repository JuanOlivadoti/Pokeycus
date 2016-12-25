// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

PokemonApp.Pokemon = function(pokemonUri) {
	this.id = PokemonApp.idFromUri(pokemonUri);
};

PokemonApp.Pokemon.prototype.render = function() { //prototype deja el método en todas las instancias de Pokemon ( no de PokemonApp)
	console.log("Rendering pokemon: #" + this.id);

	$.ajax({
		url: "/api/pokemon/" + this.id,
		success: function (response) {

			$("#js-pkmn-name").text(response.name);
			$("#js-pkmn-number").text(" id." + response.pkdx_id);
			$("#js-pkmn-height").text(response.height);
			$("#js-pkmn-weight").text(response.weight);
			$("#js-pkmn-hp").text(response.hp);
			$("#js-pkmn-ad").text(response.attack + " - " + response.defense);
			$("#js-pkmn-sp").text(response.sp_atk + " - " + response.sp_def);
			$("#js-pkmn-speed").text(response.speed);
			$("#js-pkmn-type").text(response.types.map(function(element){return element.name}).toString());

			$("#js-pkmn-image").attr('src', ("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+response.pkdx_id+".png"));

			// console.log(response.sprites[0].resource_uri);


			$.ajax({
				url: "/api/sprites" + response.sprites[0].resource_uri,
				success: function (response) {
					console.log(response);
					console.log(response.sprites[0].resource_uri);
				}

			});

			// $("#ja-pkmn-image").attr('src', pkmImg);

			$(".js-pokemon-modal").modal("show");
		}
	});
};

PokemonApp.idFromUri = function(pokemonUri){
	var uriSegments = pokemonUri.split("/");
	var secondLast = uriSegments.length - 2;
	return uriSegments[secondLast];
};

$(document).on('ready', function(){

	$(".js-show-pokemon").on("click", function(event){
		var $button = $(event.currentTarget); //currentTarget dispara el target actual no todos los botones.
		var pokemonUri = $button.data("pokemon-uri");

		var pokemon = new PokemonApp.Pokemon(pokemonUri);
		pokemon.render();
	});
});
