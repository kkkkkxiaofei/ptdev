# PT助手

`PT(Pivotal Tracker)`是一个非常优秀的敏捷管理工具，而PT助手是基于PT的一个助手工具，它能够帮助敏捷团队更好的进行`IPM(Iteration Plan Meeting)`。 它包含了许多功能点，如`Stroy Analysis`, `Stroy Transition`和`Story Category`等。

[在线版请戳这里](https://kkkkkxiaofei.github.io/ptpro/)

# Pivotal Tracker API

[API Document](https://www.pivotaltracker.com/help/api)

在这里，你可以查询PT提供的API。

# 安装

```
1.git clone git@github.com:kkkkkxiaofei/ptdev.git & cd ptdev
```

```
2.npm install
```

```
3.npm run dev
```

```
4.go to http://127.0.0.1:8080/webpack-dev-server/
```

# 测试

```
npm run test
```

# 使用

在主界面中，输入自己的`project id`和`API Token`和一个`global label`点击确认，即可初始化基本信息，API将会默认请求200个带有`global label`的Story作为候选分析集合。

## 如何获取project id

进入自己的PT，url中即可找到对应的project id，如：

```
https://www.pivotaltracker.com/n/projects/${project id}/stories/${story id}
```

## 如何获取API Token

进入自己PT的profie，页面的最下方，即可看到自己的API Token

>**⚠注意：Token信息等同于自己的账号密码，请妥善保管，请勿上传**

# 技术栈

这个工具是用`React`+`Redux`进行开发，利用`Webpack`进行打包，使用`Babel`编译`ES6`，最终利用`Github Page`发布在线版本，因此发布版是一个没有路由的纯前端的单页面App。

推荐以下参考资料：

>1.[React](https://facebook.github.io/react/)
>MVVM已成往事，Web Component大行其道的当下，你不得不去看的React。

>2.[Redux](http://redux.js.org)
>为React量身打造，在原版Flux的基础上进行的重构。

>3.[ES6](http://es6.ruanyifeng.com/)
>ES6已经有段时间了，还没尝试过的小伙伴们快看看阮老师的博客吧（此人博客我跪服）。

>4.[Babel](http://babeljs.io/repl/)
>没有它，那还怎么愉快的和ES6玩耍。

>5.[Webpack](http://webpack.github.io/)
>新一代前端打包部署神器，请忘掉Browserify吧。

>6.[Promise](https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise)
>ES6原生支持Promise，有了它，地狱回调算神马，Ajax更没听过。

>7.[material-ui](http://www.material-ui.com/#/)
根据Material UI的设计风格，全力打造的一套适用于React App的UI Components。

# 贡献

欢迎大家一起开发，请提交`Pull Request`，有问题请建Issue

# License

C1-TW


