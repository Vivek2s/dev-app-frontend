// var owl = $('.owl-carousel');
// owl.owlCarousel({
//     loop: false,
//     nav: true,
//     dots: false,
//     margin: 10,
//     responsive: {
//         0: {
//             items: 1
//         },
//         600: {
//             items: 2
//         },
//         900: {
//             items: 3
//         },
//         1200: {
//             items: 4
//         }
//     }
// });
// $(".owl-prev").html('<i  class="material-icons arrow-rot">arrow_right_alt</i>');
// $(".owl-next").html('<i class="material-icons">arrow_right_alt</i>');
// owl.on('mousewheel', '.owl-stage', function(e) {
//     if (e.deltaY > 0) {
//         owl.trigger('next.owl');
//     } else {
//         owl.trigger('prev.owl');
//     }
//     e.preventDefault();
// });


// $('.count').each(function () {
//     $(this).prop('Counter', 0).animate({
//         Counter: $(this).text()
//     }, {
//         duration: 4000,
//         easing: 'swing',
//         step: function (now) {
//             $(this).text(Math.ceil(now));
//         }
//     });
// });

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}