import React from 'react'
import '../../assets/css/rank.css'
import { GetToplist } from '../../util/axios'
class Rank extends React.Component {
    constructor() {
        super();
        this.state = {
            songitem: [

            ],
            updateTime: 0
        }
    }
    //封装跳转事件
    goPlay(id) {
        this.props.history.push(`/Play?id=${id}`)
    }
    //封装时间对象
    getTimer(timer) {
        let date = new Date(timer);
        //获取年份
        let year = date.getFullYear();
        //获取月份
        let month = (date.getMonth() + 1 + "").padStart(2, "0");
        //获取天数
        let day = (date.getDate() + "").padStart(2, "0");
        let hour = (date.getHours() + "").padStart(2, "0");
        let minute = (date.getMinutes() + "").padStart(2, "0");
        let second = (date.getSeconds() + "").padStart(2, "0");
        return `${month}月${day}日`;
    }
    componentDidMount() {
        GetToplist({ limit: 10 }).then(res => {
            console.log(res);
            console.log(res.data.playlist);
            if (res.data.code == 200) {
                this.setState({
                    songitem: res.data.playlist.tracks.slice(0, 10),
                    updateTime: res.data.playlist.updateTime
                })
            }
        })
    }
    render() {
        const { songitem } = this.state
        return (
            <div>
                {/* <h1>排行榜页面</h1> */}
                <div className='m-mhot'>
                    <div className='hotop'>
                        <div className='hotopct'>
                            <div className='hoticon'></div>
                            <div className='hottime'>
                                更新日期：{this.getTimer(this.state.updateTime)}
                            </div>
                        </div>
                    </div>
                    <div className='hotcont'>
                        <div className='m-sglist'>
                            {
                                songitem.map((item, index) => {
                                    return <a className='m-sgitem' key={item.id} >
                                        <div className='song-title'>{(index + 1).toString().padStart(2, '0')}</div>
                                        <div className='m-zong'>
                                            <div className='m-song'>{item.name}
                                            </div>
                                            <div>
                                                <p className='m-singer'><i></i>
                                                    {item.ar.map(items => {
                                                        return <span key={items.id}>{items.name}</span>
                                                    })}-{item.name}
                                                </p>
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
                    <div className='hotdn'>
                        <span className='hotview'>查看完整榜单</span>
                    </div>
                </div>
            </div>)
    }
}

export default Rank