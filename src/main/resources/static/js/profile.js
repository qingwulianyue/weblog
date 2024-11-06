// 模拟用户数据
const userData = {
    username: "二次元爱好者",
    avatar: "../image/1.jpg",
    bio: "热爱动漫、游戏和一切二次元文化的忠实粉丝！",
    postsCount: 42,
    followersCount: 1337,
    followingCount: 420,
    nickname: "动漫达人",
    gender: "保密",
    birthday: "2000-01-01",
    location: "二次元世界",
    interests: "动漫、游戏、Cosplay",
    signature: "为二次元文化献上心脏！"
};

// 模拟用户发布数据
const userPosts = [
    {
        id: 1,
        title: "今日份的美少女",
        content: "分享一张我最喜欢的美少女角色图片，你们觉得怎么样？",
        imageUrl: "../image/1.jpg"
    },
    {
        id: 2,
        title: "新番推荐",
        content: "这季度的新番《魔法少女的日常》真的很赞，强烈推荐给大家！",
        imageUrl: "../image/1.jpg"
    },
    {
        id: 3,
        title: "cos照片",
        content: "上周末的漫展cos照片，感谢摄影师的精彩抓拍！",
        imageUrl: "../image/1.jpg"
    },
    {
        id: 4,
        title: "动漫音乐分享",
        content: "最近单曲循环的OP，旋律太洗脑了，推荐给大家~",
        imageUrl: "../image/1.jpg"
    }
];

// 更新用户信息
function updateUserInfo() {
    document.getElementById('username').textContent = userData.username;
    document.getElementById('bio').textContent = userData.bio;
    document.getElementById('posts-count').textContent = userData.postsCount;
    document.getElementById('followers-count').textContent = userData.followersCount;
    document.getElementById('following-count').textContent = userData.followingCount;

    // 只在没有用户上传的头像时设置默认头像
    if (!profileAvatar.src || profileAvatar.src.endsWith('default-avatar.png')) {
        profileAvatar.src = userData.avatar;
    }

    // 更新个人资料
    document.getElementById('nickname').textContent = userData.nickname;
    document.getElementById('gender').textContent = userData.gender;
    document.getElementById('birthday').textContent = userData.birthday;
    document.getElementById('location').textContent = userData.location;
    document.getElementById('interests').textContent = userData.interests;
    document.getElementById('signature').textContent = userData.signature;
}

// 渲染用户发布
function renderPosts() {
    const postsContainer =
        document.getElementById('posts-container');
    postsContainer.innerHTML = '';
    userPosts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'post';
        postElement.innerHTML = `
            <img src="${post.imageUrl}" alt="${post.title}" class="post-image">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

// 背景图片切换
const backgroundImages = [
    '../image/2.jpg',
    '../image/1.jpg'
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
        e.preventDefault();
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

// 搜索功能
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPosts = userPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm)
    );
    renderFilteredPosts(filteredPosts);
}

function renderFilteredPosts(filteredPosts) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';
    filteredPosts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'post';
        postElement.innerHTML = `
            <img src="${post.imageUrl}" alt="${post.title}" class="post-image">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// 头像上传和预览
const avatarUpload = document.getElementById('avatar-upload');
const profileAvatar = document.getElementById('profile-avatar');
const toggleShape = document.getElementById('toggle-shape');

avatarUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileAvatar.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// 切换头像形状
toggleShape.addEventListener('click', function() {
    profileAvatar.classList.toggle('square');
    this.textContent = profileAvatar.classList.contains('square') ? '切换为圆形' : '切换为方形';
});

// 图片加载错误处理
profileAvatar.addEventListener('error', function() {
    this.src = '../image/1.jpg'; // 确保你有一个默认的头像图片
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    updateUserInfo();
    renderPosts();
});