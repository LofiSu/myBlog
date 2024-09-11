如果你希望默认语言为英文并支持中文，你可以将 `defaultLocale` 设置为 `'en'`，并在 `locales` 数组中添加 `'zh-Hans'`。以下是更新后的配置：

```javascript
import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Apache Fury (incubating)',
  tagline: 'A blazing-fast cross-language serialization framework powered by just-in-time compilation and zero-copy',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://fury.apache.org/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
      'zh-Hans': {
        htmlLang: 'zh-CN',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All our posts',
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [require.resolve('docusaurus-lunr-search')],
  themeConfig: {
    metadata: [
      {'http-equiv': 'Content-Security-Policy', content: "frame-src 'self' https://ghbtns.com"},
    ],
    navbar: {
      title: '',
      logo: {
        alt: 'Fury Logo',
        src: 'img/navbar-logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'startSidebar',
          position: 'right',
          label: 'Start',
        },
        {
          type: 'docSidebar',
          sidebarId: 'introductionSidebar',
          position: 'right',
          label: 'Introduction',
        },
        {
          type: 'docSidebar',
          sidebarId: 'guideSidebar',
          position: 'right',
          label: 'Guide',
        },
        {
          type: 'docSidebar',
          sidebarId: 'specificationSidebar',
          position: 'right',
          label: 'Specification',
        },
        {
          type: 'docSidebar',
          sidebarId: 'communitySidebar',
          position: 'right',
          label: 'Community',
        },
        {
          position: 'right',
          to: 'download',
          label: 'Download',
        },
        { to: '/blog', label: 'Blog', position: 'right' },
        {
          type: 'dropdown',
          label: 'ASF',
          position: 'right',
          items: [
            {
              label: 'Foundation',
              to: 'https://www.apache.org/'
            },
            {
              label: 'License',
              to: 'https://www.apache.org/licenses/'
            },
            {
              label: 'Events',
              to: 'https://www.apache.org/events/current-event.html'
            },
            {
              label: 'Privacy',
              to: 'https://privacy.apache.org/policies/privacy-policy-public.html'
            },
            {
              label: 'Security',
              to: 'https://www.apache.org/security/'
            },
            {
              label: 'Sponsorship',
              to: 'https://www.apache.org/foundation/sponsorship.html'
            },
            {
              label: 'Thanks',
              to: 'https://www.apache.org/foundation/thanks.html'
            },
            {
              label: 'Code of Conduct',
              to: 'https://www.apache.org/foundation/policies/conduct.html'
            }
          ],
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
  },
};
export default config;
```

### 2. 创建翻译文件夹结构

在你的项目根目录下创建以下文件夹结构以存放翻译文件：

```bash
mkdir -p i18n/zh-Hans/docusaurus-plugin-content-docs/current
mkdir -p i18n/zh-Hans/docusaurus-plugin-content-blog
mkdir -p i18n/zh-Hans/docusaurus-theme-classic
```

### 3. 添加翻译内容

在每个相应的文件夹中创建 JSON 文件并添加翻译内容。例如，在 `i18n/zh-Hans/docusaurus-plugin-content-docs/current` 文件夹中，你可以创建 `start.md` 的翻译文件 `start.md`：

```markdown
---
id: start
title: 开始
---

这是开始页面的翻译版本。
```

在 `i18n/zh-Hans/docusaurus-theme-classic` 文件夹中创建 `navbar.json` 文件：

```json
{
  "items": [
    {
      "label": "开始",
      "position": "right"
    },
    {
      "label": "介绍",
      "position": "right"
    },
    {
      "label": "指南",
      "position": "right"
    },
    {
      "label": "规格",
      "position": "right"
    },
    {
      "label": "社区",
      "position": "right"
    },
    {
      "label": "下载",
      "position": "right"
    },
    {
      "label": "博客",
      "position": "right"
    },
    {
      "label": "ASF",
      "position": "right",
      "items": [
        {
          "label": "基金会",
          "to": "https://www.apache.org/"
        },
        {
          "label": "许可证",
          "to": "https://www.apache.org/licenses/"
        },
        {
          "label": "活动",
          "to": "https://www.apache.org/events/current-event.html"
        },
        {
          "label": "隐私",
          "to": "https://privacy.apache.org/policies/privacy-policy-public.html"
        },
        {
          "label": "安全",
          "to": "https://www.apache.org/security/"
        },
        {
          "label": "赞助",
          "to": "https://www.apache.org/foundation/sponsorship.html"
        },
        {
          "label": "感谢",
          "to": "https://www.apache.org/foundation/thanks.html"
        },
        {
          "label": "行为准则",
          "to": "https://www.apache.org/foundation/policies/conduct.html"
        }
      ]
    }
  ]
}
```

通过这些步骤，你应该可以在 Docusaurus 网站上启用中文和英文的国际化支持。

这段命令使用 `mkdir -p` 来创建目录结构。以下是详细解释：

1. **`mkdir` 命令**：
    
    - `mkdir` 是 Unix/Linux 命令，用于创建新目录（文件夹）。
2. **`-p` 选项**：
    
    - `-p` 选项告诉 `mkdir` 命令在创建目录时，如果中间的某些目录不存在，也会自动创建它们。例如，如果你运行 `mkdir -p a/b/c`，并且 `a` 目录和 `b` 目录不存在，那么 `mkdir -p` 会首先创建 `a`，然后创建 `a/b`，最后创建 `a/b/c`。
3. **创建多级目录结构**：
    
    - `mkdir -p i18n/zh-Hans/docusaurus-plugin-content-docs/current`
        
        - 这个命令会创建以下目录结构：
            
            css
            
            Copy code
            
            `i18n/ └── zh-Hans/     └── docusaurus-plugin-content-docs/         └── current/`
            
        - 如果 `i18n` 目录和其中的任何子目录不存在，`mkdir -p` 会自动创建它们。
    - `mkdir -p i18n/zh-Hans/docusaurus-plugin-content-blog`
        
        - 这个命令会创建以下目录结构：
            
            css
            
            Copy code
            
            `i18n/ └── zh-Hans/     └── docusaurus-plugin-content-blog/`
            
        - 如果 `i18n` 和 `zh-Hans` 目录不存在，`mkdir -p` 会自动创建它们。
    - `mkdir -p i18n/zh-Hans/docusaurus-theme-classic`
        
        - 这个命令会创建以下目录结构：
            
            markdown
            
            Copy code
            
            `i18n/ └── zh-Hans/     └── docusaurus-theme-classic/`
            
        - 如果 `i18n` 和 `zh-Hans` 目录不存在，`mkdir -p` 会自动创建它们。

这些命令的目的是在你的 Docusaurus 项目中为不同的内容（如文档、博客和主题）创建本地化目录结构，便于你添加翻译文件。

4o