const d = document;

const getPokemons = async () => {
	const pokeEndpoint = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20";
	$container = d.querySelector(".poke-container");

	try {
		let res = await fetch(pokeEndpoint),
			json = await res.json(),
			template = "";

		if (!res.ok) throw { status: res.status, statusText: res.statusText };

		console.log(json);

		for (let i = 0; i < json.results.length; i++) {
			try {
				let res = await fetch(json.results[i].url),
					pokemon = await res.json();

				template += `<img src="${pokemon.sprites.front_default}" alt="pokemon.name" />`;
			} catch (err) {
				console.log(`Error:`, err);
			}
		}
		$container.innerHTML = template;
	} catch (err) {
		let message = err.statusText || "Ocurrio un error";
		console.log(err);
		$container.innerHTML = `<p>${err.status}: ${message}</p>`;
	}
};

d.addEventListener("DOMContentLoaded", getPokemons());
