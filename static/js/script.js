document.addEventListener("DOMContentLoaded", function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    // const outputText = document.getElementById('output-text');
    const imageForm = document.getElementById('image-form');
    const imageUpload = document.getElementById('image-upload');
    const submittedImage = document.getElementById('submitted-image');
    // const languageSelect = document.getElementById('language-select');
    const htmlTag = document.documentElement;
    const hiddenContent = document.getElementsByClassName('hidden-until-submit')


    // scrolling animation
    const elements = document.querySelectorAll(".container .element-container, .main-container section");
    // Create IntersectionObserver to detect when elements are in the viewport
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add 'visible' class to trigger the animation
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);  // Stop observing once the animation has been triggered
        }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible
    // Observe each element
    elements.forEach(element => observer.observe(element));


    // Dark Mode Toggle
    darkModeToggle.addEventListener('click', function() {
        if (htmlTag.getAttribute('data-theme') === 'dark') {
            htmlTag.setAttribute('data-theme', 'light');
        }
        else {
            htmlTag.setAttribute('data-theme', 'dark');
        }
    });

    // Image Submission
    imageForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const file = imageUpload.files[0];
        const plantType = document.getElementById('plant-type').value;
        const csrfToken = document.querySelector('input[name="csrf_token"]').value;  // Extract CSRF token

        if (file) {
            const reader = new FileReader();
            const formData = new FormData();
            formData.append('image-upload', file);
            formData.append('plant-type', plantType);  // Include plant type in form data
    
            fetch('/upload', { // The endpoint where the server will handle the upload
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': csrfToken  // Add CSRF token in headers
                }
            })
            .then(response => response.json())
            .then(data => {
                // Display the result in the result div
                document.getElementById('result').innerHTML = 
                    `<strong>Plant:</strong> ${data.Plant}<br>
                    <strong>Disease:</strong> ${data.Disease}<br>
                    <strong>Causes:</strong> ${data.Causes}<br>
                    <strong>Treatment:</strong> ${data.Treatment}<br>
                    <strong>Confidence:</strong> ${data.Confidence}%`;
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('result').innerText = 'Error analyzing the image.';
            });

            reader.onload = function(e) {
                submittedImage.src = e.target.result;
                
                // Show hidden content
                for (let i = 0; i < hiddenContent.length; i++) {
                    hiddenContent[i].style.display = 'block';
                }
            };
            reader.readAsDataURL(file);
        } 
    });
});