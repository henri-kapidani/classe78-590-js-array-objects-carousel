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

const eleSliderViewer = document.querySelector('.slider-viewer');
const eleSliderThumbs = document.querySelector('.thumbs');
const eleBtnLeft = document.querySelector('.btn-left');
const eleBtnRight = document.querySelector('.btn-right');

// creare i tag immagine nell'html
for (let i = 0; i < arrImages.length; i++) {
	// creare le slide
	/*
	`
	<div class="slide">
		<img src="" alt="">
		<div class="text">
			<h2>Titolo</h2>
			<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium ipsum quod porro impedit aspernatur illum amet facilis eveniet laborum consequuntur itaque! Dolor ipsa rerum fugiat voluptatibus consequatur odit libero?</p>
		</div>
	</div>
	`
	*/


	// creare il div .slide
	const eleSlide = document.createElement('div'); // <div></div>
	eleSlide.classList.add('slide'); // <div class="slide"></div>
	// creare elemento immagine
	const eleImg = document.createElement('img'); // <img>
	eleImg.src = 'img/' + arrImages[i].image; // <img src="img/nomeImmagine_qui">
	eleImg.alt = arrImages[i].title; // <img src="img/nomeImmagine_qui" alt="titolo_qui">
	// creare il div .text
	const eleText = document.createElement('div'); // <div></div>
	eleText.classList.add('text'); // <div class="text"></div>
	eleText.innerHTML = `
		<h2>${arrImages[i].title}</h2>
		<p>${arrImages[i].text}</p>
	`;  // <div class="text"> <h2>titolo_qui</h2> <p>text_qui</p> </div>

	eleSlide.append(eleImg); // <div class="slide"> <img src="img/nomeImmagine_qui" alt="titolo_qui"> </div>
	eleSlide.append(eleText);
	/*
	<div class="slide">
		<img src="img/nomeImmagine_qui" alt="titolo_qui">
		<div class="text">
			<h2>titolo_qui</h2>
			<p>text_qui</p>
		</div>
	</div>
	*/

	if (i === 0) {
		eleSlide.classList.add('active');
	}
	eleSliderViewer.append(eleSlide);

	// creare i tag immagine che vanno nella sezione .thumbs
	const eleThumb = document.createElement('img');
	eleThumb.src = 'img/' + arrImages[i].image;
	eleThumb.classList.add('thumb-img');
	if (i === 0) {
		eleThumb.classList.add('active');
	}
	eleSliderThumbs.append(eleThumb);
}
// document.querySelector('.slider-img').classList.add('active');

const listEleImg = document.querySelectorAll('.slider-img'); // non e' un array ma qualcosa di simile
const listThumbs = document.querySelectorAll('.thumb-img');

let activeIndex = 0;
document.body.style.backgroundImage = `url('${arrImages[activeIndex]}')`;
document.body.style.backgroundSize = 'cover';

// aggiungere gli event listeners ai due bottoni
eleBtnRight.addEventListener('click', function () {
	// togliere la classe active dall'elemento attivo corrente
	listEleImg[activeIndex].classList.remove('active');
	listThumbs[activeIndex].classList.remove('active');

	// incrementare l'active index con reset per slider infinito
	/*
	if (activeIndex === listEleImg.length - 1) {
		activeIndex = 0;
	} else {
		activeIndex++;
	}
	*/

	activeIndex++;
	if (activeIndex === listEleImg.length) {
		activeIndex = 0;
	}

	// aggiungere la classe active all'elemento successivo
	listEleImg[activeIndex].classList.add('active');
	listThumbs[activeIndex].classList.add('active');
	document.body.style.backgroundImage = `url('${arrImages[activeIndex]}')`;
	document.body.style.backgroundSize = 'cover';
});

eleBtnLeft.addEventListener('click', function () {
	// togliere la classe active dall'elemento attivo corrente
	listEleImg[activeIndex].classList.remove('active');
	listThumbs[activeIndex].classList.remove('active');

	// decrementare l'active index con reset per slider infinito
	/*
	if (activeIndex === 0) {
		activeIndex = listEleImg.length - 1;
	} else {
		activeIndex--;
	}
	*/

	if (activeIndex === 0) {
		activeIndex = listEleImg.length;
	}
	activeIndex--;

	// aggiungere la classe active all'elemento successivo
	listEleImg[activeIndex].classList.add('active');
	listThumbs[activeIndex].classList.add('active');
	document.body.style.backgroundImage = `url('${arrImages[activeIndex]}')`;
	document.body.style.backgroundSize = 'cover';
});