import React, { Component, Fragment } from 'react'
import { Modal, Button, Input, message } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios';
import './style.css'


class Login extends Component {
  constructor (props){
    super (props);
    this.showModel = this.showModel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.logout = this.logout.bind(this);
    
    this.state = {
        login: false,
        isModalVisible: false,
        user: '',
        password: ''
    }
  }

  showModel () {
      this.setState({
          isModalVisible: true
      })
  }

  handleOk () {
    const { user, password } = this.state
    const url = `
        http://www.dell-lee.com/react/api/login.json?user=${user}&password=${password}`
    axios.get(url, {
        withCredentials: true
    }).then((res)=>{
            const login = res.data.data.login;
            this.setState({
                login,
                password: ''
            })
            if(login)
                message.success('登录成功')
            else
                message.error('登录失败')
        })
    this.setState({
        isModalVisible: false
    })
  }

  handleCancel () {
    this.setState({
        isModalVisible: false
    })
  }

  handleUserChange (e) {
    this.setState({
        user:e.target.value
    })
  }

  handlePasswordChange (e) {
    this.setState({
        password:e.target.value
    })
  }

  logout () {
    const url = `http://www.dell-lee.com/react/api/logout.json`
    axios.get(url, {
        withCredentials: true
    }).then((res)=>{
            const logout = res.data.data.logout;
            this.setState({
                login: false,
            })
            if(logout)
                message.success('退出成功')
            else
                message.error('退出失败')
        })
    this.props.history.push('/')
  }

  render () {
    const { login } = this.state
    return (
        <div className="login">
            {
                login ? 
                    <Button type="primary" onClick={this.logout}>退出</Button>:
                    <Fragment>
                        <Button
                            type="primary"
                            onClick={this.showModel} >登录</Button>
                        <Button style={{marginLeft:10}}>注册</Button>
                    </Fragment>
            }
            <Link to="/vip">
                <Button style={{marginLeft:10}} type="primary">VIP</Button>
            </Link>
            
            <Modal 
                title="登录" 
                visible={this.state.isModalVisible} 
                onOk={this.handleOk} 
                onCancel={this.handleCancel}
            >
                <Input placeholder="请输入用户名" value={this.state.user} style={{marginBottom:10}} onChange={this.handleUserChange}/>
                <Input placeholder="请输入密码" value={this.state.password} onChange={this.handlePasswordChange} type="password"/>
            </Modal>
        </div>
    );
  }

  componentDidMount () {
    axios.get('http://www.dell-lee.com/react/api/isLogin.json', {
        withCredentials: true
    }).then((res)=>{
            const login = res.data.data.login;
            this.setState({
                login
            })
        })
  }

}

export default withRouter(Login);
