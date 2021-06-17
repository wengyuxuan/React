import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import axios from 'axios';

class pageList extends Component {
  constructor (props){
    super (props);
    this.state = {
        data: []
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    let id = nextProps.match.params.id;
    id = (id===undefined)?'':('?id='+id);
    axios.get(`http://www.dell-lee.com/react/api/list.json${id}`)
    .then((res)=>{
        this.setState({
            data: res.data.data
        })
    })
  }

  render () {
    return (
        <div>
            <List
            style={{background:'#fff'}}
            bordered
            dataSource={this.state.data}
            renderItem={item => (
                <List.Item>
                    <Link to={`/detail/${item.id}`}>{item.title}</Link>
                </List.Item>
            )}
            />
        </div>
    );
  }

  componentDidMount () {
    let id = this.props.match.params.id;
    id = (id===undefined)?'':('?id='+id)
    axios.get(`http://www.dell-lee.com/react/api/list.json${id}`)
    .then((res)=>{
        if(!res.data)
            return
        this.setState({
            data: res.data.data
        })
    })
  }
}

export default pageList;
