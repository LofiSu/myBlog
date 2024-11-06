---
updateTime: "2024-11-6 10:30"
desc: "monorepo小试牛刀"
tags: "monorepo"
outline: deep
---

# monorepo小试牛刀

monorepo（大仓模式）是多个项目都在同一个仓库，且每个项目共享同一套构建工具

polyrepo（多仓模式）是一个项目一个仓库，且每个项目都有独立的构建工具

![monorepo vs polyrepo](https://monorepo.tools/images/monorepo-polyrepo.svg)

![monorepo](./img/monorepo.png)
![polyrepo](./img/poly.png)


## 为什么需要monorepo？

使用 monorepo 方式组织代码的前提是：

> 你有多个项目，并且需要在多个项目中复用组件和逻辑。

如果每个项目都是完全独立的，没有什么共用的代码（几乎不太可能），那也许你就不需要用 monorepo 啦。

## 好处

- 便于代码复用：多个仓库都会用到的组件、工具函数、类型声明、样式等，可以放到 common 子包中，需要的仓库直接 npm install 这个子包就行，就跟 npm install 一个 npm 包一样容易。
- 独立构建和部署：每个子包都是一个独立的项目，有自己的 package.json 文件，独立安装依赖、独立端口和本地启动、独立测试、独立构建和部署，互不影响。
- 降低切换成本：由于只有单一仓库，clone 代码、切换分支、安装依赖比较方便，不用在不同文件夹之间切换。
- 节约磁盘空间：pnpm 天然具备 monorepo 能力，支持全局依赖管理，所有子包之间共享依赖，节约磁盘空间。
- 方便提交PR：由于是单仓库，增加新组件或给组件增加新特性，只需要提交一个 MR、编写一次 MR 描述、关联一次需求/缺陷单。
- 方便代码检视：一个完整的特性只需要统一在一个 MR 中检视，不用在多个仓库/多个 MR 之间切换。
- 灵活便于扩展：后续增加新的工程只需要在 packages 下增加一个子包，不需要申请新的代码仓库，也降低后续仓库维护成本，比如：配置保护分支 / GitHub Actions / 仓库标签等。

## 如果不用monorepo会怎么样？

- 方式一：把所有项目放到一个仓库里，创建很多文件夹，分别存放不同的项目，通过路由进行项目隔离。

这样做的好处是所有代码都在一起，代码复用方便，直接 ../ 就行；而且不用创建和维护仓库，不用配置一堆流水线。
坏处也显而易见，就是项目会不断膨胀，本地启动调试会越来越慢、构建打包越来越慢，包体积越来越大，项目越来越卡，最后用户受不了纷纷弃坑。

- 方式二：将项目拆分到不同的代码仓库进行维护。

好处是项目之间相互独立，不容易耦合，维护起来方便。
坏处就是增加了仓库维护成本、流水线创建成本，并且不方便项目之间复用代码。
不管是以上哪种方式，后续项目的演进都是麻烦不断，要么代码量膨胀、性能下降，要么重复劳动、一堆重复代码。

## 怎么搭建一个monorepo项目？

### 1. 选择管理工具

有很多工具可以帮助你管理 **Monorepo**，常见的工具包括：

- **Lerna**：用于管理 JavaScript 和 TypeScript 项目的 monorepo。
- **Yarn Workspaces**：Yarn 提供的功能，可以帮助你在 monorepo 中管理多个包。
- **PNPM Workspaces**：PNPM 是一个高效的包管理工具，支持 monorepo。
- **Nx**：提供许多企业级的 monorepo 功能，包括智能构建、依赖关系分析等。

以 **Yarn Workspaces** 为例进行说明。

### 2. 初始化项目

首先，初始化一个新的项目文件夹，并进入该文件夹：

```bash
mkdir my-monorepo
cd my-monorepo
```

### 3. 初始化 `package.json`

在项目根目录下运行以下命令创建一个 `package.json` 文件：

```bash
npm init -y
```

然后修改 `package.json`，添加 `workspaces` 配置：

```json
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": [
    "packages/*"
  ]
}
```

- `private: true` 表示这是一个私有项目，避免发布到 npm。
- `workspaces: ["packages/*"]` 告诉 Yarn 你的所有子包都位于 `packages` 文件夹下。

### 4. 创建子包

在 `packages` 文件夹下创建多个子包（例如 `app` 和 `lib`）：

```bash
mkdir -p packages/app
mkdir -p packages/lib
```

然后分别初始化每个子包的 `package.json` 文件：

#### app/package.json
```json
{
  "name": "app",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "lib": "*"
  }
}
```

#### lib/package.json
```json
{
  "name": "lib",
  "version": "1.0.0",
  "main": "index.js"
}
```

### 5. 安装依赖

接下来，使用 Yarn 安装所有依赖：

```bash
yarn install
```

Yarn 会根据 `workspaces` 配置自动安装 `app` 和 `lib` 之间的依赖，并将它们链接起来。

### 6. 配置工作流（可选）

你可以根据需要设置脚本来简化开发工作流，比如：

#### 在根 `package.json` 中添加 `scripts`：

```json
{
  "scripts": {
    "test": "lerna run test",
    "build": "lerna run build"
  }
}
```

### 7. 使用 Lerna（可选）

如果你想进一步管理版本、发布等，可以使用 **Lerna**。Lerna 是一个帮助你管理 monorepo 的工具，它提供了跨包管理、版本控制和发布等功能。

#### 安装 Lerna：

```bash
npm install --save-dev lerna
```

#### 初始化 Lerna：

```bash
npx lerna init
```

#### 配置 Lerna：

Lerna 会创建一个 `lerna.json` 文件，修改 `lerna.json` 以启用 **固定版本模式**，并指定包路径。

```json
{
  "packages": ["packages/*"],
  "version": "independent"
}
```

在使用 Lerna 时，可以通过以下命令执行一些任务：

- `lerna bootstrap`：安装所有依赖并连接跨包依赖。
- `lerna run <script>`：在所有包中运行指定的 `script`。
- `lerna publish`：发布所有包。

### 8. 启动开发

现在，你可以开始在 monorepo 中开发了。你可以在 `app` 和 `lib` 中进行开发，修改代码并在根目录下运行相关的命令来管理和构建项目。

使用 `pnpm` 搭建一个 Monorepo 项目是一个非常有效的方案，尤其是在你有多个子项目（例如多个包或应用）并希望共享依赖项时。`pnpm` 提供了比 `npm` 和 `yarn` 更高效的方式来管理依赖和工作区。在本节中，我将详细介绍如何使用 `pnpm` 搭建 Monorepo 项目，并解释它的优点。

> 以 `pnpm` 为例进行说明。
### 1. 什么是 Monorepo？

Monorepo（单一代码库）是一种将多个项目（通常是多个包、应用或服务）存储在同一个 Git 仓库中的方法。所有的代码和依赖项都集中在一个仓库中，便于协作和共享代码。常见的 Monorepo 项目结构有：

- **单一包库**（比如一个 npm 包）
- **多个包和应用**（例如前端和后端应用）

### 2. 使用 `pnpm` 搭建 Monorepo 的步骤

#### 步骤 1: 安装 `pnpm`
首先，你需要全局安装 `pnpm`，它将帮助你管理项目依赖。

```bash
npm install -g pnpm
```

#### 步骤 2: 初始化一个 Monorepo 项目
你可以创建一个新的文件夹并初始化一个新的 Monorepo 项目：

```bash
mkdir my-monorepo
cd my-monorepo
pnpm init
```

这将创建一个新的 `package.json` 文件。

#### 步骤 3: 配置工作区
在 `my-monorepo` 目录中创建一个 `pnpm-workspace.yaml` 文件，来配置 Monorepo 工作区：

```yaml
packages:
  - 'packages/*'
```

这个配置表示你的 `packages` 文件夹下的所有子文件夹（例如 `packages/a`, `packages/b`）都将作为工作区的一部分。

#### 步骤 4: 创建子包（子项目）
在 `packages` 文件夹下创建一个子项目，例如 `packages/app1` 和 `packages/app2`：

```bash
mkdir -p packages/app1
mkdir -p packages/app2
```

每个子项目都有自己的 `package.json` 文件。例如，在 `packages/app1/package.json` 中：

```json
{
  "name": "app1",
  "version": "1.0.0",
  "dependencies": {}
}
```

你可以按照这种方式为每个子项目添加必要的依赖项。

#### 步骤 5: 安装依赖
在根目录下运行以下命令来安装所有依赖：

```bash
pnpm install
```

这会安装所有工作区中的依赖，并且通过 `pnpm` 的工作区机制，它会共享相同版本的依赖，避免重复安装。

#### 步骤 6: 添加本地依赖
你可以让子项目之间共享依赖。例如，假设 `app2` 依赖 `app1`，你可以在 `app2/package.json` 中这样引用：

```json
{
  "name": "app2",
  "version": "1.0.0",
  "dependencies": {
    "app1": "1.0.0"
  }
}
```

然后，你可以在 `app1` 中添加一些公共模块，`app2` 就可以引用这些模块了。`pnpm` 会自动管理这些依赖关系。

#### 步骤 7: 使用 `pnpm` 运行工作区中的脚本
你可以在工作区中执行脚本。例如，如果你在子项目中有一个构建脚本，你可以使用以下命令从根目录运行它：

```bash
pnpm run build --filter app1
```

这会只运行 `app1` 的 `build` 脚本。

### 3. `pnpm` 的优点

- **高效的依赖管理**：`pnpm` 采用了硬链接（symlink）机制来避免重复的依赖项存储，使得依赖项的存储更加高效。即使多个包依赖相同版本的依赖，`pnpm` 也只会在磁盘上存储一份该依赖。
  
- **快速的安装速度**：由于 `pnpm` 在工作区中使用了缓存和共享依赖，它的安装速度比 `npm` 和 `yarn` 更快，尤其是在大型 Monorepo 项目中，依赖项的安装和更新速度有显著提升。

- **自动化依赖版本管理**：`pnpm` 能确保所有工作区中的包使用相同版本的依赖，从而避免了版本冲突的问题。它会在安装时自动创建并共享符号链接来实现这一点。

- **灵活的脚本执行**：`pnpm` 支持从根目录运行整个 Monorepo 中的脚本，或者过滤到特定的包，这使得你可以更灵活地管理 Monorepo 中的构建、测试、部署等任务。

- **跨项目共享**：多个子项目可以共享相同的依赖项，从而减少冗余的依赖安装，并提高磁盘利用率。

- **依赖分离**：`pnpm` 允许你在根项目和子项目之间分开安装依赖，避免了所有子项目都共享一个全局的 `node_modules` 目录。

- **兼容性**：`pnpm` 完全兼容 `npm` 和 `yarn`，你可以很方便地迁移现有的 `npm` 或 `yarn` 项目到 `pnpm`，并且无缝运行已有的 `npm` 脚本。

> 假设你要做一个项目，项目中有多个公共模块，分别为 `common`、`commonTypes` 和 `utils`，并且这些模块将被前端和后端共享，你可以按照以下步骤来组织 Monorepo 项目。

### 1. 项目结构

假设你有以下结构：

```
my-monorepo/
│
├── pnpm-workspace.yaml      # pnpm workspace 配置
├── package.json             # 根目录的 package.json
├── apps/
│   ├── workbench/           # 前端项目
│   └── server/              # 后端项目
├── packages/                # 公共模块
│   ├── common/              # 公共逻辑和工具
│   ├── commonTypes/         # 公共类型定义
│   └── utils/               # 公共工具函数
└── node_modules/            # 共享依赖项
```

### 2. 配置 `pnpm-workspace.yaml`

首先，根目录下的 `pnpm-workspace.yaml` 配置文件定义了所有的工作区。它指向了 `apps` 和 `packages` 文件夹中的所有子文件夹。

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### 3. 创建公共模块

1. **`common` 模块**：这个模块通常包含一些在前后端之间共享的核心逻辑。例如，验证、数据处理等。

   创建 `packages/common/package.json`：

   ```json
   {
     "name": "common",
     "version": "1.0.0",
     "main": "index.js",
     "dependencies": {}
   }
   ```

   然后在 `packages/common/index.js` 中放入一些共享代码。例如：

   ```js
   // packages/common/index.js
   module.exports = {
     greet: function(name) {
       return `Hello, ${name}!`;
     },
     // 其他公共功能
   };
   ```

2. **`commonTypes` 模块**：这个模块用于存放公共的 TypeScript 类型定义，确保前后端使用一致的类型。

   创建 `packages/commonTypes/package.json`：

   ```json
   {
     "name": "commonTypes",
     "version": "1.0.0",
     "main": "index.d.ts",
     "dependencies": {}
   }
   ```

   然后在 `packages/commonTypes/index.d.ts` 中定义公共的类型：

   ```ts
   // packages/commonTypes/index.d.ts
   export type User = {
     id: number;
     name: string;
   };
   
   export type Response<T> = {
     success: boolean;
     data: T;
     error?: string;
   };
   ```

3. **`utils` 模块**：这个模块可以包含常用的工具函数，例如格式化、日期处理等。

   创建 `packages/utils/package.json`：

   ```json
   {
     "name": "utils",
     "version": "1.0.0",
     "main": "index.js",
     "dependencies": {}
   }
   ```

   然后在 `packages/utils/index.js` 中放入一些通用工具函数：

   ```js
   // packages/utils/index.js
   module.exports = {
     formatDate: function(date) {
       const d = new Date(date);
       return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
     },
     // 其他实用函数
   };
   ```

### 4. 在项目中引用公共模块

1. **在前端项目中引用**：

   假设你在 `apps/workbench/package.json` 中使用了这三个公共模块。你可以像这样在 `apps/workbench/package.json` 中添加它们的依赖：

   ```json
   {
     "name": "workbench",
     "version": "1.0.0",
     "dependencies": {
       "common": "1.0.0",
       "commonTypes": "1.0.0",
       "utils": "1.0.0",
       "react": "^18.0.0",
       "react-dom": "^18.0.0"
     },
     "devDependencies": {
       "vite": "^4.0.0",
       "typescript": "^4.5.0"
     },
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "serve": "vite preview"
     }
   }
   ```

2. **在后端项目中引用**：

   同样，在后端项目 `apps/server/package.json` 中也可以添加对公共模块的依赖：

   ```json
   {
     "name": "server",
     "version": "1.0.0",
     "dependencies": {
       "common": "1.0.0",
       "commonTypes": "1.0.0",
       "utils": "1.0.0",
       "express": "^4.17.1"
     },
     "devDependencies": {
       "typescript": "^4.5.0",
       "@types/express": "^4.17.13"
     },
     "scripts": {
       "start": "ts-node src/index.ts",
       "dev": "nodemon src/index.ts"
     }
   }
   ```

### 5. 安装依赖

在根目录下运行以下命令，安装所有依赖：

```bash
pnpm install
```

`pnpm` 会自动管理依赖关系，并确保所有公共模块（`common`、`commonTypes` 和 `utils`）都正确链接到前端和后端项目中。

### 6. 使用共享模块

1. **在前端代码中使用共享模块**：

   例如，在 `apps/workbench` 中，你可以在代码中这样引用公共模块：

   ```js
   import { greet } from 'common';
   import { User } from 'commonTypes';
   import { formatDate } from 'utils';

   const user: User = { id: 1, name: 'Alice' };
   console.log(greet(user.name));

   const date = formatDate('2024-01-01');
   console.log(date);
   ```

2. **在后端代码中使用共享模块**：

   在 `apps/server` 中，你可以这样使用这些共享模块：

   ```ts
   import { greet } from 'common';
   import { User } from 'commonTypes';
   import { formatDate } from 'utils';

   const user: User = { id: 1, name: 'Bob' };
   console.log(greet(user.name));

   const date = formatDate('2024-01-01');
   console.log(date);
   ```

### 7. 运行项目

1. **启动前端**：

   进入 `apps/workbench`，运行开发服务器：

   ```bash
   cd apps/workbench
   pnpm run dev
   ```

2. **启动后端**：

   进入 `apps/server`，运行后端服务：

   ```bash
   cd apps/server
   pnpm run dev
   ```

### 8. 优点总结

1. **高效的共享代码管理**：通过 `pnpm` 的工作区机制，前端和后端都可以共享 `common`、`commonTypes` 和 `utils` 等公共模块，避免了重复开发和依赖管理的麻烦。

2. **类型一致性**：通过 `commonTypes` 模块，前端和后端能够共享相同的类型定义，确保接口和数据结构的一致性。

3. **简化依赖管理**：使用 `pnpm`，你可以高效地管理依赖，避免了不同模块间的版本冲突，并且通过缓存和符号链接提高了依赖安装的效率。

4. **集中式管理**：通过 `pnpm-workspace.yaml`，你可以将所有的子项目和公共模块集中管理，简化了项目的维护和开发流程。

5. **提升开发效率**：所有项目都可以通过单一的 `pnpm install` 命令来安装和更新依赖，避免了手动处理复杂的依赖关系。

## 项目搭建

在搭建一个 monorepo 项目时，主要需要考虑两个环境的问题：开发环境和构建环境。

### 开发环境需要考虑的问题：

- **IDE 支持**：如何让 IDE（如 VS Code）更好地辅助开发。可以通过配置工作区、使用插件等方式来提升开发体验。
- **工具配置共享**：如何在 monorepo 项目的根目录下配置开发工具，使得所有微应用都能从根目录共享这些配置。这可以通过在根目录设置统一的配置文件来实现。
- **提高开发效率**：通过优化开发流程、使用自动化工具等方式来提高开发效率。

### 构建环境需要考虑的问题：

- **增量检查**：如何只对变更的代码进行 lint 检查，以提高 lint 的速度。这可以通过使用工具（如 lint-staged）来实现，只对变更的文件进行检查。
Lint 检查是一种静态代码分析工具，用于在代码编写阶段检测潜在的错误、代码风格问题和不符合编码规范的地方。它可以帮助开发者在代码提交之前发现并修复问题，从而提高代码质量和一致性。

常见的 lint 工具包括：

- **ESLint**：用于 JavaScript 和 TypeScript 的 lint 工具。
- **Pylint**：用于 Python 的 lint 工具。
- **Stylelint**：用于 CSS 的 lint 工具。

使用 lint 工具的好处包括：

- **提高代码质量**：通过自动检测代码中的错误和不规范之处，减少 bug 的产生。
- **保持代码一致性**：通过统一的编码规范，确保团队成员的代码风格一致。
- **提高开发效率**：在开发阶段就能发现问题，减少后期调试和修复的时间。

在 monorepo 项目中，lint 工具可以配置为只对变更的代码进行检查，从而提高 lint 的速度和效率。

- **增量构建和发布**：如何只对变更的项目进行构建和发布，以提高发布速度。这可以通过使用 CI/CD 工具（如 GitHub Actions）结合缓存机制来实现，只对有变更的部分进行处理。

通过以上方法，可以有效地提升 monorepo 项目的开发和构建效率。
