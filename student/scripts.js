window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('message') && urlParams.get('message') === 'success') {
        alert("Student logged in successfully!");
    }
};
var typed = new Typed((".skills"),{
    strings : ["Frontend developer","Backend developer","programmer"],
    typeSpeed : 100,
    backSpeed : 100,
    backDelay : 1000,
    loop : true
})
document.getElementById('downloadBtn').addEventListener('click', function() {
    window.location.href = 'Resume.png';
  });