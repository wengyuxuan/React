import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import './style.css'


class VIP extends Component {
  constructor (props){
    super (props);
    this.state = {
        login: true,
        fetchLogin: false
    }
  }

  render () {
    if(this.state.login){
        if(this.state.fetchLogin){
            return (
                <div className="vip">
                    vip
                </div>
            );
        }else{
            return (
                <div className="vip">
                    ......
                </div>
            );
        }
    }else{
        return <Redirect to='/' />
    }
  }

  componentDidMount () {
    axios.get('http://www.dell-lee.com/react/api/isLogin.json', {
        withCredentials: true
    }).then((res)=>{
            const login = res.data.data.login;
            this.setState({
                login,
                fetchLogin: true
            })
        })
  }
}

export default VIP;
