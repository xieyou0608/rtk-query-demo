# rtk-query-demo

## Setup

To get started, install `prettier-plugin-tailwindcss` as a dev-dependency:

```sh
yarn create react-app
yarn add -D tailwindcss
yarn add -D prettier@^2.5.1 eslint@^8.7.0
yarn add -D prettier-plugin-tailwindcss@^0.2.7
yarn add @reduxjs/toolkit react-redux
yarn add axios
yarn add react-router-dom
# 排版的三個工具需要固定版本才能搭配 vscode 的 prettier-eslint
```

- 照 [Tailwind CRA 教學](https://tailwindcss.com/docs/guides/create-react-app)設定 config
- 照 prettier-eslint extension 教學設定 setting.json
- 照 [Tailwind plugin 教學](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)設定 config
- 照 [Redux Tookit 官網](https://redux-toolkit.js.org/introduction/getting-started)設定 config
- 移除 package.json 裡的 eslintConfig extends 內容
- 加入 jsconfig.json 提供 import shortcut
