
```html
<script>
  // 当 DOM 内容完全加载并且解析完成时，执行回调函数
  document.addEventListener('DOMContentLoaded', () => {
    // 定义一个函数来更新媒体内容（视频或图片）
    function updateMedia() {
      // 获取具有 class 为 'media-container' 的元素
      const mediaContainer = document.querySelector('.media-container');
      
      // 检查当前窗口的宽度
      if (window.innerWidth <= 768) {
        // 如果窗口宽度小于或等于 768 像素（通常是移动设备），则插入图片
        mediaContainer.innerHTML = `
          <div id="background-image" class="image-background" 
               style="background-image: url('https://img.alicdn.com/imgextra/i1/O1CN01U3PG171Wiz4B85TGK_!!6000000002823-0-tps-2388-1168.jpg');"></div>
        `;
      } else {
        // 如果窗口宽度大于 768 像素（通常是 PC 端），则插入视频
        mediaContainer.innerHTML = `
          <video
            id="background-video"
            autoplay
            muted
            loop
            class="video-background"
            poster="https://img.alicdn.com/imgextra/i1/O1CN01U3PG171Wiz4B85TGK_!!6000000002823-0-tps-2388-1168.jpg"
          >
            <source
              src="https://cloud.video.taobao.com/vod/play/V3VEOGxHS3IxSU5wWkFYeTFuZU4wdHJ2eXloK1g1aXlXV0pvNU0zVjhmYTZQZWw1SnpKVVVCTlh4OVFON0V5UUVMUDduY1RJak82VE1sdXdHTjNOaHc9PQ"
              type="video/mp4"
            />
          </video>
        `;
      }
    }

    // 页面加载完成时，初次调用 updateMedia 函数以设置正确的媒体内容
    updateMedia();

    // 监听窗口大小变化事件，窗口大小变化时调用 updateMedia 函数
    window.addEventListener('resize', updateMedia);
  });
</script>
```

### 代码详细解释

1. **`document.addEventListener('DOMContentLoaded', () => {...});`**
   - 这段代码设置了一个事件监听器，用于监听页面的 `DOMContentLoaded` 事件。这个事件会在 HTML 文档被完全加载和解析完成时触发。此时，JavaScript 代码可以安全地操作 DOM 元素。

2. **`function updateMedia() {...}`**
   - 定义一个名为 `updateMedia` 的函数，用于根据当前窗口的宽度决定插入图片还是视频。这个函数是核心部分，用于动态调整页面内容。

3. **`const mediaContainer = document.querySelector('.media-container');`**
   - 使用 `document.querySelector` 获取页面上第一个匹配 `class` 为 `media-container` 的元素，并将其存储在变量 `mediaContainer` 中。这个元素将用于插入或更新媒体内容。

4. **`if (window.innerWidth <= 768) {...}`**
   - 检查窗口的宽度是否小于或等于 768 像素。这通常用来判断是否在移动设备上（根据设备的常见屏幕宽度）。

5. **`mediaContainer.innerHTML = ...`**
   - 根据窗口宽度的检查结果，使用 `innerHTML` 属性动态更新 `mediaContainer` 元素的内容：
     - **移动端**：插入一个 `div` 元素，并将其 `background-image` 样式设置为图片 URL，以显示背景图片。
     - **PC 端**：插入一个 `video` 元素，并设置视频的属性（自动播放、静音、循环播放），同时添加视频源（`source` 元素）。

6. **`updateMedia();`**
   - 在页面加载时调用 `updateMedia` 函数，确保页面初次加载时能够插入正确的媒体内容（根据当前窗口宽度）。

7. **`window.addEventListener('resize', updateMedia);`**
   - 监听窗口大小变化事件（`resize`），每当窗口的大小发生变化时，调用 `updateMedia` 函数，以便根据新的窗口大小动态更新媒体内容。这保证了当用户调整浏览器窗口大小时，页面上的媒体内容会随之更新。

### 总结
这段代码通过动态插入适合当前屏幕尺寸的媒体内容（图片或视频），提高了页面的响应性和用户体验。它在页面加载完成时和窗口尺寸调整时都会检查并更新媒体内容，从而确保不同设备上有最佳的显示效果。
是的，在移动端我们通常会替换视频为图片，以适应不同的屏幕尺寸和性能要求。这样做可以避免在移动设备上加载和播放较大的视频文件，减少带宽使用和提高页面加载速度。
### **使用 JavaScript 动态插入元素**
在页面加载时，通过 JavaScript 判断屏幕宽度来决定插入视频还是图片。这种方法可以完全避免在移动端加载视频文件，同时加载适合的图片。
### **优点**

- **性能优化**：避免在移动端加载不必要的视频文件，节省带宽并提高页面加载速度。
- **灵活性**：可以根据屏幕尺寸动态调整显示内容，提高用户体验。

### **其他优化**

- **延迟加载（Lazy Loading）**：可以对图片和视频进行延迟加载，以进一步优化性能，特别是当这些元素在视口外时。
- **服务器端渲染（SSR）**：可以根据用户代理信息在服务器端决定插入哪种媒体元素，避免客户端 JavaScript 的执行延迟。

通过这些方法，你可以有效地处理移动端和 PC 端的媒体适配问题，提高页面的响应速度和用户体验。