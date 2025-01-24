window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('message') && urlParams.get('message') === 'success') {
        alert("Student logged in successfully!");
    }
};
var typed = new Typed((".skills"),{
    strings : ["Architect","AI Enginner","programmer"],
    typeSpeed : 100,
    backSpeed : 100,
    backDelay : 1000,
    loop : true
})
