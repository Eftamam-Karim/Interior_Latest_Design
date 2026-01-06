document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
            
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('ধন্যবাদ! আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।');
            this.reset();
        });
    }
    
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('ধন্যবাদ! আপনার রিভিউ সফলভাবে সাবমিট করা হয়েছে।');
            this.reset();
            resetStars();
        });
    }
    
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    setupStarRating();
    loadBlogPosts();
    loadCustomerReviews();
});

function setupStarRating() {
    const stars = document.querySelectorAll('.stars i');
    if (!stars.length) return;
    
    const ratingValue = document.getElementById('ratingValue');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingValue.value = rating;
            
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                } else {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                }
            });
        });
        
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            const currentRating = parseInt(ratingValue.value);
            
            stars.forEach((s, index) => {
                if (index < currentRating) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                } else {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                }
            });
        });
    });
}

function resetStars() {
    const stars = document.querySelectorAll('.stars i');
    const ratingValue = document.getElementById('ratingValue');
    
    ratingValue.value = 5;
    
    stars.forEach((star, index) => {
        if (index < 5) {
            star.classList.remove('far');
            star.classList.add('fas', 'active');
        } else {
            star.classList.remove('fas', 'active');
            star.classList.add('far');
        }
    });
}

function loadBlogPosts() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;
    
    const blogPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    
    if (blogPosts.length === 0) {
        blogGrid.innerHTML = `
            <div class="blog-card">
                <div class="blog-image">
                    <div class="image-placeholder">আধুনিক হোম ডিজাইন</div>
                </div>
                <div class="blog-content">
                    <span class="blog-date">১৫ ডিসেম্বর, ২০২৩</span>
                    <h3>২০২৪ সালের ইন্টেরিয়র ডিজাইন ট্রেন্ডস</h3>
                    <p>আগামী বছরের জন্য নতুন ডিজাইন ধারণা এবং স্টাইল সম্পর্কে জানুন...</p>
                    <a href="#" class="read-more" onclick="showBlogDemo()">আরও পড়ুন</a>
                </div>
            </div>
            
            <div class="blog-card">
                <div class="blog-image">
                    <div class="image-placeholder">রঙের ব্যবহার</div>
                </div>
                <div class="blog-content">
                    <span class="blog-date">১০ ডিসেম্বর, ২০২৩</span>
                    <h3>ঘরের জন্য সঠিক রঙ নির্বাচন</h3>
                    <p>আপনার ঘরের মূড এবং পরিবেশ অনুযায়ী রঙ নির্বাচনের গাইডলাইন...</p>
                    <a href="#" class="read-more" onclick="showBlogDemo()">আরও পড়ুন</a>
                </div>
            </div>
            
            <div class="blog-card">
                <div class="blog-image">
                    <div class="image-placeholder">লাইটিং ডিজাইন</div>
                </div>
                <div class="blog-content">
                    <span class="blog-date">৫ ডিসেম্বর, ২০২৩</span>
                    <h3>ঘরকে আলোকিত করার শিল্প</h3>
                    <p>সঠিক লাইটিং কিভাবে আপনার ঘরকে রূপান্তরিত করতে পারে...</p>
                    <a href="#" class="read-more" onclick="showBlogDemo()">আরও পড়ুন</a>
                </div>
            </div>
        `;
        return;
    }
    
    blogGrid.innerHTML = '';
    
    blogPosts.slice(0, 3).forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        blogCard.innerHTML = `
            <div class="blog-image">
                <div class="image-placeholder">${post.title}</div>
            </div>
            <div class="blog-content">
                <span class="blog-date">${post.date}</span>
                <h3>${post.title}</h3>
                <p>${post.content.substring(0, 100)}...</p>
                <a href="#" class="read-more" onclick="showBlogPost(${post.id}); return false;">আরও পড়ুন</a>
            </div>
        `;
        blogGrid.appendChild(blogCard);
    });
}

function loadCustomerReviews() {
    const reviewsGrid = document.querySelector('.reviews-grid');
    if (!reviewsGrid) return;
    
    const reviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
    
    if (reviews.length === 0) return;
    
    reviewsGrid.innerHTML = '';
    
    reviews.slice(0, 3).forEach(review => {
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= review.rating) {
                starsHTML += '<i class="fas fa-star"></i>';
            } else {
                starsHTML += '<i class="far fa-star"></i>';
            }
        }
        
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div>
                        <h4>${review.name}</h4>
                        <p>${review.location}</p>
                    </div>
                </div>
                <div class="review-rating">
                    ${starsHTML}
                </div>
            </div>
            <p class="review-text">"${review.text}"</p>
            <span class="review-date">${review.date}</span>
        `;
        
        reviewsGrid.appendChild(reviewCard);
        
        reviewCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        reviewCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function showBlogPost(id) {
    const blogPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    const post = blogPosts.find(p => p.id === id);
    
    if (post) {
        alert(`ব্লগ পোস্ট: ${post.title}\n\n${post.content}\n\nতারিখ: ${post.date}`);
    }
}

function showBlogDemo() {
    alert('এই ব্লগ পোস্ট শুধু ডেমো দেখাচ্ছে। এডমিন admin.html পেজে গিয়ে নতুন ব্লগ পোস্ট তৈরি করুন।');
}