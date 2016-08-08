# PT助手

`PT(Pivotal Tracker)`是一个非常优秀的敏捷管理工具，PT助手是一个能够帮助敏捷团队更好的进行`IPM(Iteration Plan Meeting)`的助手工具，它包含了许多功能点，如`Stroy Analysis`, `Stroy Transition`和`Story Categories`等。

![在线版请戳这里](https://kkkkkxiaofei.github.io/ptpro/)

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

# 使用

在主界面中，输入自己的`project id`和`API Token`点击确认，即可初始化基本信息，API将会默认请求200个Story作为候选分析集合。

## 如何获取project id

进入自己的PT，url中即可找到对应的project id，如：

```
https://www.pivotaltracker.com/n/projects/${project id}/stories/${story id}
```

## 如何获取API Token

进入自己PT的profie，页面的最下方，即可看到自己的API Token

>**⚠注意：Token信息等同于自己的账号密码，请妥善保管，请勿上传**


