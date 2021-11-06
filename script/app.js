const APIKEY = "db006036";
let searchinput = "", poster = "", title = "", year = "", plot = "", rating = "", card="", id="";

const SearchForMovie = async function(searchText) {
	const jsonResultsSearch = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&type=movie`;
	
	const request = await fetch(`${jsonResultsSearch}`);
	const data = await request.json();
	//console.log(data);
	const results = data.Search;
	//console.log(results);//alle resultaten
	//console.log(data.Search[0].Title);//titel van de eerste film

	const jsonResultsId = `http://www.omdbapi.com/?apikey=${APIKEY}&i=${results.imdbId}&plot=full&type=movie`;
	const request2 = await fetch(`${jsonResultsId}`);
	const data2 = await request2.json();
	console.log(data2);
	

	let htmlString = "";
	for(const item of results){
		// console.log(item);
		// console.log(item.Title);
		htmlString += `<div class="c-poster"><img class="c-poster__image js-poster" src="${item.Poster}" alt="Movie/Serie poster"></div>
		<label for="title" name="title" class="c-card__title js-title">${item.Title}</label>
		<label for="year" name="year" class="c-card__year js-year">${item.Year}</label>`;
	}

	card.innerHTML = htmlString;

	// <label for="rating" name="rating" class="c-card__rating js-rating">${results.Rating}</label>
	// <label for="plot" name="plot" class="c-card__plot js-plot"></label>

	//http://www.omdbapi.com/?apikey=db006036&t=a%20good%20day%20to%20die%20hard&plot=full
	//https://www.imdb.com/title/tt1606378/ --> imdb code meegeven in url toont de imdb pagina van de film
};

const GetOneMovie = function(id){
	return `http://www.omdbapi.com/?apikey=${APIKEY}&i=${id}&plot=full&type=movie`;
}

document.addEventListener('DOMContentLoaded', function() {
	searchinput = document.querySelector(".js-searchinput");
	// btnsearch = document.querySelector(".js-btnsearch");
	poster = document.querySelector(".js-poster");
	title = document.querySelector(".js-title");
	year = document.querySelector(".js-year");
	rating = document.querySelector(".js-rating");
	plot = document.querySelector(".js-plot");
	card = document.querySelector(".js-card");

	searchinput.addEventListener("keyup", function(e){
		if (e.key=='Enter'){
			console.log('pushed ENTER');
			
			SearchForMovie(searchinput.value);
			//console.log(searchinput.value)
			e.preventDefault();
		}
		
	})
	
});
