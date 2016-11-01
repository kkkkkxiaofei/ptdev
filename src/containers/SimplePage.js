import React from 'react'
import 'isomorphic-fetch'
import { browserHistory, Link } from 'react-router'
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { asynCall } from '../middleware/api'
import {green100} from 'material-ui/styles/colors'

const style = {
  height: 150,
  width: 150,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: green100
};

const externalResources = {
  tech: [
    {
      title: "Javascript中apply()的用法",
      url: "http://flypursue.com/jekyll/update/2015/05/12/js-call-apply.html"
    },
    {
      title: "理解Javascript中的__proto__",
      url: "http://flypursue.com/jekyll/update/2015/05/14/js-proto.html"
    },
    {
      title: "毛p之Session《买菜大妈都能听得懂的技术》",
      url: "http://flypursue.com/jekyll/update/2015/05/30/mao-chao-session.html"
    },
    {
      title: "Javascript中几种较为流行的继承方式",
      url: "http://flypursue.com/jekyll/update/2015/06/04/inherit.html"
    },
    {
      title: "理解CSS中的BFC(块级可视化上下文)",
      url: "http://flypursue.com/jekyll/update/2015/08/10/bfc.html"
    },
    {
      title: "你必须记住的30个CSS选择器",
      url: "http://flypursue.com/jekyll/update/2015/08/23/css-selector.html"
    },
    {
      title: "打造属于自己的MVVM框架: 1.什么是MVVM",
      url: "http://flypursue.com/jekyll/update/2015/12/14/mvvm(1).html"
    },
    {
      title: "打造属于自己的MVVM框架: 2.模版渲染引擎",
      url: "http://flypursue.com/jekyll/update/2015/12/20/mvvm(2).html"
    },
    {
      title: "打造属于自己的MVVM框架: 3.双向绑定",
      url: "http://flypursue.com/jekyll/update/2015/12/21/mvvm(3).html"
    },
    {
      title: "Knocout的总结(Session)",
      url: "http://flypursue.com/jekyll/update/2016/01/07/hello-knockout.html"
    },
    {
      title: "RSpec的介绍（Session）",
      url: "http://flypursue.com/jekyll/update/2016/05/18/rspec.html"
    },
    {
      title: "Remote在家pull不到代码肿么办？",
      url: "http://flypursue.com/jekyll/update/2016/08/16/remote-work.html"
    },
    {
      title: "Element和Node的区别",
      url: "http://flypursue.com/jekyll/update/2016/09/21/node-vs-element.html"
    },
    {
      title: "开发C1 Dashboard时遇到的跨域问题",
      url: "http://flypursue.com/jekyll/update/2016/10/25/cors.html"
    }
  ]

}

export default class SimplePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {mds: []}
  }

  componentWillMount() {
    asynCall('/md.json', null, (json) => {
      let mdStructure = Object.assign({}, json)
      let type = this.props.params.type
      this.setState({mds: mdStructure[type]})
    })
  }

  render() {
    let mds = this.state.mds || []
    let type = this.props.params.type
    mds = mds.concat(externalResources[type] || [])
    return (
      <MuiThemeProvider>
        <div className="simplePage">
          <div>
            {
              mds.map(
                md => (
                  <Paper style={style} zDepth={3}>
                    <div className="sticker">
                      <a target="blank" href={md.url || '/' + md.src}>{md.title.replace('.md', '')}</a>
                    </div>
                  </Paper>
                )
              )
            }
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

}

  