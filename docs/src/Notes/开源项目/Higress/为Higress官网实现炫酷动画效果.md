>AOS (Animate On Scroll) 是一个轻量级的开源库，用于在滚动页面时触发动画效果。

[[New Feature]Add animation effects to Higress website for enhanced user experience by LofiSu · Pull Request #289 · higress-group/higress-group.github.io](https://github.com/higress-group/higress-group.github.io/pull/289)这个里面，大部分动画效果我都是使用 AOS 实现的。AOS 允许我们为页面中的元素添加各种动画效果，如淡入、滑动、缩放等，并根据用户的滚动行为自动触发这些动画。这不仅提高了用户体验，还能让网页内容更具动态性和吸引力。

AOS 的主要功能包括：

1. **简单易用**：通过在元素上添加 `data-aos` 属性即可轻松实现动画效果，无需编写复杂的 JavaScript 代码。
2. **高度可定制**：AOS 提供多种配置选项，可以控制动画的延迟、持续时间、偏移量等，满足不同的设计需求。
3. **跨浏览器支持**：AOS 在大多数现代浏览器中都能良好运行，确保动画效果在不同设备上的一致性。
4. **轻量级**：即使在大型项目中使用，AOS 也不会显著增加页面的加载时间。

通过使用 AOS，我们的网页能够在用户滚动页面时为重要内容添加流畅的动画效果，使网页更加生动、富有层次感。

>首先下载AOS
你可以使用以下方式下载并安装 AOS 动画库：
如果你使用的是 npm 作为包管理工具：`npm install aos`
如果你使用的是 pnpm：`pnpm add aos`
如果你使用的是 yarn：`yarn add aos`

安装完成后，你就可以在你的项目中导入并使用 AOS 动画库了。

打开Pages文件夹，逐一修改出现在index.astro（首页）中的组件代码：
![[Pasted image 20240809152300.png]]
# <BaseLayout />
### 1. **导入 AOS 的样式**

```javascript
import "aos/dist/aos.css"; // 导入 AOS 样式
```

首先，在项目的全局样式文件中导入了 AOS 的 CSS 文件。这个文件包含了 AOS 所有的预设动画效果样式。确保在页面中正确引入这些样式，以便在元素滚动到视口时能正确显示动画效果。

### 2. **异步加载 AOS 并初始化**

```javascript
<script>
     import('aos').then(AOS => { 
       AOS.init({ 
             duration: 1200, // 动画持续时间  
             easing: 'ease-in-out', // 动画曲线 
        }); 
  }); 
</script>
```
在页面的 `<body>` 标签内，使用一个内联的 `<script>` 脚本来异步加载 AOS 库。这里使用了 `import('aos')`，这是一个动态的 `import` 语句，它会返回一个 Promise，当 AOS 库加载完成后，这个 Promise 将被解析。

### 3. **AOS 初始化**

```javascript
AOS.init({
duration: 1200, // 动画持续时间   
easing: 'ease-in-out', // 动画曲线
once: true, // 设置动画是否只触发一次
});`
```

在加载完成后，通过 `AOS.init()` 函数来初始化 AOS，并配置了以下选项：

- **`duration: 1200`**: 设置动画的持续时间为 1200 毫秒（1.2 秒）。
- **`easing: 'ease-in-out'`**: 定义动画的缓动函数，这里使用的是 `ease-in-out`，表示动画开始和结束时较慢，中间较快。

### 4. **配置解释**

- **异步加载**: 使用异步加载的方式来引入 AOS，确保 AOS 库只有在需要时才被加载，从而减少页面初始加载时间。
- **`AOS.init()`**: 这个方法用来初始化 AOS 并应用配置到页面上的所有元素。所有带有 `data-aos` 属性的元素将根据指定的配置来执行动画效果。

通过这些步骤，你在项目中成功集成了 AOS 动画效果，并且使其能够在用户滚动页面时自动触发预定义的动画。

# <HomeIntroduce />

### 背景和动画效果的实现

## 1. **背景视频的实现**
背景视频被设置为全屏覆盖，并且使用 `absolute` 定位，让它填充整个 `.home-introduce-wrapper` 容器。

```html
<video
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
```

- `autoplay`, `muted`, 和 `loop` 属性让视频自动播放、静音并循环播放。
- `class="video-background"` 使用 CSS 来确保视频填充整个容器 (`object-fit: cover`)。

## 2. **AOS 动画的引入和初始化**
在页面中引入了 AOS（Animate On Scroll）库来实现滚动动画。通过添加 `data-aos="fade-up"`，可以为指定的元素添加滚动时触发的动画。

```html
<div
  class="introduce flex flex-col justify-center items-center bg-transparent h-full relative z-1"
  data-aos="fade-up"
>
```

- `data-aos="fade-up"`：配置了 AOS 动画，当页面滚动到这个元素时，触发“向上淡入”的动画效果。
- 需要在页面中初始化 AOS：

```javascript
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();
```

## 3. **标题动画效果的实现**
标题动画效果包括文本逐步显示和打字机效果的结合。
### 1. **HTML 结构**

标题包含两个 `span` 元素，每个元素负责显示不同的文本部分。`step-1` 用于显示初始的文本，“AI网关”，而 `step-2` 包含打字机效果的文本“AI原生的API网关”。

```html
<div class="top-introduce-title leading-[96px] text-base-100 font-medium text-[2rem]">
  <span class="ai-description step-1">{t("home.title.native.ai")}网关</span>
  <span class="ai-description step-2">
    <span class="typing-text">
      {t("home.title.native.ai")}{t("home.title.native.api.gateway")}
    </span>
  </span>
</div>
```

- **`step-1`**: 显示初始的文本内容。
- **`step-2`**: 包含打字机效果的文本内容。

### 2. **CSS 动画效果**

#### **2.1. 文本动画**

**CSS 动画定义**

```css
.step-1, .step-2 {
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
}

.step-1 {
  animation: expandText 2s steps(15) forwards;
}

.step-2 {
  display: none; /* Initially hidden */
  animation: expandText 2s steps(25) forwards;
}

@keyframes expandText {
  0% {
    opacity: 0;
    width: 0;
  }
  100% {
    opacity: 1;
    width: auto;
  }
}
```

- **`expandText` 动画**:
  - `0%`：初始状态，文本不可见 (`opacity: 0`) 且宽度为零 (`width: 0`)。
  - `100%`：动画结束时，文本完全可见 (`opacity: 1`) 并且宽度自适应内容 (`width: auto`)。

**`.step-1` 动画**:
- `animation: expandText 2s steps(15) forwards;`：在 2 秒内，逐步显示 `step-1` 文本。

**`.step-2` 动画**:
- `display: none;`：初始时隐藏。
- 当 `step-1` 动画结束后，通过 JavaScript 显示 `step-2` 并应用动画。

#### **2.2. 打字机效果**

```css
.typing-text {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  animation: typing 4s steps(40, end), blink 0.75s step-end infinite;
  border-right: 3px solid black;
  vertical-align: middle;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink {
  from, to { border-color: transparent; }
  50% { border-color: black; }
}
```

- **打字机动画 (`typing`)**:
  - `width` 从 `0` 到 `100%`，模拟打字机效果，使文本逐字显示。

- **光标闪烁动画 (`blink`)**:
  - 模拟打字机的光标闪烁效果，通过改变边框颜色实现。

### 3. **JavaScript 控制**

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const step1 = document.querySelector('.step-1');
  const step2 = document.querySelector('.step-2');

  step1.addEventListener('animationend', () => {
    step2.style.display = 'inline';
    step1.style.display = 'none'; // 隐藏第一个文本
  });
});
```

- **`DOMContentLoaded` 事件**：确保在 DOM 加载完成后执行脚本。
- **监听 `step-1` 的 `animationend` 事件**：当 `step-1` 动画结束时，隐藏 `step-1`，显示 `step-2`。
- **`step-1`**：首先显示的文本，使用 `expandText` 动画逐步显示。
- **`step-2`**：在 `step-1` 动画结束后，通过 JavaScript 显示，并使用 `typing` 动画展示打字机效果。


# <ChooseReason/>
#### **文本动画**
```html
<p
  class="text-[18px] md:text-[44px] leading-[76px] text-error font-medium mt-6 tracking-normal text-center"
  data-aos="fade-up"
  data-aos-duration="1200"
  data-aos-delay="100"
>
  {t("home.website.edge.title")}
</p>
```
- **`data-aos="fade-up"`**: 这个属性定义了动画类型为“fade-up”，即元素会从透明逐渐变得不透明，并从下向上滑入视图。
- **`data-aos-duration="1200"`**: 该属性定义了动画的持续时间为 1200 毫秒（1.2 秒）。
- **`data-aos-delay="100"`**: 该属性设置动画在元素进入视口后延迟 100 毫秒开始。

#### **按钮动画**
```html
<Button
  size="large"
  type="normal"
  class="advantage-btn rounded-3xl text-neutral"
  href="/advantage/"
  iconClass="text-neutral"
  data-aos="zoom-in"
  data-aos-duration="1500"
  data-aos-delay="300"
>
  查看Higress和其他主流网关的比对
</Button>
```
- **`data-aos="zoom-in"`**: 这个属性定义了动画类型为“zoom-in”，即元素会从较小的尺寸逐渐放大到正常尺寸，同时逐渐变得不透明。
- **`data-aos-duration="1500"`**: 持续时间为 1500 毫秒（1.5 秒）。
- **`data-aos-delay="300"`**: 动画会延迟 300 毫秒后开始。

#### **卡片动画**
```html
<div
  class="item px-5 border-success/50 border-l"
  data-aos="fade-up"
  data-aos-duration="1500"
  data-aos-delay={100 + index * 200}
>
```
- **`data-aos="fade-up"`**: 同样使用了“fade-up”动画，使得卡片从透明逐渐变得不透明，并从下向上滑入视图。
- **`data-aos-duration="1500"`**: 持续时间为 1500 毫秒。
- **`data-aos-delay={100 + index * 200}`**: 这里根据 `index` 动态计算延迟时间，使得每个卡片元素的动画依次出现。比如，第一个卡片延迟 100 毫秒，第二个延迟 300 毫秒，以此类推。


# <AiStructure />

#### **容器动画**
```html
<div
  class="structure-container flex flex-col justify-center items-center"
  data-aos="fade-up"
  data-aos-duration="1200"
  data-aos-delay="100"
>
```
- **`data-aos="fade-up"`**: 定义了动画类型为“fade-up”，即元素会从透明逐渐变得不透明，并从下向上滑入视图。
- **`data-aos-duration="1200"`**: 该属性设置动画的持续时间为 1200 毫秒（1.2 秒）。
- **`data-aos-delay="100"`**: 动画在元素进入视口后会延迟 100 毫秒才开始。

#### **标题动画**
```html
<Headline
  classes={{ subtitle: "text-sm" }}
  title={t("home.ai.structure.title")}
  subtitle={t("home.ai.structure.subtitle")}
  titleTheme="error"
  taglineTheme="info"
  subtitleTheme="success"
  data-aos="fade-up"
  data-aos-duration="1200"
  data-aos-delay="300"
/>
```
- **`data-aos="fade-up"`**: 同样使用了“fade-up”动画，标题会从透明逐渐变得不透明，并从下向上滑入视图。
- **`data-aos-duration="1200"`**: 持续时间为 1200 毫秒。
- **`data-aos-delay="300"`**: 动画延迟 300 毫秒后才开始。

#### **图片动画**
```html
<img
  class="w-[80%]"
  alt={t("home.website.edge.title")}
  src="https://img.alicdn.com/imgextra/i2/O1CN01a3TQwu1hUI8C4HYDb_!!6000000004280-2-tps-2669-1462.png"
  decoding="async"
  loading="lazy"
  data-aos="zoom-in"
  data-aos-duration="1500"
  data-aos-delay="500"
/>
```
- **`data-aos="zoom-in"`**: 这个属性定义了动画类型为“zoom-in”，即图片会从较小的尺寸逐渐放大到正常尺寸，同时从透明变得不透明。
- **`data-aos-duration="1500"`**: 动画的持续时间为 1500 毫秒（1.5 秒）。
- **`data-aos-delay="500"`**: 动画在元素进入视口后延迟 500 毫秒开始。

###  **AOS 的工作原理**
- 当用户滚动页面并且这些带有 `data-aos` 属性的元素进入视口时，`AOS` 库会自动触发相应的动画效果。
- 动画的类型、持续时间和延迟时间可以通过这些 `data-aos-*` 属性进行配置，从而实现丰富的视觉效果。

# <SecurityCapability />

### 1. **为元素添加 AOS 属性**
在这段代码中，许多元素都通过 `data-aos` 属性定义了不同的动画效果：

#### **整体容器动画**
```html
<div
  class="higress-security-wrapper flex items-center justify-around"
  data-aos="fade-up"
  data-aos-duration="1500"
>
```
- **`data-aos="fade-up"`**: 元素从下往上渐入视图，同时从透明到不透明。
- **`data-aos-duration="1500"`**: 动画的持续时间为 1500 毫秒（1.5 秒）。

#### **左侧图片容器**
```html
<div
  class="left-security-warp"
  data-aos="fade-right"
  data-aos-duration="1500"
  data-aos-delay="200"
>
  <img
    src="https://img.alicdn.com/imgextra/i4/O1CN01bZuGIN1TS5bevTift_!!6000000002380-2-tps-1046-860.png"
    alt={t("home.security.capability.title")}
    decoding="async"
    loading="lazy"
    data-aos="fade-in"
    data-aos-duration="1500"
  />
</div>
```
- **`data-aos="fade-right"`**: 容器从右侧滑入视图，并从透明变得不透明。
- **`data-aos-duration="1500"`**: 动画持续 1500 毫秒。
- **`data-aos-delay="200"`**: 动画会延迟 200 毫秒才开始。

#### **右侧文本和按钮**
```html
<div
  class="right-security-container h-full flex flex-col justify-center"
  data-aos="fade-left"
  data-aos-duration="1500"
  data-aos-delay="400"
>
  <div class="flex flex-col">
    <div
      class="security_capability_title text-base-100 text-center font-medium tracking-normal md:text-left"
      data-aos="fade-up"
      data-aos-duration="1200"
    >
      {t("home.security.capability.title")}
    </div>
    <div
      class="title max-w-[450px] text-success font-normal text-center text-sm my-8 md:my-12 md:text-left"
      data-aos="fade-up"
      data-aos-duration="1200"
      data-aos-delay="300"
    >
      {t("home.security.capability.subtitle")}
    </div>
  </div>
  <Button
    size="large"
    type="normal"
    class="security-btn rounded-3xl text-neutral"
    href="https://higress.io/zh-cn/docs/plugins/security/waf"
    iconClass="text-neutral"
    data-aos="zoom-in"
    data-aos-duration="1500"
    data-aos-delay="500"
  >
    {t("home.contributors.learn.more")}
  </Button>
</div>
```
- **`data-aos="fade-left"`**: 容器从左侧滑入视图，并从透明变得不透明。
- **`data-aos-duration="1500"`**: 动画持续 1500 毫秒。
- **`data-aos-delay="400"`**: 动画会延迟 400 毫秒才开始。

- **`data-aos="fade-up"`**（在标题和副标题中）: 元素从下往上滑入视图，同时从透明变得不透明。
- **`data-aos-duration="1200"`**: 持续时间为 1200 毫秒。

- **`data-aos="zoom-in"`**（在按钮中）: 按钮从缩小状态逐渐放大到正常尺寸。
- **`data-aos-duration="1500"`**: 持续时间为 1500 毫秒。
- **`data-aos-delay="500"`**: 延迟 500 毫秒才开始。

### 2. **响应式设计**
通过全局样式的 `media queries`，该组件针对不同的屏幕尺寸进行了优化：

- **`max-width: 50rem`**（小于 50rem，约 800px 以下）:
  - `.higress-security-wrapper`：采用列方向布局（`column-reverse`），内容垂直排列，并调整了 padding 和宽度。
  - `.security-btn`：按钮缩小。
  - `.security_capability_title`：字体大小缩小。

- **`min-width: 50rem and max-width: 86rem`**（800px 到 1152px 之间）:
  - `.higress-security-wrapper`：宽度调整为 100%。

### 3. **总结**
通过对 `AOS` 属性的合理使用，不同的元素在用户滚动页面时会以流畅的动画效果呈现，增强了用户体验。此外，响应式设计确保了在不同设备上有一致的视觉效果。

*剩下的如果有需要可以看pr代码*
