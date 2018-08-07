var getUrl = window.location;
var baseUrl = getUrl.protocol + "//" + getUrl.host + "/";



/* ---- mixitup.js our work sorting ---- */
$('#thework').mixItUp({
    animation: {
		duration: 1000
    }
});

/* ---- our ideology hover ---- */
$('.process-box').hover(function() {
	$(this).find('.process-intro').hide();
	$(this).find('.process-content').fadeIn();
}, function() {
	$(this).find('.process-content').hide();
	$(this).find('.process-intro').fadeIn();
});

/* ---- contact form ---- */
/*
function validateForm() {
$("#contactForm").validate( function (event) {
    if (event.isDefaultPrevented()) {
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        event.preventDefault();
        submitForm();
    }
});
}

function submitForm() {
    // Initiate Variables With Form Content
    var name = $("#nome").val();
    var email = $("#email").val();
    var empresa = $("#empresa").val();
    var mensagem = $("#mensagem").val();

    console.log("nome=" + name + "&email=" + email + "&empresa=" +
        empresa + "&mensagem=" + mensagem);
        
    $.ajax({
        type: "POST",
        url: "php/contact.php",
        data: "nome=" + name + "&email=" + email + "&empresa=" +
            empresa + "&mensagem=" + mensagem,
        success: function(text) {
            if (text == "success") {
                formSuccess();
            } else {
                formError();
                submitMSG(false, text);
            }
        }
    });
}
function formSuccess() {
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
}
function formError() {
    $("#contactForm").removeClass().addClass('shake animated').one(
        'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        function() {
            $(this).removeClass();
        });
}
function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h4 text-success";
    } else {
        var msgClasses = "h4 text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}*/

/* ---- our work gallery ---- */
$('#work').magnificPopup({
    delegate: 'a.zoom',
    type: 'image',
    fixedContentPos: false,
    removalDelay: 300,
    mainClass: 'mfp-fade',
    gallery: {
        enabled: true,
        preload: [0,2]
    }
});

/* ---- popup image ---- */
$('.popup-img').magnificPopup({
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-fade'
});

/* ---- popup video ---- */
$(document).ready(function() {
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
});

/* ---- nav smooth scroll ---- */
$(document).ready(function() {
    $('.scroll-link').on('click', function(event){
        event.preventDefault();
        var sectionID = $(this).attr("data-id");
        scrollToID('#' + sectionID, 750);
    });
    $('.scroll-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop:0}, 1200);
    });
});

/* ---- navbar offset ---- */
function scrollToID(id, speed){
    var offSet = 69;
    var targetOffset = $(id).offset().top - offSet;
    $('html,body').animate({scrollTop:targetOffset}, speed);
}

/* ---- animations ---- */
if (typeof sr == 'undefined') {
    window.sr = ScrollReveal({
        duration: 1500,
        delay: 50
    });
}
Royal_Preloader.config({
    onComplete: function () {
        triggerReveals();
    }
});
function triggerReveals() {
    sr.reveal('.bottomReveal', {
        origin: 'bottom'
    }).reveal('.leftReveal', {
        origin: 'left'
    }).reveal('.rightReveal', {
        origin: 'right'
    }).reveal('.topReveal', {
        origin: 'top'
    });

    sr.reveal('.rotateBottomReveal', {
        origin: 'bottom',
        rotate: { x: 90 }
    }).reveal('.rotateLeftReveal', {
        origin: 'left',
        rotate: { x: 90 }
    }).reveal('.rotateRightReveal', {
        origin: 'right',
        rotate: { x: 90 }
    }).reveal('.rotateTopReveal', {
        origin: 'top',
        rotate: { x: 90 }
    })

    sr.reveal('.scaleReveal', {
        origin: 'top',
        scale: 0.6
    });
}

/* ---- close mobile nav on click ---- */
$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
});

/* ---- rotater text ---- */
var current = 1;
var height = jQuery('.ticker').height();
var numberDivs = jQuery('.ticker').children().length;
var first = jQuery('.ticker h1:nth-child(1)');
setInterval(function() {
    var number = current * -height;
    first.css('margin-top', number + 'px');
    if (current === numberDivs) {
        first.css('margin-top', '0px');
        current = 1;
    } else current++;
}, 2500);


function throwGroupExceptions(data) {
    for (var i in data) {
        throwError("O campo " + data[i].field + " é requerido");
    }
}

function throwError(message) {
    toastr["error"](message);
}

function throwAlert(message) {
    toastr["warning"](message);
}

function simpleNotify(message) {
    toastr["info"](message);
}

function successAlert(message) {
    toastr["success"](message);
}

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imagePreview').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
