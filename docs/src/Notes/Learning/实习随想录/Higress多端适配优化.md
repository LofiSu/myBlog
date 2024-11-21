---
updateTime: "2024-11-21 10:30"
desc: "Higress多端适配优化"
tags: "Higress"
outline: deep
---
# Higress多端适配优化

### 方法一：使用CSS媒体查询
通过媒体查询检测屏幕宽度，以判断是移动设备还是桌面设备。然后基于此选择性地展示视频或静态图像。

```css
  @media only screen and (max-width: 768px) {
    /* 隐藏视频，显示静态图像 */
    .video-background {
      display: none;
    }
    .static-image-background {
      display: block;
    }
  }

```
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

### 移动端浏览器对视频播放的处理原理

1. **自动播放限制**：在移动端设备上，为了节省用户的数据流量和电池电量，浏览器通常默认禁止视频的自动播放。尤其是在iOS设备上的Safari浏览器中，视频不会在页面加载时自动播放，除非视频设置为静音（muted）。即使设置为自动播放，Safari也可能要求用户与页面进行某种形式的交互（例如点击页面）才能开始播放视频。

2. **背景视频处理**：当视频被用作背景时（即使用CSS属性将视频定位在页面背景），在桌面浏览器上，通常可以实现无缝播放。然而，在移动端，特别是在iOS上，视频背景通常会遇到问题。这些问题包括视频无法自动播放、在播放时覆盖其他页面元素、以及不支持循环播放或静音播放等。

3. **覆盖问题**：在某些移动端浏览器中，当视频作为背景插入页面时，它可能会以比预期更高的层级显示，导致覆盖原本应该在视频上层显示的其他页面元素。这可能是由于浏览器在处理层级顺序（z-index）或其他渲染相关问题时的差异所导致的。

4. **浏览器性能与电池优化**：移动设备的硬件资源有限，浏览器通常会对资源密集型操作（如视频播放）进行优化。例如，Safari可能会限制在后台播放视频或限制多个视频同时播放。这些限制可能导致视频无法正确显示或影响页面的其他元素。



### **使用 `navigator.userAgent` 判断设备类型**
   可以通过 `navigator.userAgent` 来判断设备类型，根据结果决定是否渲染视频组件。

```jsx
import { useEffect, useState } from 'react';

function MediaComponent() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice = /mobile|android|iphone|ipad|phone/i.test(userAgent);
    setIsMobile(isMobileDevice);
  }, []);

  return (
    <div>
      {isMobile ? (
        <img src="image.jpg" alt="fallback" />
      ) : (
        <video src="video.mp4" controls />
      )}
    </div>
  );
}
```

###  **使用 `react-responsive` 库**
   `react-responsive` 提供了方便的媒体查询支持，可以在渲染前就确定是否渲染视频组件。这个库会在渲染之前决定是否渲染元素。

```jsx
import { useMediaQuery } from 'react-responsive';

function MediaComponent() {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <div>
      {isMobile ? (
        <img src="image.jpg" alt="fallback" />
      ) : (
        <video src="video.mp4" controls />
      )}
    </div>
  );
}
```

另外的：
###  **使用 JavaScript 判断设备类型**（但是这个还是none掉，在移动端还是会渲染就会影响速率）
   通过 `window.innerWidth` 来判断当前设备的宽度，依据结果来决定是否渲染视频组件。

```jsx
import { useEffect, useState } from 'react';

function MediaComponent() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    // 初始化判断
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? (
        <img src="image.jpg" alt="fallback" />
      ) : (
        <video src="video.mp4" controls />
      )}
    </div>
  );
}
```

`react-responsive` 是一个用于在 React 应用中处理媒体查询的库。它允许开发者根据屏幕尺寸或其他媒体特性（如设备方向或分辨率）来有条件地渲染组件或应用样式，而无需依赖 CSS 媒体查询。

### 主要功能：
1. **在 JavaScript 中使用媒体查询**：`react-responsive` 允许你直接在 JavaScript/JSX 代码中使用媒体查询，这样可以更方便地根据屏幕尺寸或设备类型来有条件地渲染组件或应用逻辑。

2. **支持服务器端渲染 (SSR)**：`react-responsive` 能够很好地与服务器端渲染配合使用，这对于那些需要在服务器上生成动态内容的应用非常有用。

3. **简化响应式设计**：通过在 JavaScript 中处理媒体查询，你可以避免复杂的 CSS 媒体查询和样式管理，将响应式设计逻辑集中在 JavaScript 中，提升代码的可维护性。

### 使用示例：
假设你想根据屏幕宽度来决定显示视频还是图片，你可以这样做：

```jsx
import { useMediaQuery } from 'react-responsive';

const MyComponent = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-device-width: 1224px)' });
  const isMobile = useMediaQuery({ query: '(max-device-width: 1224px)' });

  return (
    <div>
      {isDesktopOrLaptop && (
        <video
          autoPlay
          muted
          loop
          className="video-background"
          poster="https://example.com/poster.jpg"
        >
          <source
            src="https://example.com/video.mp4"
            type="video/mp4"
          />
        </video>
      )}
      {isMobile && (
        <div
          className="image-background"
          style={{ backgroundImage: "url('https://example.com/image.jpg')" }}
        ></div>
      )}
    </div>
  );
};
```

在这个示例中，根据屏幕宽度，`react-responsive` 将决定显示 `<video>` 还是 `<div>` 背景图片。