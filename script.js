const canvas = document.getElementById('gameCanvas');  
const ctx = canvas.getContext('2d');  
  
canvas.width = 600;  
canvas.height = 800;  
  
const balls = [];  
  
function Ball(x, y, radius, color, dx, dy) {  
    this.x = x;  
    this.y = y;  
    this.radius = radius;  
    this.color = color;  
    this.dx = dx;  
    this.dy = dy;  
  
    this.draw = function() {  
        ctx.beginPath();  
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);  
        ctx.fillStyle = this.color;  
        ctx.fill();  
        ctx.closePath();  
    };  
  
    this.update = function() {  
        if (this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius) {  
            this.dx = -this.dx;  
        }  
        if (this.y + this.dy > canvas.height - this.radius || this.y + this.dy < this.radius) {  
            this.dy = -this.dy;  
        }  
  
        // 简单的碰撞检测（这里未完全实现，需要更复杂的逻辑来处理多球碰撞）  
        for (let other of balls) {  
            if (this !== other &&  
                Math.abs(this.x - other.x) < this.radius + other.radius &&  
                Math.abs(this.y - other.y) < this.radius + other.radius) {  
                this.color = getRandomColor();  
                other.color = getRandomColor();  
            }  
        }  
  
        this.x += this.dx;  
        this.y += this.dy;  
    };  
}  
  
function getRandomColor() {  
    let letters = '0123456789ABCDEF';  
    let color = '#';  
    for (let i = 0; i < 6; i++) {  
        color += letters[Math.floor(Math.random() * 16)];  
    }  
    return color;  
}  
  
function init() {  
    for (let i = 0; i < 10; i++) {  
        balls.push(new Ball(  
            Math.random() * (canvas.width - 40) + 20, // 留出空间避免立即反弹  
            Math.random() * (canvas.height - 40) + 20,  
            10,  
            getRandomColor(),  
            (Math.random() - 0.5) * 4, // 速度的x分量  
            (Math.random() - 0.5) * 4  // 速度的y分量  
        ));  
    }  
  
    setInterval(draw, 10);  
}  
  
function draw() {  
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    balls.forEach(ball => {  
        ball.draw();  
        ball.update();  
    });  
}  
  
init();