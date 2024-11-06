const posts = [
    {
        id: 1,
        title: "可爱的猫娘女仆",
        description: "探索二次元世界中最受欢迎的角色类型之一：猫娘女仆。了解她们的魅力所在！",
        imageUrl: "../image/1.jpg"
    },
    {
        id: 2,
        title: "动漫中的美食世界",
        description: "从《食戟之灵》到《异世界食堂》，盘点动漫中那些令人垂涎三尺的美食场景。",
        imageUrl: "../image/1.jpg"
    },
    {
        id: 3,
        title: "穿越时空的爱恋",
        description: "分析《你的名字。》、《穿越时空的少女》等作品中的时空恋爱主题。",
        imageUrl: "../image/1.jpg"
    },
    {
        id: 4,
        title: "机甲与未来",
        description: "从《新世纪福音战士》到《DARLING in the FRANXX》，探讨机甲动漫的魅力。",
        imageUrl: "../image/1.jpg"
    },
    {
        id: 5,
        title: "魔法少女的变身",
        description: "从《美少女战士》到《魔法少女小圆》，探讨魔法少女动漫的演变。",
        imageUrl: "../image/1.jpg"
    },
    {
        id: 6,
        title: "运动竞技的热血",
        description: "《灌篮高手》、《排球少年》等作品中的热血精神如何激励观众？",
        imageUrl: "../image/1.jpg"
    }
];

let visiblePosts = 3;
const postGrid = document.getElementById('post-grid');
const loadMoreButton = document.getElementById('load-more');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

function renderPosts(postsToRender) {
    postGrid.innerHTML = '';
    postsToRender.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'post';
        postElement.innerHTML = `
            <img src="${post.imageUrl}" alt="${post.title}" class="post-image">
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <a href="#" class="read-more">阅读更多</a>
        `;
        postGrid.appendChild(postElement);
    });
}

function loadMorePosts() {
    visiblePosts = Math.min(visiblePosts + 3, posts.length);
    renderPosts(posts.slice(0, visiblePosts));
    if (visiblePosts >= posts.length) {
        loadMoreButton.style.display = 'none';
    }
}

function searchPosts() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.description.toLowerCase().includes(searchTerm)
    );
    renderPosts(filteredPosts);
    loadMoreButton.style.display = filteredPosts.length > visiblePosts ? 'block' : 'none';
}

// 初始化页面
renderPosts(posts.slice(0, visiblePosts));

// 事件监听器
loadMoreButton.addEventListener('click', loadMorePosts);
searchButton.addEventListener('click', searchPosts);
searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchPosts();
    }
});

// 背景图片切换
const backgroundImages = [
    '../image/1.jpg',
    '../image/2.jpg'
];

let currentImageIndex = 0;
const backgroundSlideshow = document.querySelector('.background-slideshow');

function changeBackground() {
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    backgroundSlideshow.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
}

// 初始化背景图片
backgroundSlideshow.style.backgroundImage = `url('${backgroundImages[0]}')`;

// 每5秒切换一次背景图片
setInterval(changeBackground, 5000);

// 导航栏活跃状态切换
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {

        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});