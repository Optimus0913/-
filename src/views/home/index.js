import React from 'react'
import '../../assets/css/home.css'

import { getMusicdan, GetNewMusic, GetBanner } from '../../util/axios'
import axios from 'axios'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            songlist: [],
            songitem: [],
            bannerlist: []
        }
    }
    componentDidMount() {
        //并发处理
        axios.all([getMusicdan({ limit: 6 }), GetNewMusic(), GetBanner()],).then(
            axios.spread((songlist, songitem, bannerlist) => {
                if (songlist.data.code == 200) {
                    this.setState({
                        songlist: songlist.data.result
                    })
                }
                if (songitem.data.code == 200) {
                    // console.log(songitem);
                    this.setState({
                        songitem: songitem.data.result
                    })
                }
                if (bannerlist.data.code == 200) {
                    // console.log(bannerlist);
                    this.setState({
                        bannerlist: bannerlist.data.banners
                    })
                    // console.log(bannerlist)
                }
            }))
    }
    componentDidUpdate() {
        new Swiper('.swiper-container', {
            loop: true,
            autoplay: true,
            delay: 2000,
            pagination: {
                el: '.swiper-pagination',
            },
            observer: true,
            observeParents: true,
        });
    }

    goList(id) {
        this.props.history.push(`/list?id=${id}`)
    }
    render() {
        const { songlist, songitem, bannerlist } = this.state
        return (<div>
            <div className='m-tabct'>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {bannerlist.map(item => {
                            return (<div className="swiper-slide" key={item.imageUrl}><img className='img1' src={item.imageUrl}></img></div>)
                        })}
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className='m-homeremd'>
                    <h2 className='m-title'>推荐歌单</h2>
                    <div className='m-songs'>
                        <ul className='m-ul'>
                            {songlist.map((item) => {
                                return (
                                    <li key={item.id} className='m-li' onClick={this.goList.bind(this, item.id)}>
                                        <img className='img' src={item.picUrl}></img>
                                        <p>{item.name}</p>
                                        {/* <span>{item.playCount}</span> */}
                                        <span>{item.playCount > 10000 ? (item.playCount / 10000).toFixed(2) + '万' : item.playCount}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <h2 className='m-title'>最新音乐</h2>
                    <div className='m-newsong'>
                        <div className='m-sglist'>
                            {
                                songitem.map((items) => {
                                    return <a className='m-sgitem' key={items.id}>
                                        <div className='m-zong'>
                                            <div className='m-song'>{items.name}
                                            </div>
                                            <div>  <p className='m-singer'><i></i>
                                                {items.song.artists.map((song, i, arr) => {
                                                    return <span key={song.id}>{song.name = i === arr.length - 1 ? song.name : song.name + '/'} </span>
                                                })}- {items.song.album.name}</p>
                                            </div>
                                        </div>
                                        <div className='sgchfr'>
                                            <span className='sgchply'></span>
                                        </div>
                                    </a>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >)
    }
}
export default Home