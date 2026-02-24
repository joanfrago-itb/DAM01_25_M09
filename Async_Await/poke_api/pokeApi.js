function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function getPokemons() {
   try {
	   let offset = getRandomInt(1000)
       const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=4&offset="+offset);
       if (!res.ok) {
           throw new Error(`Error HTTP ${res.status}`);
       }
       const json = await res.json();
		muestraPokemons(json)

   } catch (error) {
       console.error("Error:", error);
   }
}

function muestraPokemons(val){
	let pokemonsDiv = document.getElementById("pokemons");
	for(pokemon of val.results){
		let html = "<tr>";
		html += "<td>"pokemon.name+"</td>";
		html += "<td>"+getPokemonImg(pokemon)+"</td>";
		html += "<td>"getPokemonTypes(pokemon)+"</td>";
		html += "<td>"getPokemonId(pokemon)+"</td>";
		html += "</tr>";

		pokemonsDiv.innerHTML += html;
	}
	console.log(val)
}

getPokemonImg(pokemon){
	return "<img></img>";
}

getPokemonTypes(pokemon){
	return "None";
}

getPokemonId(pokemon){
	return "111";
}
