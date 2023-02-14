
let activePage = window.location.pathname;

/*
highlight the active selection at the navigation bar
*/
document.querySelectorAll('nav a').forEach(link => {
    if (link.href.includes(`${activePage}`)) {
        link.classList.add("active");
    }else{
        link.classList.remove("active");
    }
})