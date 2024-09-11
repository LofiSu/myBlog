>使用AOS库（Animate On Scroll）
### 安装 AOS 库

首先，你需要安装 AOS 库：
```
npm install aos --save
```

### 导入并初始化 AOS

在你的主文件（例如 `App.js` 或 `index.js`）中导入并初始化 AOS：

```javascript
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
```

- **设置 AOS 参数**：
    
    - `offset: 100`：表示动画开始的位置，距离元素顶部 100 像素时触发动画。
    - `duration: 700`：表示动画的持续时间为 700 毫秒。
    - `easing: "ease-out-quad"`：表示动画的缓动效果。
    - `once: !0`：表示动画只会触发一次，滚动回到顶部不会再次触发。
- **事件监听**：
    
    - 使用 `window.addEventListener('load', AOS.refresh);` 确保在页面加载完成后刷新 AOS 动画。


## Fury-site
### 初始化 AOS

在 `useEffect` 钩子中初始化 AOS。这确保 AOS 在组件挂载时初始化：
```javascript
useEffect(() => {
  AOS.init({
    offset: 100, 
    duration: 700,
    easing: "ease-out-quad", 
    once: true
 }); 
 window.addEventListener('load', AOS.refresh); 
 }, []);
```

### 为元素添加 `data-aos` 属性

使用 `data-aos` 属性为需要动画效果的元素添加动画效果。在上面的示例中，我为 `header` 元素和 `Link` 元素添加了 `data-aos` 属性。

你可以根据需要添加更多动画效果和不同的延迟。例如：
```html
<header className={clsx("hero hero--primary", styles.heroBanner)} data-aos="fade-up">
  ...
</header>
<Link
  className="button button--secondary button--lg"
  to="https://github.com/apache/fury"
  data-aos="fade-up" data-aos-delay="200"
>
  ...
</Link>
<Link
  className="button button--secondary button--lg"
  to="/docs/start/install"
  data-aos="fade-up" data-aos-delay="400"
>
  ...
</Link>
<div data-aos="fade-up" data-aos-delay="600">
  <HomepageFeatures />
</div>

```

### 完整代码
```javascript
import React, { useEffect } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import styles from "./index.module.css";
import Translate, { translate } from "@docusaurus/Translate";
import AOS from 'aos';
import 'aos/dist/aos.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-out-quad",
      once: true
    });
    window.addEventListener('load', AOS.refresh);
  }, []);

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)} data-aos="fade-up">
      <div className="container">
        <Heading as="h1" className="hero__title">
          <Translate id="homepage.hero.title">{siteConfig.title}</Translate>
        </Heading>
        <p className="hero__subtitle">
          <Translate id="homepage.hero.subtitle">
            {siteConfig.tagline}
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="https://github.com/apache/fury"
            data-aos="fade-up" data-aos-delay="200"
          >
            <Translate
              id="homepage.githubButton"
              description="The GitHub button label on the homepage"
            >
              GitHub
            </Translate>
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/start/install"
            data-aos="fade-up" data-aos-delay="400"
          >
            <Translate
              id="homepage.getStartedButton"
              description="The Get Started button label on the homepage"
            >
              Get Started
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-out-quad",
      once: true
    });
    window.addEventListener('load', AOS.refresh);
  }, []);

  return (
    <>
      <Layout
        title={`${siteConfig.title}`}
        description={translate({
          id: "homepage.metaDescription",
          message: siteConfig.tagline,
          description: "The meta description of the homepage",
        })}
      >
        <HomepageHeader />
        <main>
          <div data-aos="fade-up" data-aos-delay="600">
            <HomepageFeatures />
          </div>
        </main>
      </Layout>
    </>
  );
}
```

如果你想使用其他动画效果，可以参考 AOS 官方文档 了解更多可用的动画效果和配置选项。
https://michalsnik.github.io/aos/