import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import AppHeader from './components/Header/'
import Login from './components/Login/'
import List from './container/List/'
import Detail from './container/Detail/'
import VIP from './container/VIP/'
import 'antd/dist/antd.css';
import './style.css'

const { Header, Footer, Content } = Layout

class App extends Component {
  // constructor (props){
  //   super (props);
  // }

  render () {
    return (
      <BrowserRouter>
        <Layout style={{minWidth:1300, height: '100%'}}>
          <Header className="header">
            <AppHeader />
          </Header>
          <Content className="content">
            <Login />
            <Switch>
              <Route path="/vip/" component={VIP}/>
              <Route path="/detail/:id" component={Detail}/>
              <Route path="/:id?" component={List}/>
            </Switch>
          </Content>
          <Footer className="footer">@copyright Yuxuan Weng 2021</Footer>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
