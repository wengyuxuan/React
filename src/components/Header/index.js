import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import logo from './logo.png'
import { Menu } from 'antd';
import { UsergroupDeleteOutlined, IdcardOutlined, DingdingOutlined, GoogleOutlined, WechatOutlined, DribbbleOutlined } from '@ant-design/icons';
import './style.css'
import axios from 'axios'

class AppHeader extends Component{
    constructor (props){
        super (props);
        this.state = {
            list: [],
            iconMap:{
                "usergroup-delete":<UsergroupDeleteOutlined />,
                "idcard":<IdcardOutlined />,
                "dingding":<DingdingOutlined />,
                "google":<GoogleOutlined />,
                "wechat":<WechatOutlined />,
                "dribbble":<DribbbleOutlined />
            }
        }
    }

    getMenuItems (){
        return this.state.list.map((item)=>{
            const iconType=this.state.iconMap[item.icon];
            return (
                <Menu.Item key={item.id} icon={iconType}>
                    <Link to={`/${item.id}`}>{item.title}</Link>
                </Menu.Item>
            )
        })
    }

    componentDidMount () {
        const promise = axios.get('http://www.dell-lee.com/react/api/header.json')
        promise.then((res)=>{
            if(res.data){
                const data = res.data.data
                this.setState({
                    list:data
                })
            }
        })
    }

    render () {
        return (
            <Fragment>
                <Link to="/">
                    <img src={logo} alt={logo} className="app-header-logo"/>
                </Link>                    
                <Menu mode="horizontal" className="app-header-menu">
                    {this.getMenuItems()}
                </Menu>
            </Fragment>
        )
    }
}

export default AppHeader;