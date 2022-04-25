const body = document.querySelector(`body`);

let imgArray = [];
let finalImgArray = [];

function setUpPosters(path) {
    return new Promise(function (resolve, reject) {
        axios.get(path).then(
            (response) => {
								response.data.results = _.shuffle(response.data.results);
                for (i = 0; i < 12; i+=2){
									imgArray[i] = `http://image.tmdb.org/t/p/w200${response.data.results[i].poster_path}`;
									imgArray[i+1] = `http://image.tmdb.org/t/p/w200${response.data.results[i].poster_path}`;
								}
								resolve(imgArray);
            },
                (error) => {
                reject(error);
            }
        );
    });
}

async function call() {
	imgArray = await setUpPosters(`https://api.themoviedb.org/3/discover/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb`);
	finalImgArray = _.shuffle(imgArray);
	console.log(finalImgArray);
	setUpGame();
}
call();


function replaceCSSUrl(cardObject) {
	//console.log(cardObject);
	let cardChange = document.querySelectorAll(`.card-up`);
	for (let i = 0; i < cardObject.length; i++) {
		cardChange[i].style.backgroundImage = `url(${cardObject[i].imageUrl}), linear-gradient(#72dbf4, #72dbf4)`;
		}
}

//https://imdb-api.com/en/API/BoxOfficeAllTime/k_aaaaaaaa
// axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb`).then(handleResponse);

//https://api.themoviedb.org/3/discover/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb


// axios.get(`https://imdb-api.com/en/API/Top250Movies/k_aaaaaaaa`).then(handleResponse);


// function handleResponse(response) {
// 	for (let i = 0; i < response.data.items.length; i++) {
// 		console.log(response.data.items[i].image);
// 	}
// }

// function setUpPosters(path) {
//     return new Promise(function (resolve, reject) {
//         axios.get(path).then(
//             (response) => {
// 								response.data.items = _.shuffle(response.data.items);
// 								console.log(response.data.items)
//                 for (i = 0; i < 12; i+=2){
// 									imgArray[i] = response.data.items[i].image;
// 									imgArray[i+1] = response.data.items[i].image;
// 									console.log(response.data.items[i].image)
// 								}
// 								resolve(imgArray);
//             },
//                 (error) => {
//                 reject(error);
//             }
//         );
//     });
// }


// `http://image.tmdb.org/t/p/w200${response.data.results[i].poster_path}`