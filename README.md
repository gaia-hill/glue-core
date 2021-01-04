
[![npm version](https://img.shields.io/npm/v/glue-core.svg?style=flat)](https://www.npmjs.com/package/glue-core)


## glue-core
基于webpack的前端构建工具



#### 安装

`npm i glue-core -g`



#### 使用

1、进入项目初始化目录

2、运行`glue init 项目名`查看参数配置

3、进入项目`cd 项目名`

4、安装依赖`npm install`

5、运行项目`npm start`



#### 命令

glue init 项目名     初始化项目

glue start          启动项目

glue build          构建项目

glue help           显示帮助信息

glue version        显示当前版本



#### 目录结构

```javascript
src/                     // 源文件目录，入口文件路径
bundle.config.js         // glue-core配置文件，详细见下文bundle配置
webpack.config.js        // 暴露webpack配置，可自行修改
package.json             // 项目package.json
```


#### bundle.config.js配置

```javascript

const path = require('path')
module.exports = function (appPath, env) {
    return {
        title: '项目标题',              //  页面标题
        vue: false,                   //  是否支持vue
        hash: true,                   //  构建时是否添加hash
        favicon: '',                  //  页面图标
        html: true,                   //  是否生成html文件
        template: undefined,          //  模板路径
        happypack: false,             //  是否启用happypack
        entry: {                      //  页面入口文件，默认{ index: path.join(appPath, 			'./src/index.js') }
            index: path.join(appPath, './src/index.js')
		},
        src: path.join(appPath, './src'),    //  项目源码目录
        dist: path.join(appPath, './dist'),  //  项目构建输出目录
        // tsConfigPath: path.join(appPath, './tsconfig.json'),    //  ts项目，ts配置文件路径，不填会自动使用默认配置
        babelConfig: {},                  //  babel配置，参考babel文档
        fix: false,                       //  是否自动修复eslint问题
		lint: false,                      //  是否开启eslint，true或者{...eslintOptions}，具体配置可参考eslint官网 -> Node.js API -> new ESLint(options)
        devServer: {                      //  dev-server文档，参考webpack文档中的配置
            port: 9999
        }
    }
}

```

#### webpack.config.js配置

```javascript

module.exports = function (webpackConfig, appPath, env) {
    // 可在webpackConfig中添加自定义配置
    return webpackConfig
}

```
