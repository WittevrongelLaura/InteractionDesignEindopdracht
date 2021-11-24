const APIKEY = "db006036";
let searchinput = "", poster = "", title = "", year = "", plot = "", rating = "", card="", id="", links = "", resultNumber = "";

const SearchForMovie = async function(searchText) {

	//Search for movie
	const jsonResultsSearch = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&type=movie`;
	
	const request = await fetch(`${jsonResultsSearch}`);
	const data = await request.json();
	//console.log(data);
	const results = data.Search;
	console.log(results);//all results
	//console.log(data.Search[0].Title);//title from the first movie

	// const jsonResultsId = `http://www.omdbapi.com/?apikey=${APIKEY}&i=${results.imdbId}&plot=full&type=movie`;
	// const request2 = await fetch(`${jsonResultsId}`);
	// const data2 = await request2.json();
	// console.log(data2);
	

	let htmlString = "";
	let number = 1;
	for(const item of results){
		// console.log(item);
		// console.log(item.Title);
		htmlString += `<div class="js-imdbid">"${item.imdbID}"</div>
		<div class="c-poster"><img class="c-poster__image js-poster" src="${item.Poster}" alt="Movie/Serie poster"></div>
		<label for="title" name="title" class="c-card__title js-title"><a class="c-card__link js-card-link">${item.Title}</a></label>
		<label for="year" name="year" class="c-card__year js-year">${item.Year}</label>`;
		number += 1;
	}

	card.innerHTML = htmlString;
	

	//link klikken -> film/serie detail geven
	links = document.querySelectorAll(".js-card-link");
	resultNumber = document.querySelectorAll(".js-imdbid");
	
	for (const link of links){
		console.log(link);
		link.addEventListener('click' , function(){
			console.log("Clicked title: " + link.innerText);
			//number geven van aangeklikte card
			console.log(link.imdbID);
			console.log(GetMovieByTitle(link.innerText));
		});
	}
	




	// <label for="rating" name="rating" class="c-card__rating js-rating">${results.Rating}</label>
	// <label for="plot" name="plot" class="c-card__plot js-plot"></label>

	//http://www.omdbapi.com/?apikey=db006036&t=a%20good%20day%20to%20die%20hard&plot=full
	//https://www.imdb.com/title/tt1606378/ --> imdb code meegeven in url toont de imdb pagina van de film
};

const GetMovieByTitle = function(title){
	return `http://www.omdbapi.com/?apikey=${APIKEY}&t=${title}&plot=full&type=movie`;
}

const GetMovieByImdbID = function(id){
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
