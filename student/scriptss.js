window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('message') && urlParams.get('message') === 'success') {
        alert("Student logged in successfully!");
    }

    // Initialize Typed.js only if the element with class 'skills' exists
    const skillsElement = document.querySelector(".skills");
    if (skillsElement) {
        new Typed(".skills", {
            strings: ["Software Tester", "ML Engineer", "Programmer"],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });
    }

    // Add download event listener if downloadBtn exists
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            window.location.href = 'Resume2.png';
        });
    }
};
