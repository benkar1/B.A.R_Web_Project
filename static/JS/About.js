

document.addEventListener("DOMContentLoaded", () => {

    if (document.cookie.length < 2){
        const nav_link = document.querySelector('.dropdown');
        nav_link.style.display = 'none';
    }

});