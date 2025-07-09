 document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default anchor click behavior
                const targetId = this.getAttribute('href'); // Get the target section ID
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth' // Smooth scroll to the target
                });
            });
        });

        // Scroll to Top Button functionality
        const scrollToTopBtn = document.getElementById("scrollToTopBtn");

        // When the user scrolls down 20px from the top of the document, show the button
        window.onscroll = function() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        };

        // When the user clicks on the button, scroll to the top of the document
        scrollToTopBtn.addEventListener("click", function() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        });