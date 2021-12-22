const APIKEY = "db006036";
const ENDPOINT = `http://www.omdbapi.com/?apikey=${APIKEY}&`;
let searchinput = "";
let imdbStar1, imdbStar2, imdbStar3, imdbStar4, imdbStar5;
let mystars;
let mystar1, mystar2, mystar3, mystar4, mystar5;
let loader, resultsmessage, inputmessage;
//var htmlString = ``;

const ShowRandom = async function(type){
	loader.classList.remove("u-hide");
	cards.innerHTML = ``;
	//1 random
	const arrnumbers = [0,1,2,3,4,5,6,7,8,9];
	let year = new Date().getFullYear();
	//console.log(year);
	let randomid = "";

	for (let i = 0; i < 7; i++){
		//console.log(i);
		randomid += arrnumbers[Math.floor(Math.random()*arrnumbers.length)].toString();
		//console.log(randomid);
	}

	randomid = "tt" + randomid;
	console.log(randomid);

	const jsonResultsLatest = `${ENDPOINT}i=${randomid}&y=${year}&type=${type}`;
	const request = await fetch(`${jsonResultsLatest}`);
	const data = await request.json();
	//sleep(1000);
	console.log(data);

	if (data.Response == "False" || data.imdbRating == "N/A"){
		ShowRandom();//weer opnieuw uitvoeren als response false is (id bestaat niet)
	} else {
		setTimeout(console.log(data) , 1000);
		loader.classList.add("u-hide");
		console.log(data.imdbRating);
		BuildOneCard(data);
		const timeline = document.querySelector(".js-timeline");
		timeline.innerHTML=``;
		if (type == "movie"){
			//const timeline = document.querySelector(".js-timeline");
			timeline.innerHTML = `<label class="c-card__timeline--0">0</label>
			<label class="c-card__timeline--1">1</label>
			<label class="c-card__timeline--2">2</label>
			<label class="c-card__timeline--3">3</label>
			<label class="c-card__timeline--4">4</label>`;
		} else {
			//const timeline = document.querySelector(".js-timeline");
			timeline.innerHTML = `<label class="c-card__timeline--0">0</label>
			<label class="c-card__timeline--1">0.5</label>
			<label class="c-card__timeline--2">1</label>
			<label class="c-card__timeline--3">1.5</label>`;
		}			
	}
}


const Get10Random = async function(type){
	const arrnumbers = [0,1,2,3,4,5,6,7,8,9];
	let year = new Date().getFullYear();
	//console.log(year);
	let randomid = "";

	for (let i = 0; i < 7; i++){
		//console.log(i);
		randomid += arrnumbers[Math.floor(Math.random()*arrnumbers.length)].toString();
		//console.log(randomid);
	}

	randomid = "tt" + randomid;
	console.log(randomid);

	const jsonResultsLatest = `${ENDPOINT}i=${randomid}&y=${year}&type=${type}`;
	const request = await fetch(`${jsonResultsLatest}`);
	const data = await request.json();
	//sleep(1000);
	console.log(data);
	//setTimeout(console.log(data), 1000);
	if (data.Response == "False"){
		GetRandom();//weer opnieuw uitvoeren als response false is (id bestaat niet)
	} else {
		let arrRandom = [];
		let random = data;

		console.log("randie")
		setTimeout(console.log(random) , 1000)
		console.log("randie done")

		for(let i = 0; i < arrRandom.length; i++){
			arrRandom[i] = random;
			GetRandom(type)
		}

		console.log("done");
		for (let i = 0; i < arrRandom.length; i++){
			console.log(arrRandom[i]);
		}
		// setTimeout(console.log(arrRandom), 1000);
	}
	
}

