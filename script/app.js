const APIKEY = "db006036";
const ENDPOINT = `http://www.omdbapi.com/?apikey=${APIKEY}&`;
let searchinput = "", poster = "", title = "", year = "", plot = "", rating = "", card="", id="", links = "", resultNumber = "";
let selectedId, detailsbtn;
let details, moredetails, timeline;
let triggerdetails = false;
let carddetailbtn

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
	//console.log(results[0].imdbID);
	

	//GetDetails(results[0].imdbID);

	
	

	// let htmlString = "";
	
	// for(const item of results){
	// 	// console.log(item);
	// 	// console.log(item.Title);
		
	// 	htmlString += 
	// 		`		   
	// 		<div class="c-card">
	// 		<div class="c-card__content js-cardcontent">
	// 		  <div class="c-card__poster"><img class="c-card__poster--image js-poster" src="${item.Poster}" alt="Movie/Serie poster" /></div>
	// 		  <div class="c-card__info">
	// 			<label class="c-card__title js-title"><h1 for="title" name="title">${item.Title}</h1></label>
	// 			<label class="c-card__year js-year" for="year" name="year">${item.Year}</label>
	// 			<div class="c-card__detail js-detailsbtn">
	// 			  <input class="c-card__detail--link " type="button" value="details"/>
	// 			  <span class="c-toggle-arrow">

	// 				<input class="c-toggle-arrow__checkbox o-hide-accessible" id="togglearrow" type="checkbox"/>
	// 				<label class="c-toggle-arrow__label" for="togglearrow">
	// 				  <svg class="c-toggle-arrow__icon" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000">
	// 					<path d="M0 0h24v24H0V0z" fill="none" />
	// 					<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
	// 				  </svg>
	// 				</label>
	// 			  </span>
					
	// 			</div>
				
	// 		  </div>
	// 				  </div>
	// 				  </div>`;	   
	// }

	// cards.innerHTML = htmlString;


	for (result of results){
		console.log(result);
		GetDetails(result.imdbID);
	}

	//link klikken -> film/serie detail geven
	// links = document.querySelectorAll(".js-card-link");
	// resultNumber = document.querySelectorAll(".js-imdbid");
	
	// for (const link of links){
	// 	console.log(link);
	// 	link.addEventListener('click' , function(){
	// 		console.log("Clicked title: " + link.innerText);
	// 		//number geven van aangeklikte card
	// 		console.log(link.imdbID);
	// 		console.log(GetMovieByTitle(link.innerText));
	// 	});
	// }

	// <label for="rating" name="rating" class="c-card__rating js-rating">${results.Rating}</label>
	// <label for="plot" name="plot" class="c-card__plot js-plot"></label>

	//http://www.omdbapi.com/?apikey=db006036&t=a%20good%20day%20to%20die%20hard&plot=full
	//https://www.imdb.com/title/tt1606378/ --> imdb code meegeven in url toont de imdb pagina van de film
};

