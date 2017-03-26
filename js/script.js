document.addEventListener("DOMContentLoaded", function() {
    var offset = 900;

    var topBtn = document.getElementsByClassName('topBtn')[0];


    window.onscroll = function() {
        var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

        if (scrollTop > offset && topBtn.className.indexOf("top-is-visible") == -1) {
            topBtn.classList.add("top-is-visible")
        }
        else if (scrollTop <= offset && topBtn.className.indexOf("top-is-visible") > -1 ) {
            topBtn.classList.remove("top-is-visible");
        }
    };
});