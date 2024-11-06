const backgroundImages = [
    '../image/1.jpg',
    '../image/2.jpg'
];

let currentBgIndex = 0;
const background = document.querySelector('.background');
const registerContainer = document.querySelector('.register-container');
const inputs = document.querySelectorAll('input');
const registerForm = document.getElementById('registerForm');
const loginBtn = document.getElementById('loginBtn');
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
        registerContainer.style.backdropFilter = 'blur(20px)';
    });

    input.addEventListener('blur', () => {
        background.classList.remove('blur-background');
        registerContainer.style.backdropFilter = 'blur(10px)';

        // 新增：在输入框失去焦点时执行
        if (input.value.trim() !== '') {
            if (input.id === 'confirmPassword'){
                if (input.value !== document.getElementById('password').value){
                    showMessage('两次密码不一致');
                }
            } else if (input.id === 'email'){
                checkEmail(input.value);
            } else if (input.id === 'username'){
                checkUsername(input.value);
            }
        }
    });
});

// 注册表单提交
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    register();
});

// 登录按钮点击
loginBtn.addEventListener('click', () => {
    showMessage('正在跳转到登录页面...');
    // 这里可以添加跳转到登录页面的逻辑
    $.post("/register_submit",{
        initiator: "loginBtn"
    }, function (data){
        if (data.result === "redirect"){
            window.location.href = data.url;
        }
    })
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

function checkEmail(email) {
    $.post("/register_submit",{
        initiator: "email",
        email: email
    }, function (data){
        if (data.result === "failure"){
            showMessage('该邮箱已注册');
            return false;
        }
    })
}

function checkUsername(username) {
    $.post("/register_submit",{
        initiator: "username",
        username: username
    }, function (data){
        if (data.result === "failure"){
            showMessage('该用户名已存在');
        }
    })
}

function register() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    showMessage('正在注册...');
    if (password !== confirmPassword){
        showMessage("两次密码不一致");
    } else {
        $.post("/register_submit",{
            initiator: "registerBtn",
            username: username,
            email: email,
            password: password
        }, function (data){
            if (data.result === "success"){
                window.location.href = data.url;
            } else if (data.result === "failure"){
                showMessage("注册失败...");
            }
        })
    }

}