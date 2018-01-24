$(document).ready(function () {
  var quoteSlider = new Swiper('.get-started-slider', {
    uniqueNavElements: true,
    loop: true,
    nextButton: '.quote-slider-next',
    prevButton: '.quote-slider-prev'
  });

  var risksSlider = new Swiper('.risks-slider', {
    // Optional parameters
    loop: true,
    centeredSlides: true,
    slidesPerView: 2,
    initialSlide: 2,
    effect: 'coverflow',
    nextButton: '.risk-button-next',
    prevButton: '.risk-button-prev',
    coverflow: {
      rotate: 0,
      stretch: -9,
      depth: 200,
      modifier: 3.2,
      slideShadows: false
    },

    paginationType: 'custom',
    pagination: '.risks-pagination',
    paginationCustomRender: function (swiper, index, className) {
      var el = $('#risks-slider-text-' + index);
      var slideTitle = el.attr('data-title');
      var slideDescription = el.text();
      return '<div class="' + className + '">' + '<h4 class="title">' + slideTitle + '</h4>' + '<span>' + slideDescription + '</span>' + '</div>';
    },

    breakpoints: {
      767: {
        initialSlide: 1,
        slidesPerView: 1,
        centeredSlides: false,
        effect: false,
        coverflow: false
      },
      960: {
        initialSlide: 1,
        slidesPerView: 1,
        centeredSlides: false,
        effect: false,
        coverflow: false
      }
    },

    onInit: function (swiper) {
      setToggleNumber(swiper.activeIndex, 5, '.risks-slider-nav', true);
    },
    onTransitionEnd: function (swiper) {
      setToggleNumber(swiper.activeIndex, 5, '.risks-slider-nav', true);
    }

  });

  var channelsSlider = new Swiper('.channels-slider', {
    // Optional parameters
    loop: true,
    slidesPerView: 1,
    initialSlide: 0,
    autoHeight: false,
    nextButton: '.channels-button-next',
    prevButton: '.channels-button-prev',
    breakpoints: {
      576: {
        autoHeight: true
      }
    },
    onInit: function (swiper) {
      setToggleNumber(swiper.activeIndex, 6, '.channels-slider-nav');
    },
    onTransitionEnd: function (swiper) {
      setToggleNumber(swiper.activeIndex, 6, '.channels-slider-nav');
    }
  });

  function setToggleNumber(number, slidesCount, nav, centered) {
    if (window.matchMedia('(min-width: 768px)').matches) {

      if (centered) {
        number = number - 1;
      }

      if (number > slidesCount) {
        number = number - slidesCount;
      } else {
        if (number <= 0) {
          number = slidesCount;
        }
      }

      updateSliderNav(nav, number);
    }
  }


  function updateSliderNav(el, index) {
    var sliderNav = $(el);
    var element = sliderNav.find('.slider-slide-toggler[data-slide-num="' + index + '"]');
    element.siblings().removeClass('active');
    element.addClass('active');
  }

  var risksToggleLink = $('.risks-slider-nav .slider-slide-toggler');

  risksToggleLink.click(function () {
    var number = $(this).attr('data-slide-num');

    risksSlider.slideTo(+number + 1, 300);
  });

  var channelsToggleLink = $('.channels-slider-nav .slider-slide-toggler');

  channelsToggleLink.click(function () {
    var number = $(this).attr('data-slide-num');

    channelsSlider.slideTo(number, 300);
  });

  $('[data-toggle="tooltip"]').tooltip();


  //Smooth scrolling by anchors

  var scrollnow = function(e) {
    // if scrollnow()-function was triggered by an event
    if (e) {
      e.preventDefault();
      var target = this.hash;
    }
    // else it was called when page with a #hash was loaded
    else {
      var target = location.hash;
    }

    // same page scroll
    $.smoothScroll({
      offset:20,
      scrollTarget: target
    });
  };

  // if page has a #hash
  if (location.hash) {
    $('html, body').scrollTop(0).show();
    // smooth-scroll to hash
    scrollnow();
  }

  // for each <a>-element that contains a "/" and a "#"
  $('a[href*="#"]').each(function(){
    // if the pathname of the href references the same page
    if (this.pathname.replace(/^\//,'') == location.pathname.replace(/^\//,'') && this.hostname == location.hostname) {
      // only keep the hash, i.e. do not keep the pathname
      $(this).attr("href", this.hash);
    }
  });

  // select all href-elements that start with #
  // including the ones that were stripped by their pathname just above
  $('a[href^="#"]:not([href="#"])').click(scrollnow);
});

function redirectSuccess() {
  window.location.replace("request-success.html");
  return false;
}

$(document).ready(function () {
  var chosenPlan = 0;

  $('[id^="plan-"]').click(function () {
    chosenPlan = ($(this).attr('id').split('-')[1]);
  });

  $('#plans-table').submit(function (e) {
    e.preventDefault();

    //these are all checked inputs in the form
    var array = $(this).serializeArray();

    //filter inputs by chosen plan
    var chosenFeatures = $.grep(array, function (v) {
      return v.name.startsWith(chosenPlan);
    });

    //write to sessionStorage chosen plan
    sessionStorage.setItem('chosenPlan', chosenPlan);

    //write to sessionStorage chosen features
    sessionStorage.setItem('chosenFeatures', JSON.stringify(chosenFeatures));

    //get chosen features from sessionStorage
    var obj = JSON.parse(sessionStorage.getItem('chosenFeatures'));

    var selectedPlan = JSON.parse(sessionStorage.getItem('chosenPlan'));

    //redirect to subscription page
    window.location = 'subscription.html';
  });

  var plansWrap = $('.plans-block');
  var plansCol = $('.plan-col');
  var plansHeaders = $('.head-content-wrap');
  var currentPlan = document.location.hash.split('=')[1] || 1;
  plansWrap.removeClass();
  plansWrap.addClass('plans-block active-' + currentPlan);

  if (window.matchMedia('(max-width: 767px)').matches) {
    plansHeaders.click(function () {
      var currentPlan = $(this).attr('data-col');
      var nextPlan = +currentPlan + 1;
      if (nextPlan > 4) {
        nextPlan = +nextPlan - 4;
      }
      plansWrap.removeClass();
      plansWrap.addClass('plans-block active-' + nextPlan);
    });
  }
  else {
    plansCol.hover(function () {
      var currentCol = $(this).attr('data-col');
      plansWrap.removeClass();
      plansWrap.addClass('plans-block active-' + currentCol);
    })
  }
});
