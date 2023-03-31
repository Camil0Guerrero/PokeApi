const d = document;

const pokeUrl = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20`,
	$container = d.querySelector(".poke-container");

let spinner = `<article class="spinner"></article>`;

$container.innerHTML = spinner;

const getAll = async () => {
	try {
		let res = await fetch(pokeUrl),
			json = await res.json(),
			template = "";

		if (!res.ok) throw { status: res.status, statusText: err.statusText };

		try {
			for (let i = 0; i < json.results.length; i++) {
				let res = await fetch(json.results[i].url),
					pokemon = await res.json();

				console.log(pokemon);
				if (!res.ok) throw { status: res.status, statusText: err.statusText };

				template += `
        <figure class="poke-card">
			    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
			    <h2>${pokemon.name}</h2>
          <h3>Altura</h3>
			    <p>${pokemon.height}</p>
			    
          <h3>Habilidades</h3>
          <p>${pokemon.abilities[0].ability.name}</p>
			    
				  <h3>Movimientos</h3>
				  <p>${pokemon.moves[0].move.name}</p>
				  <p>${pokemon.moves[1].move.name}</p>
				  <p>${pokemon.moves[2].move.name}</p>
			    
		    </figure>  

        `;
			}
		} catch (err) {
			console.log(err);
			let message = err.statusText || "Ocurrio un error en la peticion fetch";
			$container.innerHTML = `<p>${err.status}: ${message}</p>`;
		}

		$container.innerHTML = template;
	} catch (err) {
		console.log(err);
		let message = err.statusText || "Ocurrio un error en la peticion fetch";
		$container.innerHTML = `<p>${err.status}: ${message}</p>`;
	}
};

d.addEventListener("DOMContentLoaded", getAll);
