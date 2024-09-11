>因为觉得官网的汉化做的很差很差，有中文的地方都是英文直译过来的，国际化教程看的很懵。摸索了半天搞出来决定写个简单易懂的教程。

==官网链接：https://docusaurus.io/zh-CN/docs/i18n/tutorial==

1.你需要在*docusaurus.config.ts*文件里面配置你想要的语言：
```typescript
   i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
    localeConfigs: {
      'zh-Hans': {
        htmlLang: 'zh-Hans',
      },
    },
  },
  
//这是官网的示例：
export default {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'fa'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
      // 如果不需要重写默认值，可以忽略 locale (例如 fr)
      fa: {
        direction: 'rtl',
      },
    },
  },
};
```
语言名称会被用于翻译文件的位置以及你的本地化网站的 base URL。 构建所有语言时，只有默认语言才会在 base URL 中省略它的名字。

Docusaurus 使用语言环境名称来提供**合理的默认值**：`<html lang="...">`属性、语言环境标签、日历格式等。您可以使用 自定义这些默认值`localeConfigs`。

2.添加类型的**导航栏项**`localeDropdown`，以便用户可以选择他们想要的语言环境：
```docusaurus.config.js
 export default {
        {
          type: 'localeDropdown',
          position: 'right',
        },
  }
```


3.运行指令
```指令
npm run start -- --locale zh-Hans
```
这一步已经可以浏览你要国际化的那个语言页面了，您的网站可以通过访问[`http://localhost:3000/zh-Hans/`]但是这时候还没有进行翻译配置。

**注意：每个地区都是一个独立的单页应用程序：不可能同时在所有地区启动 Docusaurus 站点。意思就是你点切换语言会出现Page No Found这是正常的**

4.翻译*docusaurus.config.js*中的文件
执行指令（我这里是中文）
```
npm run write-translations -- --locale zh-Hans
```
会自动集成一个i18n的文件夹，里面是你的中文翻译配置。此时如果你在*docusaurus.config.js*中写了`navbar`和`footer`的话就会被集成到*docusaurus-theme-classic.json*里面去，然后你就可以去*docusaurus-theme-classic.json*找到你想改的内容找翻译软件将它翻译成你想要的语言。

5.翻译React中的内容
```jsx
import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate"; //引入Translate Api

export default function Home() {
  return (
    <Layout>
      <h1>
        <Translate>Welcome to my website</Translate>//把需要翻译的地方都用Translate组件包裹
      </h1>
      <main>
        <Translate
          id="homepage.visitMyBlog"
          description="The homepage message to ask the user to visit my blog"
          values={{
            blogLink: (
              <Link to="https://docusaurus.io/blog">
                <Translate
                  id="homepage.visitMyBlog.linkLabel"
                  description="The label for the link to my blog"
                >
                  blog
                </Translate>
              </Link>
            ),
          }}
        >
          {"You can also visit my {blogLink}"}
        </Translate>
        <img
          src="/img/home.png"
          alt={translate({
            message: "Home icon",
            description: "The homepage icon alt message",
          })}
        />
      </main>
    </Layout>
  );
}
```
然后再执行指令（我这里是中文）
```
npm run write-translations -- --locale zh-Hans
```
这时候你的react文件里面被Translate组件包裹的部分就会被集成到*i18n*的*code.json*里面去。找到你想改的内容找翻译软件将它翻译成你想要的语言就完成了。