const SearchForResults = async function(searchText, type) {
	if (type == "movie"){
		cards.innerHTML = ``;
		
		//Search for movie
		const jsonResultsSearch = `${ENDPOINT}s=${searchText}&type=${type}`;
		const request = await fetch(`${jsonResultsSearch}`);
		const data = await request.json();
		console.log(data);
		const results = data.Search;
		if (results == null){
			console.log("nothing found");
			resultsmessage.classList.remove("u-hide");
			inputmessage.classList.remove("u-hide");
		} else {
			resultsmessage.classList.add("u-hide");
			inputmessage.classList.add("u-hide");
		}
		console.log(results);//all results

		for (result of results){
			console.log("zoekresultaat");
			console.log(result);
			console.log(result.imdbID);

			//details
			const jsonResultsId = `${ENDPOINT}i=${result.imdbID}&plot=full`;
			// console.log(jsonResultsId);
			const request2 = await fetch(`${jsonResultsId}`);
			const data2 = await request2.json();
			console.log("data2");
			console.log(data2);
			console.log("data2 done");

			//BuildCard(data2);
			
			let string = ``;
			
			//imdb rating
			let rating = Math.round(data2.imdbRating /2);

			//visualisatie van runtime in balk
			let space = data2.Runtime.search(" ");
			let runtime = data2.Runtime.substring(0, space);
			console.log(runtime);
			let hours = runtime / 60;
			console.log(hours)
			let percentage = 100 / 4 * hours.toFixed(2);
			if (percentage > 100){
				percentage = 100;
			}
			console.log(percentage);

			string += `<div class="c-card">
			<div class="c-card__content">
			<div class="c-card__poster"><img class="c-card__poster--image" src="${data2.Poster}" alt="Movie/Serie poster" /></div>
			<label class="c-card__title"><h1 class="c-card__title--title" for="title" name="title">${data2.Title}</h1></label>
				
			<div class="c-card__info">
				<label class="c-card__year" for="year" name="year">Year: ${data2.Year}</label>
				<div class="c-card__details c-card__details--imdbrating">
				<label for="rating" name="rating" class="c-card__rating">IMDB rating</label>
			
				<svg class="c-card__details--star js-imdbstar1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
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
				<div class="c-card__myrating">
				<input class="o-hide-accessible c-card__detailsstar js-mystar1" type="checkbox" id="input1" />
				<label class="c-label c-card__detailslabel" for="mystar1">
				<svg class="c-card__details--icon c-card__details--nostar js-mystar" id="icon1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
				</svg>
				</label>
				<input class="o-hide-accessible c-card__detailsstar js-mystar2" type="checkbox" id="input2" />
				<label class="c-label c-card__detailslabel" for="mystar2">
				<svg class="c-card__details--icon c-card__details--nostar js-mystar" id="icon2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
				</svg>
				</label>
				<input class="o-hide-accessible c-card__detailsstar js-mystar3" type="checkbox" id="input3" />
				<label class="c-label c-card__detailslabel" for="mystar3">
				<svg class="c-card__details--icon c-card__details--nostar js-mystar" id="icon3" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
				</svg>
				</label>
				<input class="o-hide-accessible c-card__detailsstar js-mystar4" type="checkbox" id="input4" />
				<label class="c-label c-card__detailslabel" for="mystar4">
				<svg class="c-card__details--icon c-card__details--nostar js-mystar" id="icon4" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
				</svg>
				</label>
				<input class="o-hide-accessible c-card__detailsstar js-mystar5" type="checkbox" id="input5" />
				<label class="c-label c-card__detailslabel" for="mystar5">
				<svg class="c-card__details--icon c-card__details--nostar js-mystar" id="icon5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
				</svg>
				</label>
				</div>
			</div>

				<label for="runtime" name="runtime" class="c-card__runtime">Runtime: ${data2.Runtime}</label>
			</div>

			<div class="c-card__moredetails">
				<label for="actors" name="actors" class="c-card__actors">Actors: ${data2.Actors}</label>
				<label for="plot" name="plot" class="c-card__plot">${data2.Plot}</label>
			
			</div>

			<div class="c-card__timeline">
				<div class="c-card__timeline--labels js-timeline">
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

			cards.innerHTML += string;

			ListenToclickMyStar();

			imdbStar1 = document.querySelector(".js-imdbstar1");
			imdbStar2 = document.querySelector(".js-imdbstar2");
			imdbStar3 = document.querySelector(".js-imdbstar3");
			imdbStar4 = document.querySelector(".js-imdbstar4");
			imdbStar5 = document.querySelector(".js-imdbstar5");

			if (rating == 1){
				imdbStar1.classList.remove('c-card__details--nostar');
				imdbStar1.classList.add('c-card__details--star');
			} else if (rating == 2) {
				imdbStar1.classList.remove('c-card__details--nostar');
				imdbStar1.classList.add('c-card__details--star');
				imdbStar2.classList.remove('c-card__details--nostar');
				imdbStar2.classList.add('c-card__details--star');
			} else if (rating == 3) {
				imdbStar1.classList.remove('c-card__details--nostar');
				imdbStar1.classList.add('c-card__details--star');
				imdbStar2.classList.remove('c-card__details--nostar');
				imdbStar2.classList.add('c-card__details--star');
				imdbStar3.classList.remove('c-card__details--nostar');
				imdbStar3.classList.add('c-card__details--star');
			} else if (rating == 4) {
				imdbStar1.classList.remove('c-card__details--nostar');
				imdbStar1.classList.add('c-card__details--star');
				imdbStar2.classList.remove('c-card__details--nostar');
				imdbStar2.classList.add('c-card__details--star');
				imdbStar3.classList.remove('c-card__details--nostar');
				imdbStar3.classList.add('c-card__details--star');
				imdbStar4.classList.remove('c-card__details--nostar');
				imdbStar4.classList.add('c-card__details--star');
			} else if (rating == 5) {
				imdbStar1.classList.remove('c-card__details--nostar');
				imdbStar1.classList.add('c-card__details--star');
				imdbStar2.classList.remove('c-card__details--nostar');
				imdbStar2.classList.add('c-card__details--star');
				imdbStar3.classList.remove('c-card__details--nostar');
				imdbStar3.classList.add('c-card__details--star');
				imdbStar4.classList.remove('c-card__details--nostar');
				imdbStar4.classList.add('c-card__details--star');
				imdbStar5.classList.remove('c-card__details--nostar');
				imdbStar5.classList.add('c-card__details--star');
			}
			console.log("next zoekresultaat");
		}	
		//http://www.omdbapi.com/?apikey=db006036&t=a%20good%20day%20to%20die%20hard&plot=full
		//https://www.imdb.com/title/tt1606378/ --> imdb code meegeven in url toont de imdb pagina van de film
	
	} else {
		//series
		cards.innerHTML = ``;
		
		//Search for serie
		const jsonResultsSearch = `${ENDPOINT}s=${searchText}&type=${type}`;
		const request = await fetch(`${jsonResultsSearch}`);
		const data = await request.json();
		//console.log(data);
		const results = data.Search;
		console.log(results);//all results

		for (result of results){
			console.log("zoekresultaat");
			console.log(result);
			console.log(result.imdbID);

			//details
			const jsonResultsId = `${ENDPOINT}i=${result.imdbID}&plot=full`;
			// console.log(jsonResultsId);
			const request2 = await fetch(`${jsonResultsId}`);
			const data2 = await request2.json();
			console.log("data2");
			console.log(data2);
			console.log("data2 done");

			let string = ``;
			
			//imdb rating
			let rating = Math.round(data2.imdbRating /2);

			//visualisatie van runtime in balk
			let space = data2.Runtime.search(" ");
			let runtime = data2.Runtime.substring(0, space);
			console.log(runtime);
			let hours = runtime / 60;
			console.log(hours);


			let percentage = 100 / 1.5 * hours.toFixed(2);
			if (percentage >= 100){
				percentage = 100;
			}
			console.log(percentage);

			string += `<div class="c-card">
			<div class="c-card__content">
			<div class="c-card__poster"><img class="c-card__poster--image" src="${data2.Poster}" alt="Movie/Serie poster" /></div>
			<label class="c-card__title"><h1 class="c-card__title--title" for="title" name="title">${data2.Title}</h1></label>
				
			<div class="c-card__info">
				<label class="c-card__year" for="year" name="year">Year: ${data2.Year}</label>
				<div class="c-card__details c-card__details--imdbrating">
				<label for="rating" name="rating" class="c-card__rating">IMDB rating</label>
			
				<svg class="c-card__details--star js-imdbstar1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
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
				<div class="c-card__myrating">
				<input class="o-hide-accessible c-card__detailsstar js-mystar1" type="checkbox" id="input1" />
				<label class="c-label c-card__detailslabel" for="mystar1">
				<svg class="c-card__details--icon c-card__details--nostar js-mystar" id="icon1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
				</svg>
				</label>
				<input class="o-hide-accessible c-card__detailsstar js-mystar2" type="checkbox" id="input2" />
				<label class="c-label c-card__detailslabel" for="mystar2">
				<svg class="c-card__details--icon c-card__details--nostar js-mystar" id="icon2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
				</svg>
				</label>
				<input class="o-hide-accessible c-card__detailsstar js-mystar3" type="checkbox" id="input3" />
				<label class="c-label c-card__detailslabel" for="mystar3">
				<svg class="c-card__details--icon c-card__details--nostar js-mystar" id="icon3" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
				</svg>
				</label>
				<input class="o-hide-accessible c-card__detailsstar js-mystar4" type="checkbox" id="input4" />
				<label class="c-label c-card__detailslabel" for="mystar4">
				<svg class="c-card__details--icon c-card__details--nostar js-mystar" id="icon4" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
				</svg>
				</label>
				<input class="o-hide-accessible c-card__detailsstar js-mystar5" type="checkbox" id="input5" />
				<label class="c-label c-card__detailslabel" for="mystar5">
				<svg class="c-card__details--icon c-card__details--nostar js-mystar" id="icon5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
				</svg>
				</label>
				</div>
			</div>

				<label for="runtime" name="runtime" class="c-card__runtime">Runtime: ${data2.Runtime}</label>
			</div>

			<div class="c-card__moredetails">
				<label for="actors" name="actors" class="c-card__actors">Actors: ${data2.Actors}</label>
				<label for="plot" name="plot" class="c-card__plot">${data2.Plot}</label>
			
			</div>

			<div class="c-card__timeline">
				<div class="c-card__timeline--labels js-timeline">
				<label class="c-card__timeline--0">0</label>
				<label class="c-card__timeline--1">0.5</label>
				<label class="c-card__timeline--2">1</label>
				<label class="c-card__timeline--3">1.5</label>
				</div>

				<div class="c-card__timeline--line">
				<span class="c-card__timelinespan js-timeline" style=width:${percentage}%></span>
				</div>
			</div>
			</div>
			</div>`;

			cards.innerHTML += string;

			ListenToclickMyStar();

			imdbStar1 = document.querySelector(".js-imdbstar1");
			imdbStar2 = document.querySelector(".js-imdbstar2");
			imdbStar3 = document.querySelector(".js-imdbstar3");
			imdbStar4 = document.querySelector(".js-imdbstar4");
			imdbStar5 = document.querySelector(".js-imdbstar5");

			if (rating == 1){
				imdbStar1.classList.remove('c-card__details--nostar');
				imdbStar1.classList.add('c-card__details--star');
			} else if (rating == 2) {
				imdbStar1.classList.remove('c-card__details--nostar');
				imdbStar1.classList.add('c-card__details--star');
				imdbStar2.classList.remove('c-card__details--nostar');
				imdbStar2.classList.add('c-card__details--star');
			} else if (rating == 3) {
				imdbStar1.classList.remove('c-card__details--nostar');
				imdbStar1.classList.add('c-card__details--star');
				imdbStar2.classList.remove('c-card__details--nostar');
				imdbStar2.classList.add('c-card__details--star');
				imdbStar3.classList.remove('c-card__details--nostar');
				imdbStar3.classList.add('c-card__details--star');
			} else if (rating == 4) {
				imdbStar1.classList.remove('c-card__details--nostar');
				imdbStar1.classList.add('c-card__details--star');
				imdbStar2.classList.remove('c-card__details--nostar');
				imdbStar2.classList.add('c-card__details--star');
				imdbStar3.classList.remove('c-card__details--nostar');
				imdbStar3.classList.add('c-card__details--star');
				imdbStar4.classList.remove('c-card__details--nostar');
				imdbStar4.classList.add('c-card__details--star');
			} else if (rating == 5) {
				imdbStar1.classList.remove('c-card__details--nostar');
				imdbStar1.classList.add('c-card__details--star');
				imdbStar2.classList.remove('c-card__details--nostar');
				imdbStar2.classList.add('c-card__details--star');
				imdbStar3.classList.remove('c-card__details--nostar');
				imdbStar3.classList.add('c-card__details--star');
				imdbStar4.classList.remove('c-card__details--nostar');
				imdbStar4.classList.add('c-card__details--star');
				imdbStar5.classList.remove('c-card__details--nostar');
				imdbStar5.classList.add('c-card__details--star');
			}
			console.log("next zoekresultaat");
		}	
	}
};

const BuildOneCard = function(object){
	cards.innerHTML = ``;
	let string = ``;
		
		//imdb rating
		let rating = Math.round(object.imdbRating /2);

		//visualisatie van runtime in balk
		let space = object.Runtime.search(" ");
		let runtime = object.Runtime.substring(0, space);
		console.log(runtime);
		let hours = runtime / 60;
		console.log(hours)
		let percentage = 100 / 4 * hours.toFixed(2);
		if (percentage > 100){
			percentage = 100;
		}
		console.log(percentage);

		string = ``;
		string += `<div class="c-card">
			<div class="c-card__content">
			<div class="c-card__poster"><img class="c-card__poster--image" src="${object.Poster}" alt="Movie/Serie poster" /></div>
			<label class="c-card__title"><h1 class="c-card__title--title" for="title" name="title">${object.Title}</h1></label>
				
			<div class="c-card__info">
				<label class="c-card__year" for="year" name="year">Year: ${object.Year}</label>
				<div class="c-card__details c-card__details--imdbrating">
				<label for="rating" name="rating" class="c-card__rating">IMDB rating</label>
			
				<svg class="c-card__details--star js-imdbstar1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
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
				<div class="c-card__myrating">
				<input class="o-hide-accessible c-card__detailsstar js-mystar1" type="checkbox" id="input1" />
				<label class="c-label c-card__detailslabel" for="mystar1">
				<svg class="c-card__details--icon c-card__details--nostar js-mystar" id="icon1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
				</svg>
				</label>
				<input class="o-hide-accessible c-card__detailsstar js-mystar2" type="checkbox" id="input2" />
				<label class="c-label c-card__detailslabel" for="mystar2">
				<svg class="c-card__details--icon c-card__details--nostar js-mystar" id="icon2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
				</svg>
				</label>
				<input class="o-hide-accessible c-card__detailsstar js-mystar3" type="checkbox" id="input3" />
				<label class="c-label c-card__detailslabel" for="mystar3">
				<svg class="c-card__details--icon c-card__details--nostar js-mystar" id="icon3" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
				</svg>
				</label>
				<input class="o-hide-accessible c-card__detailsstar js-mystar4" type="checkbox" id="input4" />
				<label class="c-label c-card__detailslabel" for="mystar4">
				<svg class="c-card__details--icon c-card__details--nostar js-mystar" id="icon4" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
				</svg>
				</label>
				<input class="o-hide-accessible c-card__detailsstar js-mystar5" type="checkbox" id="input5" />
				<label class="c-label c-card__detailslabel" for="mystar5">
				<svg class="c-card__details--icon c-card__details--nostar js-mystar" id="icon5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
				</svg>
				</label>
				</div>
			</div>

				<label for="runtime" name="runtime" class="c-card__runtime">Runtime: ${object.Runtime}</label>
			</div>

			<div class="c-card__moredetails">
				<label for="actors" name="actors" class="c-card__actors">Actors: ${object.Actors}</label>
				<label for="plot" name="plot" class="c-card__plot">${object.Plot}</label>
			
			</div>

			<div class="c-card__timeline">
				<div class="c-card__timeline--labels js-timeline">
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
			
			cards.innerHTML += string;

			ListenToclickMyStar();

			imdbStar1 = document.querySelector(".js-imdbstar1");
			imdbStar2 = document.querySelector(".js-imdbstar2");
			imdbStar3 = document.querySelector(".js-imdbstar3");
			imdbStar4 = document.querySelector(".js-imdbstar4");
			imdbStar5 = document.querySelector(".js-imdbstar5");

			if (rating == 1){
				imdbStar1.classList.remove('c-card__details--nostar');
				imdbStar1.classList.add('c-card__details--star');
			} else if (rating == 2) {
				imdbStar1.classList.remove('c-card__details--nostar');
				imdbStar1.classList.add('c-card__details--star');
				imdbStar2.classList.remove('c-card__details--nostar');
				imdbStar2.classList.add('c-card__details--star');
			} else if (rating == 3) {
				imdbStar1.classList.remove('c-card__details--nostar');
				imdbStar1.classList.add('c-card__details--star');
				imdbStar2.classList.remove('c-card__details--nostar');
				imdbStar2.classList.add('c-card__details--star');
				imdbStar3.classList.remove('c-card__details--nostar');
				imdbStar3.classList.add('c-card__details--star');
			} else if (rating == 4) {
				imdbStar1.classList.remove('c-card__details--nostar');
				imdbStar1.classList.add('c-card__details--star');
				imdbStar2.classList.remove('c-card__details--nostar');
				imdbStar2.classList.add('c-card__details--star');
				imdbStar3.classList.remove('c-card__details--nostar');
				imdbStar3.classList.add('c-card__details--star');
				imdbStar4.classList.remove('c-card__details--nostar');
				imdbStar4.classList.add('c-card__details--star');
			} else if (rating == 5) {
				imdbStar1.classList.remove('c-card__details--nostar');
				imdbStar1.classList.add('c-card__details--star');
				imdbStar2.classList.remove('c-card__details--nostar');
				imdbStar2.classList.add('c-card__details--star');
				imdbStar3.classList.remove('c-card__details--nostar');
				imdbStar3.classList.add('c-card__details--star');
				imdbStar4.classList.remove('c-card__details--nostar');
				imdbStar4.classList.add('c-card__details--star');
				imdbStar5.classList.remove('c-card__details--nostar');
				imdbStar5.classList.add('c-card__details--star');
			}

}

//#region ***  Event Listeners - listenTo___ ***
const ListenToclickMyStar = function(){
	mystars = document.querySelectorAll('.js-mystar');
	mystar1 = document.querySelector('.js-mystar1');
	mystar2 = document.querySelector('.js-mystar2');
	mystar3 = document.querySelector('.js-mystar3');
	mystar4 = document.querySelector('.js-mystar4');
	mystar5 = document.querySelector('.js-mystar5');

	const resetAll = function(star){
		if (star == "icon1"){
			mystar2.checked = false;
			mystar3.checked = false;
			mystar4.checked = false;
			mystar5.checked = false;
			mystar2.classList.remove('c-card__details--star');
			mystar2.classList.add('c-card__details--nostar');
			mystar3.classList.remove('c-card__details--star');
			mystar3.classList.add('c-card__details--nostar');
			mystar4.classList.remove('c-card__details--star');
			mystar4.classList.add('c-card__details--nostar');
			mystar5.classList.remove('c-card__details--star');
			mystar5.classList.add('c-card__details--nostar');
			
		}
		if(star == "icon2"){
			mystar3.checked = false;
			mystar4.checked = false;
			mystar5.checked = false;
			mystar3.classList.remove('c-card__details--star');
			mystar3.classList.add('c-card__details--nostar');
			mystar4.classList.remove('c-card__details--star');
			mystar4.classList.add('c-card__details--nostar');
			mystar5.classList.remove('c-card__details--star');
			mystar5.classList.add('c-card__details--nostar');
		}
		if(star == "icon3"){
			mystar4.checked = false;
			mystar5.checked = false;
			mystar4.classList.remove('c-card__details--star');
			mystar4.classList.add('c-card__details--nostar');
			mystar5.classList.remove('c-card__details--star');
			mystar5.classList.add('c-card__details--nostar');
		}
		if(star == "icon4"){
			mystar5.checked = false;
			mystar5.classList.remove('c-card__details--star');
			mystar5.classList.add('c-card__details--nostar');
		}
		
	}

	for (const star of mystars){
		
		star.addEventListener("click", function(){
			console.log('clicked mystar');
			let nrstar = this.getAttribute('id');
			// let nr = nrstar.substring(nrstar.length-1, nrstar.length)
			//console.log(nrstar);

			if (nrstar == "icon1") {
				resetAll(nrstar);
				mystar1.checked = true;
				mystar1.classList.add('c-card__details--star');
				
			}
			
			if (nrstar == "icon2") {
				resetAll(nrstar);
				mystar1.checked = true;
				mystar2.checked = true;
				mystar1.classList.remove('c-card__details--nostar');
				mystar1.classList.add('c-card__details--star');
				mystar2.classList.add('c-card__details--star');
			}
			if (nrstar == "icon3") {
				resetAll(nrstar);
				mystar1.checked = true;
				mystar2.checked = true;
				mystar3.checked = true;
				mystar3.classList.add('c-card__details--star');
				mystar1.classList.remove('c-card__details--nostar');
				mystar1.classList.add('c-card__details--star');
				mystar2.classList.remove('c-card__details--nostar');
				mystar2.classList.add('c-card__details--star');
			}
			if (nrstar == "icon4") {
				resetAll(nrstar);
				mystar1.checked = true;
				mystar2.checked = true;
				mystar3.checked = true;
				mystar4.checked = true;
				mystar1.classList.remove('c-card__details--nostar');
				mystar1.classList.add('c-card__details--star');
				mystar2.classList.remove('c-card__details--nostar');
				mystar2.classList.add('c-card__details--star');
				mystar3.classList.remove('c-card__details--nostar');
				mystar3.classList.add('c-card__details--star');
				mystar4.classList.add('c-card__details--star');
			}
			if (nrstar == "icon5") {
				mystar1.checked = true;
				mystar2.checked = true;
				mystar3.checked = true;
				mystar4.checked = true;
				mystar5.checked = true;
				mystar5.classList.remove('c-card__details--nostar');
				mystar1.classList.add('c-card__details--star');
				mystar2.classList.remove('c-card__details--nostar');
				mystar2.classList.add('c-card__details--star');
				mystar3.classList.remove('c-card__details--nostar');
				mystar3.classList.add('c-card__details--star');
				mystar4.classList.remove('c-card__details--nostar');
				mystar4.classList.add('c-card__details--star');
				mystar5.classList.remove('c-card__details--nostar');
				mystar5.classList.add('c-card__details--star');
			}
		})
	}
	
}
//#endregion

//#region ***  INIT / DOMContentLoaded  ***
document.addEventListener('DOMContentLoaded', function() {
	console.log("DOM loaded");
	btnMovies = document.querySelector(".js-btntogglemovies");
	btnSeries = document.querySelector(".js-btntoggleseries");
	radioMovies = document.querySelector(".js-radiomovies");
	radioSeries = document.querySelector(".js-radioseries");
	divMovies = document.querySelector(".js-divmovies");
	divSeries = document.querySelector(".js-divseries");
	Page = document.querySelector(".js-page");
	loader = document.querySelector(".js-loader");
	loadermessage = document.querySelector(".js-loadermessage");
	resultsmessage = document.querySelector(".js-resultsmessage");
	inputmessage = document.querySelector(".js-inputmessage");

	searchinput = document.querySelector(".js-searchinput");
	cards = document.querySelector(".js-cards");
	
	if (radioMovies.checked){
		cards.innerHTML = ``;
		//loadermessage.innerHTML = `Loading random movies...`;
		//ShowRandom("movie");
	} else {
		cards.innerHTML = ``;
		//loadermessage.innerHTML = `Loading random series...`;
		//ShowRandom("series");
	}
	

	btnMovies.addEventListener("click", function(){
		console.log("button movies clicked");
		divMovies.classList.remove("u-z-index-back")
		divMovies.classList.add("u-z-index-front");
		divSeries.classList.add("u-z-index-back");
		btnMovies.classList.add("c-button__label--activated");
		btnSeries.classList.remove("c-button__label--activated");
		ShowRandom("movie");
		searchinput.value = ""; //clear searchinput
	})

	btnSeries.addEventListener("click", function(){
		console.log("button series clicked");
		divSeries.classList.add("u-z-index-front");
		divMovies.classList.add("u-z-index-back");
		btnMovies.classList.remove("c-button__label--activated");
		btnSeries.classList.add("c-button__label--activated");
		ShowRandom("series");
		searchinput.value = "";
	})

	searchinput.addEventListener("keyup", function(e){
		if (e.key=='Enter'){
			console.log('pushed ENTER');
			if	(radioMovies.checked){
				SearchForResults(searchinput.value, "movie");
			} else {
				SearchForResults(searchinput.value, "series");
			}
			
			//console.log(searchinput.value)
			e.preventDefault();
		}
		
	})

	
	//test card (index.html static card) (mag weg als testcard ook weg is)
	mystars = document.querySelectorAll('.js-mystar');
	mystar1 = document.querySelector('.js-mystar1');
	mystar2 = document.querySelector('.js-mystar2');
	mystar3 = document.querySelector('.js-mystar3');
	mystar4 = document.querySelector('.js-mystar4');
	mystar5 = document.querySelector('.js-mystar5');

	const resetAll = function(star){
		if (star == "icon1"){
			mystar2.checked = false;
			mystar3.checked = false;
			mystar4.checked = false;
			mystar5.checked = false;
			mystar2.classList.remove('c-card__details--star');
			mystar2.classList.add('c-card__details--nostar');
			mystar3.classList.remove('c-card__details--star');
			mystar3.classList.add('c-card__details--nostar');
			mystar4.classList.remove('c-card__details--star');
			mystar4.classList.add('c-card__details--nostar');
			mystar5.classList.remove('c-card__details--star');
			mystar5.classList.add('c-card__details--nostar');
			
		}
		if(star == "icon2"){
			mystar3.checked = false;
			mystar4.checked = false;
			mystar5.checked = false;
			mystar3.classList.remove('c-card__details--star');
			mystar3.classList.add('c-card__details--nostar');
			mystar4.classList.remove('c-card__details--star');
			mystar4.classList.add('c-card__details--nostar');
			mystar5.classList.remove('c-card__details--star');
			mystar5.classList.add('c-card__details--nostar');
		}
		if(star == "icon3"){
			mystar4.checked = false;
			mystar5.checked = false;
			mystar4.classList.remove('c-card__details--star');
			mystar4.classList.add('c-card__details--nostar');
			mystar5.classList.remove('c-card__details--star');
			mystar5.classList.add('c-card__details--nostar');
		}
		if(star == "icon4"){
			mystar5.checked = false;
			mystar5.classList.remove('c-card__details--star');
			mystar5.classList.add('c-card__details--nostar');
		}
		
	}

	for (const star of mystars){
		
		star.addEventListener("click", function(){
			console.log('clicked mystar');
			let nrstar = this.getAttribute('id');
			// let nr = nrstar.substring(nrstar.length-1, nrstar.length)
			//console.log(nrstar);

			if (nrstar == "icon1") {
				resetAll(nrstar);
				mystar1.checked = true;
				mystar1.classList.add('c-card__details--star');
				
			}
			
			if (nrstar == "icon2") {
				resetAll(nrstar);
				mystar1.checked = true;
				mystar2.checked = true;
				mystar1.classList.remove('c-card__details--nostar');
				mystar1.classList.add('c-card__details--star');
				mystar2.classList.add('c-card__details--star');
			}
			if (nrstar == "icon3") {
				resetAll(nrstar);
				mystar1.checked = true;
				mystar2.checked = true;
				mystar3.checked = true;
				mystar3.classList.add('c-card__details--star');
				mystar1.classList.remove('c-card__details--nostar');
				mystar1.classList.add('c-card__details--star');
				mystar2.classList.remove('c-card__details--nostar');
				mystar2.classList.add('c-card__details--star');
			}
			if (nrstar == "icon4") {
				resetAll(nrstar);
				mystar1.checked = true;
				mystar2.checked = true;
				mystar3.checked = true;
				mystar4.checked = true;
				mystar1.classList.remove('c-card__details--nostar');
				mystar1.classList.add('c-card__details--star');
				mystar2.classList.remove('c-card__details--nostar');
				mystar2.classList.add('c-card__details--star');
				mystar3.classList.remove('c-card__details--nostar');
				mystar3.classList.add('c-card__details--star');
				mystar4.classList.add('c-card__details--star');
			}
			if (nrstar == "icon5") {
				mystar1.checked = true;
				mystar2.checked = true;
				mystar3.checked = true;
				mystar4.checked = true;
				mystar5.checked = true;
				mystar5.classList.remove('c-card__details--nostar');
				mystar1.classList.add('c-card__details--star');
				mystar2.classList.remove('c-card__details--nostar');
				mystar2.classList.add('c-card__details--star');
				mystar3.classList.remove('c-card__details--nostar');
				mystar3.classList.add('c-card__details--star');
				mystar4.classList.remove('c-card__details--nostar');
				mystar4.classList.add('c-card__details--star');
				mystar5.classList.remove('c-card__details--nostar');
				mystar5.classList.add('c-card__details--star');
			}
		})
	}

	
	
});
//#endregion
