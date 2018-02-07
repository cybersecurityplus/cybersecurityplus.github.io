var slideIndex = 0;
showSlides();
var slides, dots;

function plusSlides(position) {
	slideIndex += position;
	if (slideIndex > slides.length) {
		slideIndex = 1
	} else if (slideIndex < 1) {
		slideIndex = slides.length
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active-dot", "");

	}
	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " active-dot";
}

function currentSlide(index) {
	if (index > slides.length) {
		index = 1
	} else if (index < 1) {
		index = slides.length
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active-dot", "");
	}
	slides[index - 1].style.display = "block";
	dots[index - 1].className += " active-dot";
}

function showSlides() {
	var i;
	slides = document.getElementsByClassName("mySlides");
	dots = document.getElementsByClassName("dot");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slideIndex++;
	if (slideIndex > slides.length) {
		slideIndex = 1
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active-dot", "");
	}
	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " active-dot";
	setTimeout(showSlides, 30000); // Change image every 3 seconds
}
