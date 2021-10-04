window.toastNotification = function (message, type=null, timer=10000) {
    $('#snackbar').text(message);
    $('#snackbar').addClass('show');

    setTimeout(()=>{
        $('#snackbar').removeClass('show');
    },4000)
}