import React from 'react'
import '../assets/css/index.css'

import Recommend from '../views/home';
import Rank from '../views/rank';
import Search from '../views/search'

//引入相关属性
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (<div className='index'>
            <div className='nav-title'></div>
            <div className='nav-bar'>
                <NavLink activeClassName='active' to='/index/recommend'>推荐音乐</NavLink>
                <NavLink activeClassName='active' to='/index/rank'>排行榜</NavLink>
                <NavLink activeClassName='active' to='/index/search'>搜索</NavLink>
            </div>
            {/* 二级路由出口 */}
            <Switch>
                <Route path='/index/recommend' component={Recommend}>
                </Route>
                <Route path='/index/rank' component={Rank}></Route>
                <Route path='/index/search' component={Search}>
                </Route>
                <Redirect to='/index/recommend'></Redirect>
            </Switch>
        </div>)
    }
}
export default Home