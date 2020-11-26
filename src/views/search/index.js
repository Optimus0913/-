import React from 'react'
import '../../assets/css/search.css'
import { GetSearchSuggest, GetHotsearch, getSearch } from '../../util/axios'
import axios from 'axios'
class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            val: "",
            hshow: "hshow",
            hotlist: [],
            searchSu: []
        }
        this.inpVal = React.createRef();
    }
    componentDidMount() {
        axios.all([GetHotsearch()]).then(
            axios.spread((hotlist) => {
                // console.log(hotlist);
                if (hotlist.data.code == 200) {
                    this.setState({
                        hotlist: hotlist.data.result.hots
                    })
                }
            }))
    }
    goSearch(keywords) {
        this.setState({
            val: keywords
        })
        console.log(keywords);
        getSearch({
            keywords,
        }).then((res) => {
            console.log(res);
            if (res.data.code === 200) {
                console.log(res, "搜索结果");
                this.setState({
                    searchSu: res.data.result.songs.filter((titem, i) => i < 10)
                });
            }
        });
    }
    changeData(e) {
        if (e.target.value != '') {
            this.goSearch(e.target.value)
        }
        this.setState({
            val: e.target.value,
        })
    }
    enter(e) {
        if (e.keyCode == 13 && e.target.value != "") {
            this.goSearch(e.target.value)
        }
    }
    del() {
        this.setState({
            val: ''
        })
    }
    render() {
        const { hotlist, searchSu } = this.state
        let hnone = this.state.val ? <h3 className={this.state.hshow}>搜索{this.state.val}</h3> : ""
        let dell = this.state.val ? <figure className='close' onClick={() => this.del()}>
            <i className='u-svg-empty'></i>
        </figure> : ''
        let hotSearch = this.state.val ? "" : <div className='m-default'>
            <h4>热门搜索</h4>
            <ul className='list'>
                {hotlist.map((item) => {
                    return (
                        <li onClick={this.goSearch.bind(this, item.first)} className='m-so' key={item.first}>
                            <a>{item.first}</a>
                        </li>
                    )
                })}
            </ul>
        </div>
        let souresult = this.state.val ? <ul className='search-su'>
            {searchSu.map(item => {
                return <li key={item.id}><i className='.u-search'></i><span className='search-su'>
                    {item.name}
                </span></li>
            })}
        </ul> : ''
        return (<div>
            <div className='m-tabct'>
                <div className='tabctitem'>
                    <div className='m-hmsrch'>
                        <div className='inputcover'>
                            <i className='u-svg-srch'></i>
                            <input type='text' name='search' className='input' autoComplete='off'
                                placeholder='搜索歌曲、歌手、专辑'
                                value={this.state.val}
                                ref={this.inpVal}
                                onKeyUp={(e) => {
                                    this.enter(e)
                                }}
                                onChange={(e) => {
                                    this.changeData(e)
                                }}
                            ></input>
                            {dell}
                            <label></label>
                        </div>
                        {hnone}
                        {hotSearch}
                        {souresult}
                    </div>
                </div>
            </div>
        </div>)
    }
}
export default Search