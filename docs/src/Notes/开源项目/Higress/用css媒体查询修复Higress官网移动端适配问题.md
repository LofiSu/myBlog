### 应对策略

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

### 方法二：使用JavaScript检测设备类型

通过JavaScript，你可以更精确地检测用户的设备类型，然后根据结果动态切换视频或静态图像。

```html
<!-- HTML 部分 -->
<div class="home-introduce-wrapper h-[65vh] relative">
  <div id="media-container">
    <!-- 视频或图片将通过JavaScript动态插入 -->
  </div>
  <div class="introduce flex flex-col justify-center items-center bg-transparent h-full relative z-1">
    <!-- 其他内容 -->
  </div>
</div>

<!-- JavaScript 部分 -->
<script>
  function isMobileDevice() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  const mediaContainer = document.getElementById('media-container');

  if (isMobileDevice()) {
    // 如果是移动设备，插入静态图像
    mediaContainer.innerHTML = `
      <div class="static-image-background"></div>
    `;
  } else {
    // 如果是桌面设备，插入视频
    mediaContainer.innerHTML = `
      <video
        autoplay
        muted
        loop
        playsinline
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
</script>
```

> Higress官网出现移动端适配问题，在手机浏览器上面，background显示一个视频，而且是自定义播放的视频，视频会覆盖掉原本位置的所有元素。然后我就去仔细检查了一下源码，是有人直接把MP4文件嵌入进去的。我属实没有想到。。。


```
<source src="https://cloud.video.taobao.com/vod/play/V3VEOGxHS3IxSU5wWkFYeTFuZU4wdHJ2eXloK1g1aXlXV0pvNU0zVjhmYTZQZWw1SnpKVVVCTlh4OVFON0V5UUVMUDduY1RJak82VE1sdXdHTjNOaHc9PQ"
        type="video/mp4"
      />
```


在移动端浏览器（尤其是iOS设备上的Safari浏览器）上，视频的处理方式与桌面端浏览器有显著不同。这种差异主要源于移动设备的硬件资源和电池续航能力的限制。

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