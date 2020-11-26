import React from 'react'
import '../assets/css/list.css'
import qsString from 'querystring'
import { GetSongDetail } from '../util/axios'
class List extends React.Component {
    constructor() {
        super()
        this.state = {
            playlist: [],
            songlist: []
        }
    }
    componentDidMount() {
        let query = this.props.location.search.slice(1);
        GetSongDetail({ id: qsString.parse(query).id }).then(res => {
            console.log(res);
            if (res.data.code == 200) {
                this.setState({
                    playlist: res.data.playlist,
                    songlist: res.data.playlist.tracks
                })
            }
        })
    }
    render() {
        const { songlist, playlist } = this.state
        return (<div >
            <div className='m-list-ti'>
                <div className='m-list-bg'>
                    <img src={playlist.coverImgUrl}></img>
                </div>
                <div className='m-list-warp'>
                    <div className='m-list-l'>
                        <img className='m-list-img' src={playlist.coverImgUrl}></img>
                        <span className='m-list-icon'>歌单</span>
                        <i className='m-list-num'>{playlist.playCount = playlist.playCount > 10000 ? (playlist.playCount / 10000).toFixed(2) + '万' : playlist.playCount}</i>
                    </div>
                    <div className='m-list-r'>
                        <h2 className='mlist-title'>{playlist.name}</h2>
                        <div className='m-people'>
                            <a className='m-link'>
                                <div className='m-avatar'>
                                    <img src={playlist.creator ? playlist.creator.avatarUrl : ''}></img>
                                </div>
                                {playlist.creator ? playlist.creator.nickname : ''}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='l-son'>
                <h3 className='sonl'>歌曲列表</h3>
                <div className='m-sglist'>
                    {
                        songlist.map((item, index) => {
                            return <a className='m-sgitem' key={item.id}>
                                <div className='song-ti'>{(index + 1).toString().padStart(2, '0')}</div>
                                <div className='m-zong'>
                                    <div className='m-song'>{item.name}
                                    </div>
                                    <div>
                                        <p className='m-singer'><i></i>{
                                            item.ar.map(items => {
                                                return <span key={items.id}>{items.name}</span>
                                            })
                                        }-<span>{item.name}</span></p>
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
        </div >)
    }
}
export default List