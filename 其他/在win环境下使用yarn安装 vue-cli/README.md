# 在win环境下使用yarn安装 vue-cli

# 1. 安装 yarn

[官方文档](https://classic.yarnpkg.com/zh-Hans/docs/install)

// 使用 npm 全局安装

```shell
npm install -g yarn
```



## 2. 安装 vue-cli

执行 `yarn global add @vue/cli` 全局安装 vue-cli，正常安装完成后，执行 `yarn global list` 会输出以下内容

```shell
yarn global v1.22.4
info "@vue/cli@4.4.6" has binaries:
   - vue
Done in 1.79s.
```

说明 vue-cli 已经全局安装到 yarn 的依赖里

但是此时使用 `vue --version` 会报错，找不到 `vue` 命令。

因为环境变量问题，没有找到 `vue` 命令的位置。



## 3.配置 vue-cli 的环境变量

### 3.1 查找 yarn 全局安装目录

执行 `yarn global dir` ，会显示下列内容：

```shell
C:\Users\c\AppData\Local\Yarn\Data\global
```

打开这个目录，再进入 node_modules/.bin 目录，可以看到 vue 执行文件

完整的目录为：`C:\Users\c\AppData\Local\Yarn\Data\global\node_modules\.bin`



### 3.2 配置 vue-cli 的环境变量

![系统](.\images\system-panel.JPG)



![高级系统设置](.\images\system-property)

![设置环境变量](.\images\path)





## 4. 配置完成后就可以使用 vue-cli 了

命令行输入 `vue --version` 可以线上 vue-cli 的版本

输入 `vue` 直接回车显示使用说明