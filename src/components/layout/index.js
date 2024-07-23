document.querySelector('.menu-icon-toggle').addEventListener('click', function(e) {
    document.querySelector('.menu-navigation').classList.toggle('open');
    e.preventDefault();
});