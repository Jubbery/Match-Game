function createNewCard() {
	let cardElement = document.createElement("div");

	cardElement.classList.add("card");
	
	let cardDown = `<div class="card-down"></div>`;
	let cardUp = `<div class="card-up"></div>`;
	cardElement.innerHTML = cardDown + " " + cardUp;
	
	return cardElement;
}
// createNewCardTest();


function appendNewCard(parentElement) {
	let cardElement = createNewCard();
	
	parentElement.appendChild(cardElement);

	return cardElement;

}
// appendNewCardTest();


function shuffleCardImageClasses() {
	let cardClasses = ["image-1", "image-1", "image-2", "image-2", "image-3", "image-3", "image-4", "image-4", "image-5", "image-5", "image-6", "image-6"];

	return _.shuffle(cardClasses);
}
// shuffleCardImageClassesTest()

let cardObject = [];

function createCards(parentElement, shuffledImageClasses) {
    for (let i = 0; i < 12; i++) {
    	let newCard = appendNewCard(parentElement);
    	newCard.classList.add(shuffledImageClasses[i]);
			let newObject = {
				index: i,
				element: newCard,
				imageClass: shuffledImageClasses[i],
				imageUrl: finalImgArray[i]
			};
			cardObject.push(newObject);
			//console.log(cardObject[i])
		}
		console.log(cardObject)
		return cardObject;
	
}
// createCardsTest();


function doCardsMatch(cardObject1, cardObject2) {
	let cardsMatch = true;
	
	if (cardObject1 !== cardObject2) {
		cardsMatch = false;
		return cardsMatch;
	} else {
		return cardsMatch;
	}
	
}
// doCardsMatchTest();


let counters = {};


function incrementCounter(counterName, parentElement) {
	if(counters[counterName] == undefined){
		counters[counterName] = 0;
	}
	counters[counterName]++;

	parentElement.innerHTML = counters[counterName];
	return;
}
// incrementCounterTest();

let lastCardFlipped = null;


function onCardFlipped(newlyFlippedCard) {
	incrementCounter(`flips`, document.querySelector(`#flip-count`));
	
	if (lastCardFlipped == null) {
		lastCardFlipped = newlyFlippedCard;
		return;
	}

	//console.log(lastCardFlipped.imageUrl)

	// let cardEquality = doCardsMatch(lastCardFlipped.element.classList.value, newlyFlippedCard.element.classList.value);

	let cardEquality = doCardsMatch(lastCardFlipped.imageUrl, newlyFlippedCard.imageUrl);

	
	if (!cardEquality) {
		// console.log(lastCardFlipped.element.classList);
		// console.log(newlyFlippedCard.element.classList);
		lastCardFlipped.element.classList.remove("flipped");
		newlyFlippedCard.element.classList.remove("flipped");
		lastCardFlipped = null;
		return;
	} else {
		incrementCounter(`matches`, document.querySelector(`#match-count`));
		lastCardFlipped.element.classList.add(`glow`);
		newlyFlippedCard.element.classList.add(`glow`);
		// console.log(lastCardFlipped.element.classList);
		// console.log(newlyFlippedCard.element.classList);
	}
	
	if (counters[`matches`] == 6) {
		winAudio.play();
		lastCardFlipped = null;
		for(let i = 0; i < 12; i++){
			cardObject[i].element.classList.remove(`glow`);
			cardObject[i].element.classList.add(`border-glow`);
		}
		return;
	} else {
		matchAudio.play();
		lastCardFlipped = null;
		return;
	}

}

function resetGame() {
	let cardContainer = document.querySelector(`#card-container`);
	
	while (cardContainer.firstChild) {
  	cardContainer.removeChild(cardContainer.firstChild);
	}

	let matchCount = document.querySelector(`#match-count`);
	matchCount.innerHTML = 0;
	let flipCount = document.querySelector(`#flip-count`);
	flipCount.innerHTML = 0;

	counters = {};
	cardObject = [];

	lastCardFlipped = null;
	//setUpGame();
	call();

}



// open this link to get code for movie poster API
//			https://codepen.io/algzb/pen/JwqNKv