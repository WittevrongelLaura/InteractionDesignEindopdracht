const APIKEY = "db006036";
const ENDPOINT = `http://www.omdbapi.com/?apikey=${APIKEY}&`;
let searchinput = "", poster = "", title = "", year = "", plot = "", rating = "", card="", id="", links = "", resultNumber = "";
let selectedId, detailsbtn;
let details, moredetails, timeline;
let carddetailbtn;

const ShowLatestMovies = async function(){
	let year = new Date().getFullYear();
	console.log(year);

	const jsonResultsLatest = `${ENDPOINT}s=iui&y=${year}`;
	const request = await fetch(`${jsonResultsLatest}`);
	const data = await request.json();
	
	if (data.Search != null){
		console.log(data.Search);
	}else{
		console.log("There are no movies from this year");
	}
}

const SearchForMovie = async function(searchText) {
	cards.innerHTML = ``;
	
	//Search for movie
	const jsonResultsSearch = `${ENDPOINT}s=${searchText}&type=movie`;
	
	const request = await fetch(`${jsonResultsSearch}`);
	const data = await request.json();
	//console.log(data);
	const results = data.Search;
	console.log(results);//all results
	//console.log(data.Search[0].Title);//title from the first movie


	for (result of results){
		console.log(result);
		GetDetails(result.imdbID);
	}

	
	//http://www.omdbapi.com/?apikey=db006036&t=a%20good%20day%20to%20die%20hard&plot=full
	//https://www.imdb.com/title/tt1606378/ --> imdb code meegeven in url toont de imdb pagina van de film
};

const GetDetails = async function (id){
	const jsonResultsId = `${ENDPOINT}i=${id}&plot=full&type=movie`;
	console.log(jsonResultsId);
	const request2 = await fetch(`${jsonResultsId}`);
	const data2 = await request2.json();
	// console.log("data2")
	console.log(data2);
	// console.log(data2.Runtime);
	// console.log(data2.Title);

	//idbmstarrating
	console.log(data2.imdbRating);
	console.log(Math.round(data2.imdbRating));
	

	//runtimebar
	console.log(data2.Runtime);
	let space = data2.Runtime.search(" ");
	let runtime = data2.Runtime.substring(0, space);
	console.log(runtime);

	let hours = runtime / 60;
	console.log(hours);
	console.log(hours.toFixed(2));
	let percentage = 100 / 4 * hours.toFixed(2);
	if (percentage > 100){
		percentage = 100;
	}
	console.log(percentage)

	//4h = 100%
	//2.3h = 100/4*2.3

	let htmlString = ``;
	
	htmlString = `<div class="c-card">
	<div class="c-card__content">
	  <div class="c-card__poster"><img class="c-card__poster--image" src="${data2.Poster}" alt="Movie/Serie poster" /></div>
	  <div class="c-card__info">
		<label class="c-card__title"><h1 for="title" name="title">${data2.Title}</h1></label>
		<label class="c-card__year" for="year" name="year">Year: ${data2.Year}</label>
		<div class="c-card__details c-card__details--imdbrating">
		  <label for="rating" name="rating" class="c-card__rating">IMDB rating</label>
		  <svg class="c-card__details--nostar js-imdbstar1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		  </svg>
		  <svg class="c-card__details--nostar js-imdbstar2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		  </svg>
		  <svg class="c-card__details--nostar js-imdbstar3" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		  </svg>
		  <svg class="c-card__details--nostar js-imdbstar4" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		  </svg>
		  <svg class="c-card__details--nostar js-imdbstar5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		  </svg>
		</div>
		<div class="c-card__details--myrating">
		  <label for="rating" name="rating" class="c-card__rating js-rating">Your rating</label>
		  <svg class="c-card__details--nostar js-mystar1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		  </svg>
		  <svg class="c-card__details--nostar js-mystar2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		  </svg>
		  <svg class="c-card__details--nostar js-mystar3" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		  </svg>
		  <svg class="c-card__details--nostar js-mystar4" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		  </svg>
		  <svg class="c-card__details--nostar js-mystar5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		  </svg>
		</div>

		 <label for="runtime" name="runtime" class="c-card__runtime">Runtime: ${data2.Runtime}</label>
	  </div>

	  <div class="c-card__moredetails">
		<label for="actors" name="actors" class="c-card__actors">Actors: ${data2.Actors}</label>
		<label for="plot" name="plot" class="c-card__plot">${data2.Plot}</label>
	   
	  </div>

	  <div class="c-card__timeline">
		<div class="c-card__timelinelabels">
		  <label class="c-card__timeline--0">0</label>
		  <label class="c-card__timeline--1">1</label>
		  <label class="c-card__timeline--2">2</label>
		  <label class="c-card__timeline--3">3</label>
		  <label class="c-card__timeline--4">4</label>
		</div>

		<div class="c-card__timeline--line">
		  <span class="c-card__timelinespan js-timeline" style=width:${percentage}%></span>
		</div>
	  </div>
	</div>
  </div>`;

  cards.innerHTML += htmlString;

}


document.addEventListener('DOMContentLoaded', function() {
	btnMovies = document.querySelector(".js-btntogglemovies");
	btnSeries = document.querySelector(".js-btntoggleseries");
	Page = document.querySelector(".js-page");

	searchinput = document.querySelector(".js-searchinput");
	// btnsearch = document.querySelector(".js-btnsearch");
	// poster = document.querySelector(".js-poster");
	// title = document.querySelector(".js-title");
	// year = document.querySelector(".js-year");
	// rating = document.querySelector(".js-rating");
	// plot = document.querySelector(".js-plot");
	cards = document.querySelector(".js-cards");

	// detailsbtn = document.querySelector(".js-detailsbtn");
	
	// details = document.querySelector(".js-details");
	// moredetails = document.querySelector(".js-moredetails");
	// timeline = document.querySelector(".js-timeline");

	btnMovies.addEventListener("click", function(){
		console.log("button movies clicked");
		ShowLatestMovies();
	})

	btnSeries.addEventListener("click", function(){
		console.log("button series clicked");
	})

	searchinput.addEventListener("keyup", function(e){
		if (e.key=='Enter'){
			console.log('pushed ENTER');
			
			SearchForMovie(searchinput.value);
			//console.log(searchinput.value)
			e.preventDefault();
		}
		
	})

	
});
