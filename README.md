## boa-cli

### 开发环境

`node 10+`

### 命令使用

#### 安装

``` bash
yarn
```

or

``` bash
npm install
```

#### 运行

// 本地开发命令

``` bash
yarn start
```

// 打包上线命令

``` bash
yarn build
```

// dll

``` bash
yarn dll
```

**dll 分包暂时效果不明显（打包代码更大，编译效果提升不明显）**

dll 分包在 webpack4x 中有 dev 和 prod 之分，dev 引入 prod 的 dll 包跑不起来。**暂没必要使用**

### Feat

- [√] 项目公用npm模块dll化
- [√] redux完整示范
- [√] mockjs模拟后端返回接口
- [] 通用布局
- [] 登录，以及登录权限控制
- [√] axios配置
- [] 添加工具函数
