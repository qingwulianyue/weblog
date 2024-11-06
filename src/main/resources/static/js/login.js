const backgroundImages = [
    '../image/1.jpg',
    '../image/2.jpg'
];

let currentBgIndex = 0;
const background = document.querySelector('.background');
const loginContainer = document.querySelector('.login-container');
const inputs = document.querySelectorAll('input');
const loginForm = document.getElementById('loginForm');
const registerBtn = document.getElementById('registerBtn');
const forgotPassword = document.getElementById('forgotPassword');
const message = document.getElementById('message');
const messageText = document.getElementById('messageText');
const closeMessage = document.getElementById('closeMessage');

// 背景轮播
function changeBackground() {
    currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
    background.style.backgroundImage = `url(${backgroundImages[currentBgIndex]})`;
}

setInterval(changeBackground, 5000);
changeBackground(); // 初始化背景

// 输入框焦点效果
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        background.classList.add('blur-background');
        loginContainer.style.backdropFilter = 'blur(20px)';
    });

    input.addEventListener('blur', () => {
        background.classList.remove('blur-background');
        loginContainer.style.backdropFilter = 'blur(10px)';
        if (input.value.trim() !== '') {
            if (input.id === 'username'){
                checkUsername(input.value);
            }
        }
    });
});

// 登录表单提交
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    login();
});

// 注册按钮点击
registerBtn.addEventListener('click', () => {
    showMessage('正在跳转到注册页面...');
    // 这里可以添加跳转到注册页面的逻辑
    $.post("/login_submit",{
        initiator: "registerBtn"
    }, function (data){
        if (data.result === "redirect"){
            window.location.href = data.url;
        }
    })
});

// 忘记密码链接点击
forgotPassword.addEventListener('click', (e) => {
    e.preventDefault();
    showMessage('正在处理密码重置请求...');
    // 这里可以添加处理忘记密码的逻辑
});

// 显示消息
function showMessage(text) {
    messageText.textContent = text;
    message.classList.remove('hidden');
    setTimeout(() => {
        message.classList.add('hidden');
    }, 3000);
}

// 关闭消息
closeMessage.addEventListener('click', () => {
    message.classList.add('hidden');
});

function checkUsername(username){
    $.post("/login_submit",{
        initiator: "username",
        username: username
    }, function (data){
        if (data.result === "failure"){
            showMessage('该用户名不存在');
        }
    })
}

function login(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    showMessage('正在登录...');
    $.post("/login_submit",{
        initiator: "loginBtn",
        username: username,
        password: password
    }, function (data){
        if (data.result === "success"){
            window.location.href = data.url;
        } else if (data.result === "failure"){
            showMessage("登录失败...");
        }
    })
}