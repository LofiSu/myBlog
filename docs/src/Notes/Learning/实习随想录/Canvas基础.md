---
updateTime: "2024-11-21 10:30"
desc: "Canvas基础"
tags: "Canvas"
outline: deep
---
# Canvas基础

### 1. **Canvas 基础概念**
Canvas 元素通过一个矩形区域来绘制图像，依赖 JavaScript 进行绘制操作。其核心接口为 `getContext()`，该接口提供了绘图环境，通常是 2D 或 WebGL（3D）的上下文。

#### 基本结构：
```html
<canvas id="myCanvas" width="500" height="400"></canvas>
```

#### 获取 2D 绘图上下文：
```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d'); // 2D 上下文
```

### 2. **绘制基本图形**
#### 2.1 绘制矩形
Canvas 提供了三种方法来绘制矩形：
- `fillRect(x, y, width, height)`：绘制填充的矩形
- `strokeRect(x, y, width, height)`：绘制矩形边框
- `clearRect(x, y, width, height)`：清除矩形区域的内容

```javascript
ctx.fillStyle = 'red';  // 设置填充颜色
ctx.fillRect(10, 10, 100, 50);  // 绘制一个红色的矩形

ctx.strokeStyle = 'blue';  // 设置边框颜色
ctx.strokeRect(130, 10, 100, 50);  // 绘制一个蓝色边框的矩形
```

#### 2.2 绘制路径（线段和多边形）
Canvas 使用 `beginPath()` 方法开始一个新的路径，使用 `moveTo()` 定义路径的起点，使用 `lineTo()` 定义路径的终点，最后使用 `stroke()` 或 `fill()` 来描绘或填充路径。

```javascript
ctx.beginPath();
ctx.moveTo(50, 50);  // 起点
ctx.lineTo(150, 50);  // 线段
ctx.lineTo(100, 100);  // 另一条线段
ctx.closePath();  // 闭合路径
ctx.stroke();  // 描绘路径
```

#### 2.3 绘制圆形和弧线
`arc(x, y, radius, startAngle, endAngle, anticlockwise)` 可以用来绘制弧线和圆。参数包括圆心坐标、半径、起始角度、结束角度和方向。

```javascript
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2, false);  // 绘制一个完整的圆
ctx.stroke();  // 描绘路径
```

### 3. **填充与样式**
Canvas 提供了多种样式来控制绘制的图形，比如颜色、渐变和图案等。

#### 3.1 填充颜色
使用 `fillStyle` 设置填充颜色，`strokeStyle` 设置描边颜色。

```javascript
ctx.fillStyle = 'green';  // 填充样式
ctx.fillRect(10, 10, 100, 100);  // 绘制填充的绿色矩形
```

#### 3.2 线条样式
通过 `lineWidth` 来设置线条宽度，可以通过 `lineJoin` 和 `lineCap` 设置线条的连接样式和端点样式。

```javascript
ctx.lineWidth = 5;  // 设置线宽
ctx.strokeStyle = 'purple';  // 设置描边颜色
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(100, 10);
ctx.stroke();  // 描绘线段
```

#### 3.3 渐变
Canvas 支持线性渐变和放射性渐变。创建渐变使用 `createLinearGradient()` 或 `createRadialGradient()` 方法。

```javascript
const gradient = ctx.createLinearGradient(0, 0, 200, 0);  // 创建线性渐变
gradient.addColorStop(0, 'red');  // 起始颜色
gradient.addColorStop(1, 'blue');  // 结束颜色
ctx.fillStyle = gradient;  // 应用渐变
ctx.fillRect(10, 10, 200, 100);  // 绘制带有渐变的矩形
```

### 4. **文字与图像**
Canvas 可以绘制文字并处理图像。

#### 4.1 绘制文字
使用 `fillText()` 和 `strokeText()` 方法可以绘制文字。文本样式可以通过 `font`、`textAlign` 和 `textBaseline` 等属性来设置。

```javascript
ctx.font = '30px Arial';  // 设置字体
ctx.fillStyle = 'black';  // 设置填充样式
ctx.fillText('Hello Canvas', 10, 50);  // 绘制文字
```

#### 4.2 绘制图像
使用 `drawImage()` 方法可以将图片绘制到 Canvas 上。此方法可以接受一个图像对象、以及位置和缩放参数。

```javascript
const img = new Image();
img.src = 'image.jpg';
img.onload = function() {
    ctx.drawImage(img, 50, 50, 200, 150);  // 绘制图片
};
```

### 5. **动画**
通过 `requestAnimationFrame()` 方法实现动画，它可以自动控制每帧的绘制，使动画流畅。

```javascript
let x = 0;
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // 清除画布
    ctx.fillRect(x, 50, 50, 50);  // 绘制矩形
    x += 2;  // 改变位置
    requestAnimationFrame(animate);  // 请求下一帧
}
animate();
```

### 6. **事件与交互**
Canvas 可以监听鼠标、触摸事件，增加交互功能。通过 `addEventListener` 可以监听 `click`、`mousemove` 等事件，从而实现拖拽、绘画等效果。

```javascript
canvas.addEventListener('click', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    ctx.fillRect(x - 25, y - 25, 50, 50);  // 在点击处绘制一个矩形
});
```

### 7. **高级功能**
#### 7.1 保存与恢复状态
Canvas 提供了 `save()` 和 `restore()` 方法来保存和恢复绘图状态（如颜色、变换等），便于在复杂绘制中管理状态。

```javascript
ctx.save();  // 保存当前状态
ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 100, 100);
ctx.restore();  // 恢复到之前的状态
```

#### 7.2 变换与旋转
使用 `translate()`、`rotate()` 和 `scale()` 方法可以对图形进行平移、旋转和缩放。

```javascript
ctx.translate(200, 200);  // 平移坐标系
ctx.rotate(Math.PI / 4);  // 旋转45度
ctx.fillRect(0, 0, 100, 100);  // 绘制旋转后的矩形
```

---

通过这些基本知识，你可以进一步探索更高级的 Canvas 技术，如图像处理、像素操作等。学习 Canvas 最重要的是不断尝试与实践，建议你自己动手编写一些例子来加深理解。