const d = document;

let pokeEndpoint = "https://pokeapi.co/api/v2/pokemon/";
let $container = d.querySelector(".contain-info");

const getData = async (name) => {
	let res = await fetch(`${pokeEndpoint}${name}`),
		json = await res.json();

	console.log(json);

	$container.innerHTML = `<p>${json.id}</p>`;
};

d.addEventListener("DOMContentLoaded", (e) => {
	const data = getData("pikachu");
});
