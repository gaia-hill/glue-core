
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
bundle/
		bundle.js         // glue-core配置文件，详细见下文bundle配置
		webpack.dev.js    // 暴露开发环境webpack配置，可自行修改配置
		webpack.prod.js   // 暴露线上环境webpack配置，可自行修改配置
src/                  // 源文件目录，入口文件路径
package.json  项目package.json
```


#### bundle.js配置

```javascript

const path = require('path')
module.exports = function (appPath, env) {
    return {
        title: '项目标题',              //  页面标题
        vue: false,                   //  是否支持vue
        hash: true,                   //  构建时是否添加hash
        favicon: '',                  //  页面图标
        htmlFile: true,               //  是否生成html文件
        template: undefined,          //  模板路径
        happypack: false,             //  是否启用happypack
        entry: {                      //  页面入口文件，默认{ index: path.join(appPath, 			'./src/index.js') }
            index: path.join(appPath, './src/index.js')
		},
        src: path.join(appPath, './src'),    //  项目源码目录
        dist: path.join(appPath, './dist'),  //  项目构建输出目录
        // tsConfigPath: path.join(appPath, './tsconfig.json'),    //  ts项目，ts配置文件路径，不填会自动使用默认配置
        babelConfig: {},                  //  babel配置，参考babel文档
        devServer: {                      //  dev-server文档，参考webpack文档中的配置
            port: 9999
        }
    }
}

```
