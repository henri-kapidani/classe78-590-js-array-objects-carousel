/*
Dato un array contenente una lista di cinque immagini, creare un carosello come nello screenshot allegato.

MILESTONE 1
Per prima cosa, creiamo il markup statico: costruiamo il container e inseriamo un'immagine grande al centro: avremo così la struttura base e gli stili pronti per poterci poi concentrare solamente sull'aspetto logico.

MILESTONE 2
Adesso rimuoviamo tutto il markup statico e inseriamo tutte le immagini dinamicamente servendoci dell'array fornito e un semplice ciclo for che concatena un template literal.
Tutte le immagini saranno nascoste, tranne la prima, che avrà una classe specifica che la renderà visibile.
Al termine di questa fase ci ritroveremo con lo stesso slider stilato nella milestone 1, ma costruito dinamicamente attraverso JavaScript.

MILESTONE 3
Al click dell'utente sulle frecce, il programma cambierà l’immagine attiva, che quindi verrà visualizzata al posto della precedente.

BONUS 1:
Aggiungere il ciclo infinito del carosello. Ovvero se è attiva la prima immagine e l'utente clicca la freccia per andare all’immagine precedente, dovrà comparire l’ultima immagine dell’array e viceversa.

BONUS 2:
Aggiungere la visualizzazione di tutte le thumbnails sulla destra dell’immagine grande attiva, come nello screenshot proposto. Tutte le miniature avranno un layer di opacità scura, tranne quella corrispondente all’immagine attiva, che invece avrà un bordo colorato.
Al click delle frecce, oltre al cambio di immagine attiva, gestire il cambio di miniatura attiva.
*/

/*
Riprendiamo l'esercizio carosello e modifichiamone il codice per renderlo funzionante con un array di oggetti al posto dell'array semplice.
BONUS 1:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
BONUS 2:
Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.
*/

const arrImages = [
	{
		image: '01.webp',
		title: "Marvel's Spiderman Miles Morale",
		text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
	},
	{
		image: '02.webp',
		title: 'Ratchet & Clank: Rift Apart',
		text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
	},
	{
		image: '03.webp',
		title: 'Fortnite',
		text: 'Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.',
	},
	{
		image: '04.webp',
		title: 'Stray',
		text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
	},
	{
		image: '05.webp',
		title: "Marvel's Avengers",
		text: "Marvel's Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.",
	},
];

const timeSlider = 1.5 * 1000;
let direction = 1;

const eleSliderViewer = document.querySelector('.slider-viewer');
const eleSliderThumbs = document.querySelector('.thumbs');

// creare i tag immagine nell'html
for (let i = 0; i < arrImages.length; i++) {
	const objSlide = arrImages[i];
	// creare le slide
	eleSliderThumbs.innerHTML = eleSliderThumbs.innerHTML + `<img src="img/${objSlide.image}" class="thumb-img ${i === 0 ? 'active' : ''}">`;
	eleSliderViewer.innerHTML += `
		<div class="slide ${i === 0 ? 'active' : ''}">
			<img src="img/${objSlide.image}" alt="${objSlide.title}">
			<div class="text">
				<h2>${objSlide.title}</h2>
				<p>${objSlide.text}</p>
			</div>
		</div>
	`
}

// aggiungere click ai thumb
document.querySelectorAll('.thumb-img').forEach((eleThumb, index) => {
	eleThumb.addEventListener('click', () => {
		listEleImg[activeIndex].classList.remove('active');
		listThumbs[activeIndex].classList.remove('active');
		activeIndex = index;
		listEleImg[activeIndex].classList.add('active');
		listThumbs[activeIndex].classList.add('active');
		document.body.style.backgroundImage = `url('img/${arrImages[activeIndex].image}')`;
	})
});

let idInterval = setInterval(() => {
	if (direction > 0) {
		moveRight();
	} else {
		moveLeft();
	}
}, timeSlider);

document.querySelector('.btn-invert').addEventListener('click', () => direction *= -1); // 1  * -1 = -1; -1 * -1 = 1

document.querySelector('.btn-start-stop').addEventListener('click', function() {
	if (this.dataset.functionality === 'stop') {
		console.log('stoppato');
		clearInterval(idInterval);
		this.innerHTML = 'Start';
		this.dataset.functionality = 'start';
	} else {
		console.log('avviato');
		idInterval = setInterval(() => {
			if (direction > 0) {
				moveRight();
			} else {
				moveLeft();
			}
		}, timeSlider);
		this.innerHTML = 'Stop';
		this.dataset.functionality = 'stop';
	}
})

// questa selezione va messa dopo il ciclo perche' usando l'innerHTML ad ogni iterazione sono stati distrutti i bottoni originali e sono stati creati bottoni nuovi
const eleBtnLeft = document.querySelector('.btn-left');
const eleBtnRight = document.querySelector('.btn-right');

const listEleImg = document.querySelectorAll('.slide'); // non e' un array ma qualcosa di simile
const listThumbs = document.querySelectorAll('.thumb-img');

let activeIndex = 0;
document.body.style.backgroundImage = `url('img/${arrImages[activeIndex].image}')`;

// aggiungere gli event listeners ai due bottoni
eleBtnRight.addEventListener('click', moveRight);

eleBtnLeft.addEventListener('click', moveLeft);

function moveRight() {
	// togliere la classe active dall'elemento attivo corrente
	listEleImg[activeIndex].classList.remove('active');
	listThumbs[activeIndex].classList.remove('active');

	activeIndex++;
	if (activeIndex === listEleImg.length) {
		activeIndex = 0;
	}

	// aggiungere la classe active all'elemento successivo
	listEleImg[activeIndex].classList.add('active');
	listThumbs[activeIndex].classList.add('active');
	document.body.style.backgroundImage = `url('img/${arrImages[activeIndex].image}')`;
}

function moveLeft() {
	// togliere la classe active dall'elemento attivo corrente
	listEleImg[activeIndex].classList.remove('active');
	listThumbs[activeIndex].classList.remove('active');

	if (activeIndex === 0) {
		activeIndex = listEleImg.length;
	}
	activeIndex--;

	// aggiungere la classe active all'elemento successivo
	listEleImg[activeIndex].classList.add('active');
	listThumbs[activeIndex].classList.add('active');
	document.body.style.backgroundImage = `url('img/${arrImages[activeIndex].image}')`;
}