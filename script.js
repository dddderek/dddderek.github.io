const slides = document.getElementById("slides");
const allSlides = document.querySelectorAll(".slide");
let slidesLength = allSlides.length;
let slideWidth = allSlides[0].offsetWidth;

let index = 0;
let posX1;
let posX2;
let initialPosition;
let finalPosition;

let canISlide = true;

const prev = document.getElementById("prev");
const next = document.getElementById("next");

const firstSlide = allSlides[0];
const lastSlide = allSlides[allSlides.length - 1];

const cloneFirstSlide = firstSlide.cloneNode(true);
const cloneLastSlide = lastSlide.cloneNode(true);

slides.appendChild(cloneFirstSlide);
slides.insertBefore(cloneLastSlide, firstSlide);

next.addEventListener("click", () => switchSlide("next"));
prev.addEventListener("click", () => switchSlide("prev"));

slides.addEventListener("transitionend", checkIndex);

slides.addEventListener("mousedown", dragStart);

slides.addEventListener("touchstart", dragStart);
slides.addEventListener("touchmove", dragMove);
slides.addEventListener("touchend", dragEnd);

function dragStart(e) {
  e.preventDefault();
  initialPosition = slides.offsetLeft;

  if (e.type == "touchstart") {
    posX1 = e.touches[0].clientX;
  } else {
    posX1 = e.clientX;

    document.onmouseup = dragEnd;
    document.onmousemove = dragMove;
  }
}

function dragMove(e) {
  if (e.type == "touchmove") {
    posX2 = posX1 - e.touches[0].clientX;
    posX1 = e.touches[0].clientX;
  } else {
    posX2 = posX1 - e.clientX;
    posX1 = e.clientX;
  }

  slides.style.left = `${slides.offsetLeft - posX2}px`;
}

function dragEnd() {
  /* 
    three possibilities:
    1. next slide
    2. prev slide
    3. stay still
    */
  finalPosition = slides.offsetLeft;
  if (finalPosition - initialPosition < -10) {
    switchSlide("next", "dragging");
  } else if (finalPosition - initialPosition > 10) {
    switchSlide("prev", "dragging");
  } else {
    slides.style.left = `${initialPosition}px`;
  }

  document.onmouseup = null;
  document.onmousemove = null;
}

function switchSlide(arg, arg2) {
  slides.classList.add("transition");

  if (canISlide) {
    if (!arg2) {
      initialPosition = slides.offsetLeft;
    }
    if (arg == "next") {
      slides.style.left = `${initialPosition - slideWidth}px`;
      index++;
    } else {
      slides.style.left = `${initialPosition + slideWidth}px`;
      index--;
    }
  }

  canISlide = false;
}

function checkIndex() {
  slides.classList.remove("transition");

  if (index == -1) {
    slides.style.left = `-${slidesLength * slideWidth}px`;
    index = slidesLength - 1;
  }

  if (index == slidesLength) {
    slides.style.left = `-${1 * slideWidth}px`;
    index = 0;
  }

  canISlide = true;
}

$(window).resize(function(){
  calcResizeVars();
});

$('document').ready(function(){
  console.log("Hello world! " + $(window).width().toString() ); 
  calcResizeVars();
});

function calcResizeVars() {
  $(".slider").css("width", $(window).width());
  $(".slider").css("height", $(window).width() / 1.29);
  //$(".slider").css("width", "992px");
  //$(".slider").css("height", "768px");

  //$(".slides").css("left", "-992px");
  $(".slides").css("left", "-" + $(window).width().toString() - 8 );
  
  //$(".slide").css("width", "992px");
  //$(".slide").css("height", "768px");
  $(".slide").css("width", $(window).width() + 8);
  $(".slide").css("height", ($(window).width() + 8) / 1.29);

  slideWidth = allSlides[0].offsetWidth;

  $('.slider').hide().show(0);
}