const GetDetails = async function (id){
	const jsonResultsId = `${ENDPOINT}i=${id}&plot=full&type=movie`;
	console.log(jsonResultsId);
	const request2 = await fetch(`${jsonResultsId}`);
	const data2 = await request2.json();
	console.log("data2")
	console.log(data2);
	console.log(data2.Runtime);

	//let htmlString = cards.innerHTML;
	console.log(data2.Title);
	// console.log("htmlstring")
	// console.log(htmlString)
	// for (const item of data2){
	// 	htmlString += 
	// }

	const movieResults = [];
	
	let htmlString = ``;
	
	htmlString = `<div class="c-card">
	<div class="c-card__content js-cardcontent">
	  <div class="c-card__poster"><img class="c-card__poster--image js-poster" src="${data2.Poster}" alt="Movie/Serie poster" /></div>
	  <div class="c-card__info">
		<label class="c-card__title js-title"><h1 for="title" name="title">${data2.Title}</h1></label>
		<label class="c-card__year js-year" for="year" name="year">${data2.Year}</label>
		<div class="c-card__detail js-detailsbtn">
		  <input class="c-card__detail--link " type="button" value="details"/>
		  <span class="c-toggle-arrow">

			<input class="c-toggle-arrow__checkbox o-hide-accessible" id="togglearrow" type="checkbox"/>
			<label class="c-toggle-arrow__label" for="togglearrow">
			  <svg class="c-toggle-arrow__icon" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000">
				<path d="M0 0h24v24H0V0z" fill="none" />
				<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
			  </svg>
			</label>
		  </span>
			
		</div>
		
	  </div>

	  <div class="c-card__details js-details ">
		<div class="c-card__details--imdbrating">
		  <label for="rating" name="rating" class="c-card__rating js-rating">${data2.imdbRating}</label>
		  <svg class="c-card__details--star" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		  </svg>
		  <svg class="c-card__details--nostar" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		  </svg>
		  <svg class="c-card__details--nostar" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		  </svg>
		  <svg class="c-card__details--nostar" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		  </svg>
		  <svg class="c-card__details--nostar" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		  </svg>
		</div>
		<div class="c-card__details--myrating">
		  <label for="rating" name="rating" class="c-card__rating js-rating">Your rating</label>
		  <svg class="c-card__details--nostar" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		  </svg>
		  <svg class="c-card__details--nostar" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		  </svg>
		  <svg class="c-card__details--nostar" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		  </svg>
		  <svg class="c-card__details--nostar" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		  </svg>
		  <svg class="c-card__details--nostar" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		  </svg>
		</div>

		 <label for="runtime" name="runtime" class="c-card__runtime js-runtime">Runtime: ${data2.Runtime}</label>
	  </div>

	  <div class="c-card__moredetails  js-moredetails">
		<label for="actors" name="actors" class="c-card__actors js-actors">Actors: ${data2.Actors}</label>
		<label for="plot" name="plot" class="c-card__plot js-plot">${data2.Plot}</label>
	   
	  </div>

	  <div class="c-card__timeline  js-timeline">
		<div class="c-card__timelinelabels">
		  <label class="c-card__timeline--0">0</label>
		  <label class="c-card__timeline--1">1</label>
		  <label class="c-card__timeline--2">2</label>
		  <label class="c-card__timeline--3">3</label>
		  <label class="c-card__timeline--4">4</label>
		</div>

		<div class="c-card__timeline--line">
		  <span class="c-card__timelinespan"></span>
		</div>
	  </div>
	</div>
  </div>`;

  cards.innerHTML += htmlString;

}

const RotateSvg = function(state) {
	if (state){
		//details aan --> pijl moet omhoog richten

	} else {
		//details weer dicht --> pijl moet omlaag richten

	}
}

const ShowDetails = function(){

}

const GetMovieByTitle = function(title){
	return `http://www.omdbapi.com/?apikey=${APIKEY}&t=${title}&plot=full&type=movie`;
}

const GetMovieByImdbID = function(id){
	return `http://www.omdbapi.com/?apikey=${APIKEY}&i=${id}&plot=full&type=movie`;
}

document.addEventListener('DOMContentLoaded', function() {
	btnMovies = document.querySelector(".js-btntogglemovies");
	btnSeries = document.querySelector(".js-btntoggleseries");
	Page = document.querySelector(".js-page");

	searchinput = document.querySelector(".js-searchinput");
	// btnsearch = document.querySelector(".js-btnsearch");
	poster = document.querySelector(".js-poster");
	title = document.querySelector(".js-title");
	year = document.querySelector(".js-year");
	rating = document.querySelector(".js-rating");
	plot = document.querySelector(".js-plot");
	cards = document.querySelector(".js-cards");

	detailsbtn = document.querySelector(".js-detailsbtn");
	
	details = document.querySelector(".js-details");
	console.log(details)
	moredetails = document.querySelector(".js-moredetails");
	timeline = document.querySelector(".js-timeline");

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

	// detailsbtn.addEventListener("click", function(){
	// 	console.log("clicked details");
	// 	if (!triggerdetails){
	// 		console.log("open details")
	// 		triggerdetails = true;
	// 		console.log(details)
	// 		details.classList.remove("u-hide");
	// 		moredetails.classList.remove("u-hide");
	// 		timeline.classList.remove("u-hide");

	// 		// RotateSvg(triggerdetails);

	// 		ShowDetails();
	// 	} else {
	// 		triggerdetails = false;
	// 		// RotateSvg(triggerdetails);
	// 		console.log("close details");
	// 		details.classList.add("u-hide");
	// 		moredetails.classList.add("u-hide");
	// 		timeline.classList.add("u-hide");
	// 	}
		
	// })
	
});
