import React,{Component} from "react"
import http from "@http"
import Router from 'next/router'
import { Toast, ListView,} from 'antd-mobile';

class NewsList extends Component{
  constructor(props){
    super(props);
    const list=this.props.list;
      this.state={
      isLoading:false,
      list:list,
      page:2,
      hasMore:true,
      dataSource:new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(list)
    }
  }
  handleJump(item){
      Router.push('/detail?id='+item.item_id)
  }
  onEndReached (){
    if (this.state.isLoading || !this.state.hasMore) {
      return;
    }
    this.setState({ isLoading: true ,page: this.state.page+1});
    this.getData()
  }

  getData(){
    const behot_time = this.state.list[this.state.list.length - 1] ? this.state.list[this.state.list.length - 1].behot_time : (new Date().getTime()-2*60*60*1000).toString().substring(0,10);
    http.get(`/api/list/`, {
      params: {
        tag: '__all__',
        ac: 'wap',
        count: '20',
        format: 'json_raw',
        as: 'A1750EBF6820180',
        cp: '5EF860E1D8F03E1',
        max_behot_time: behot_time,
        _signature: 'zzhYuAAAkcgoT6C-L.hV.s84WK',
        i: behot_time,
        page: this.page
      }
    }).then((res)=>{
      const _data=res.data;
      if(_data.data && _data.has_more){
        const arr=[...this.state.list,..._data.data||[]];
        this.setState({
          hasMore:arr.length>0,
          isLoading:false,
          list:arr,
          dataSource: this.state.dataSource.cloneWithRows(arr)
        })
      }
      else{
        Toast.info(_data.message)
      }
    })
  }
  render(){
    const row=(item,index)=>{
      return item.image_list && item.image_list.length>0?(
      <li className="article-list-item" key={index} onClick={()=>this.handleJump(item)}>
        <div className="cont">
          <p>{item.title}</p>
          <div className="img-arr">
          {
            item.image_list.map((sitem,sindex)=>{
              return <div className="pic" key={sindex} ><img src={sitem.url} alt="img"/></div>
            })
          }
          </div>
          <ul className="tag-btm">
            <div className="nums">
              <b>
                <em className="tag">{item.media_name}</em>
                <em className="read">评论 {item.comment_count}</em>
                </b>
                <em className="time">{item.datetime}</em>
              </div>
          </ul>
        </div>
      </li>
      ):(
      <li className="article-list-item" key={index} onClick={()=>this.handleJump(item)}>
        {item.large_image_url?<div className="pic"><img src={item.large_image_url} alt="img" /></div>:<></>}
        <div className="cont">
          <p>{item.title}</p>
          <ul className="tag-btm">
            <div className="nums"><b><em className="tag">{item.media_name}</em><em className="read"> ⋅ {item.comment_count}评论 ⋅  </em></b> <em className="time">{item.datetime}
              </em></div>
          </ul>
        </div>
      </li>
      )
    };
    return(
      <body>
        <div>
        <header>
          <div className="header">
              <div className="left-header">
                  <span className="download-app tb-link">下载APP</span>
                  <span className="register-mp tb-link">注册头条号</span>
                  <span className="city">北京</span>
                  <span className="city_state">霾</span>
                  <span className="city_temperature"><em>8</em>℃ / <em>16</em>℃</span>
              </div>
              <div className="right-header">
                  <span className="login tb-link">登录</span>
                  <span className="tb-item">侵权投诉</span>
                  <span className="tb-item more">头条产品</span>
              </div>
          </div>
        </header>
        <main>
          <div className="left"> 
            <div className="logo"><img src= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAAA2CAMAAACSsKctAAAANlBMVEVHcEzuQEDwRETyRUX3TEzvQkLuQEDuQUHuQUHvQEDuQUHuQEDvQkLuQEDuQUHwQUHxQkLtQEDKaksGAAAAEXRSTlMAxiweDlyo49Nri/F5+bhLOapXaIgAAATMSURBVGje7ZrpsqQqDIAb2VEE3/9lx263AAmu3XVv1cn8mFOtIh+JIQuvFyFSzdK8/jsSrbg7BG+HSdjPZi3iJPTchR7a7iYam7mGNvwKTM5vlOQd6n3Z37IhN6zSNhW1TsJqMt/TwQk6G3gxmt0DC5/LfpxS9U38wOJ9RJN38uG4KGBR0wRNxrcHtn4dlPjpv4pCYzqEEffBfAG2XDC9sxyCUbbfH3wVDdbkS2P4FzQGRR4As8NdsEYXy01Y4xMa28C6KljT3gUDXNtYOn5fY3UwNtwEA9+XA397+zONxR03fQ1MerjG0Is4QYK5riLzEMDdC4+CuQoY99sKoW9R20z5zsKwN0gAczDFUohdPzSKRpw4j9Yp0+Jg2GgCrHBf3sAVuIytC8u4RjIwYmGOh8AMvTutfLtgydR8ZjzCgeV32M7eFlyZj2T8GY3lfHwNmChTGmcP5tECNNFBf4m4AqEGhGt8rYEj2i+AwUhwFCocgOs+ok383MFfMecdoGYUHFwkW76Jz5kiHlmQ4TtPY48+iNAnfqgX1a+vtNMueXyjvqox5WTkJFgthq3t0i2ydhY+4MsbYhKMtEu6dxFseqw1Gd+s2raasylPRgCluoJJgnnU3SYaHbS8Y4rJBv3h42AFdN1gGzwWZtgcMHD3Xk5BfYOz67qlsWKDnq3G1DP74DTCZVwQVbA1X57WpWWqk40od4svgInKBrtUPJSpfGPGyYYC6zma/OjJm0RzBcwcBONltAzKIVYxfyBObJlbFAHAtKSyOla4x+c1FiuhAxvOiDcpWBKo4GDbp3sLDA2CJR07EGCaUZYJwUys5OGgBhdYCRYFIWQQHKzrjU/AXCUdQ8C0e0+Y295XwbSsFhiS4qLUC9hePsZ2QqqVT4I3NvtgvrfbXQLxkwsYUoWsgI37uX4GbOXj231+J332DPHsXKb+cknCkC2gkZ1iLQE2RtRPgiVJq6mAadVtUKL5CAea69v9qGxxs/KTMLFrVaozYLLi7UcwrVxWY3XYtjfu32q07cOF/Ob7YKpWLm0Emewj+7m43Ud5EGzdAvjJKnz/jTbCg2B2OBIpXgBzZl9a/xFdhBChwYWXYIEYe1GYzn6fHlPIE3rJDhBBTPxIPHYng5bDObEXQqrEK34PTP+B/c/A/kzxD+wUWLB1AXVJd8cUm3Jkv1W/SpmGlsiVOUw32GxPbMVbZtA9WwneGjo+Xun/34s8hEGLqQ+AgUaVff0cDHCpJ7stSZvKTVW//vNPoXVuNV3rVQ7WVR+juRjRfLqtMeuzkWOtG2SxdtrnuehrSc9utyBpwjwB5sp23eqdI33Og5Wm6IZan3eXKz/wcc8UYdl87ZOsrUtDZmzz6xIwoU9nB2CHKw5FLGBWVkQXzrTsu4Fvw1K+JGRWmjoPiTjto6eqysMeF08NFA0chRVu8jNRyzpogXpF6rF9LuSw2MVzHtnphMxRNLgj6IasdpCBNef8B+CKj53zyI5tWOqdATsP0VP7GPoYJd1QDQuuagw2f30xj9URaFF6MM8pMPSxfa7w4FmqxtTb4YgjCOVPReQRanvgKa5TGuvQ7j9+rq5QD6aNMqRa/LffKb9JvQoR6Al9XCQyrCZCIL5eX5Z4+QEscJfekj/2D7KhSDEKe9jHAAAAAElFTkSuQmCC"/></div>
            <ul>
              <li>推荐</li>
              <li>西瓜视频</li>
              <li>热点</li>
              <li>直播</li>
              <li>图片</li>
              <li>科技</li>
              <li>娱乐</li>
              <li>游戏</li>
              <li>体育</li>
              <li>懂车帝</li>
              <li>财经</li>
              <li>数码</li>
              </ul>
          </div>

          <div className="right">
            <div className="search">
              <input className="search-input" type="text" placeholder="搜索站内资讯、视频或用户"/>
              <button type="button">搜索</button>
            </div>
            <div className="clear"></div>
            <div className="login-block">
                <div className="login-inner">
                    <p className="login-message">登录后可以保存您的浏览喜好、评论、收藏，并与APP同步，更可以发布微头条</p>
                    <a href="https://sso.toutiao.com/">
                        <button type="button" className="login-button">登录</button>
                    </a>
                    <ul className="login-icon">
                        <li className="icon qq">
                            <span>QQ</span>
                        </li>
                        <li className="icon weixin">
                            <span>微信</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="right2">
                <div className="right-head">
                    更多
                </div>
                <div className="clear"></div>
                <ul>
                    <li>关于头条</li>
                    <li>加入头条</li>
                    <li>媒体报道</li>
                    <li>媒体合作</li>
                    <li>产品合作</li>
                    <li>合作说明</li>
                    <li>广告投放</li>
                    <li>联系我们</li>
                    <li>用户协议</li>
                    <li>隐私政策</li>
                    <li>侵权投诉</li>
                    <li>廉洁举报</li>
                    <li>企业认证</li>
                    <li>肺炎求助</li>
                    <li>辟谣专区</li>
                </ul>
            </div>
            <div className="right3">
                <div className="right-head">
                    友情链接
                </div>
                <div className="clear"></div>
                <ul>
                    <li>光明网</li>
                    <li>央广网</li>
                    <li>国际在线</li>
                    <li>中国西藏网</li>
                    <li>参考消息</li>
                    <li>环球网</li>
                    <li>中青在线</li>
                    <li>中青网</li>
                    <li>中工网</li>
                    <li>海外网</li>
                    <li>中国网</li>
                    <li>未来网</li>
                    <li>千龙网</li>
                    <li>新京报</li>
                    <li>北青网</li>
                    <li>法制晚报</li>
                    <li>北京晨报</li>
                    <li>北京商报</li>
                    <li>北京娱乐信报</li>
                    <li>奥一网</li>
                    <li>金羊网</li>
                    <li>华商网</li>
                    <li>新民网</li>
                    <li>红网</li>
                    <li>中国江苏网</li>
                    <li>中国江西网</li>
                    <li>齐鲁网</li>
                    <li>南海网</li>
                    <li>安徽网</li>
                    <li>河北新闻网</li>
                    <li>闽南网</li>
                    <li>海峡网</li>
                    <li>华声在线</li>
                    <li>中国蓝TV</li>
                    <li>北国网</li>
                    <li>龙虎网</li>
                    <li>东莞时间网</li>
                    <li>懂车帝</li>
                    <li>汽车之家</li>
                    <li>女人志</li>
                    <li>中国搜索</li>
                    <li>每日经济新闻</li>
                    <li>网上车市</li>
                    <li>网通社汽车</li>
                    <li>北方网</li>
                    <li>湖南省旅发委官网</li>
                    <li>乐居网</li>
                    <li>人民论坛网</li>
                    <li>中国财富网</li>
                </ul>
            </div>
          </div>

          <div className="center">
            <div className="column-wrap">
              <div className="art-list">
                <ListView
                dataSource={this.state.dataSource}
                renderFooter={() => (
                <div style={{ padding: 0, textAlign: 'center',fontSize:12 }}>
                  {this.state.isLoading ? '正在加载...' : this.state.hasMore?'加载完毕...':'-- 已经到底了 --'}
                </div>
                )}
                renderBodyComponent={() => <ul className="article-list-wrap"></ul>}
                renderRow={row}
                style={{
                  height: '100vh',
                  overflow: 'auto',
                }}
                pageSize={10}
                scrollRenderAheadDistance={500}
                onEndReached={()=>this.onEndReached()}
                onEndReachedThreshold={10}
              />
              </div>
            </div>
          </div>
        </main>
        <style jsx>{
        `.mint-spinner-fading-circle {
            margin: 0 auto;
          }
          .column-wrap{
            background:#fff;
          }
          .finish-tips {
            text-align: center;
            height: 20px;
            line-height: 20px;
            color: #7e7e7e;
          }
          body  {
            font: 12px/1.14 PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,Helvetica Neue,Arial,sans-serif;
            background: #ffffff;
            margin: 0; 
            padding: 0;
            text-align: center;
            color: #000000;
          }
          a:link {color: #000000;}
          a:visited {color: #999;} 
          a:hover {color: #406599;} 
          .header {
              background: #222;
              height: 34px;
              color:#fff;
              line-height: 34px;
              font-size: 14px;
          }
          .header span{
              padding: 0 10px;
          }
          .left-header{
              float:left
          }
          .right-header{
              float:right
          }
          main{
              width: 1170px;
              margin: 16px auto 0;
          }
          .left{
              display: inline-block;
              width: 110px;
              height: 600px;
              margin-right: 30px;
              background-color: #fff;
              vertical-align: top;
          }
          .logo img{
              width: 120px;
          }
          .left ul{
              padding: 0px; 
              margin: 0px; 
          }
          .left ul li {
              list-style: none;
              padding: 10px 0 0 0;
              height: 30px;
              font-size: large;
              color: #444;
              border-radius: 4px;
              text-align: center;
          }
          .left ul li:hover{
              background-color: #ed4040;
              color: #fff;
              animation-duration: .2s;
              animation-timing-function: linear;
              animation-iteration-count: 1;
          }
          .right {
              float: right;
              width: 340px;
              vertical-align: top;
          }
          .search{
              width: 340px;
              border: 0;
              height: 40px;
              margin: 10px 0;
          }
          .search input{
              float: left;
              width: 258px;
              height: 40px;
              padding: 0;
              margin: 0;
              color: #1f2d3d;
              background-color: #f5f6f7;
              border: 1px solid #e8e8e8;
              border-radius: 4px;
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
          }
          .search button{
              float: left;
              width: 78px;
              height: 40px;
              padding: 0;
              margin: 0;
              font-family: Arial;
              color: #fff;
              background-color: #208eda;
              border: 1px solid #208eda;
              border-radius: 4px;
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
          }
          .login-block{
              width: 300px;
              height: 198px;
              margin: 16px 0;
              padding: 20px 20px 12px;
              background: #f4f5f6;
          }
          .login-inner{
              width: 242px;
              height: 161px;
              padding: 20px 28px 15px;
              text-align: center;
              background: #fff;
              border: 1px solid #e8e8e8;
              letter-spacing: 0;
          }
          .login-message{
              font-size: 12px;
              line-height: 17px;
              color: #777;
              margin: 12px 0;
          }
          .login-button{
              width: 240px;
              height: 40px;
              font-size: 14px;
              line-height: 20px;
              color: #fff;
              background: #ed4040;
              border: none;
              border-radius: 4px;
              cursor: pointer;
          }
          .login-icon{
              width: 242px;
              height: 60px;
              text-align: center;
              padding: 0;
              margin: 12px 0;
          }
          .login-icon ul{
              display: block;
              list-style-type: disc;
              margin-block-start: 1em;
              margin-block-end: 1em;
              margin-inline-start: 0px;
              margin-inline-end: 0px;
              padding-inline-start: 40px;
          }
          .login-icon .icon{
              list-style: none;
              display: inline-block;
              position: relative;
              width: 36px;
              height: 58px;
              cursor: pointer;
              background-repeat: no-repeat;
              background-size: 100% 36px;
          }
          .weixin{
              background-image: url(http://sf3-scmcdn-tos.pstatp.com/obj/goofy/toutiao/toutiao_web_pc/svgs/icon_weixin_pc.7eab8c3d.svg),none;
          }
          .qq{
              margin-right: 24px;
              background-image: url(http://sf3-scmcdn-tos.pstatp.com/obj/goofy/toutiao/toutiao_web_pc/svgs/icon_qq_pc.83d80076.svg),none;
          }
          .login-icon span{
              position: absolute;
              left: 6px;
              top: 41px;
              width: 24px;
              font-size: 12px;
              line-height: 17px;
              color: #777;
          }
          .right2{
              background-color: #f5f6f7;
              margin: 0px;
              width: 340px;
              height: 180px;
              vertical-align: top;
              border-top: 2px solid #ed4040;
          }
          .right-head{
              float:left;
              color: #222;
              padding: 20px;
              border: 0;
              margin: 0;
              height: 20px;
              font-size: 18px;
              font-weight: 700;
          }
          .right2 ul{
              padding: 0px 20px;  
              width: 340px;
              height: 160px;  
              text-align: left; 
          }
          .right2 ul li {
              list-style: none;         
              height: 30px;
              width: 70px;
              color: #777;
              font-size: 14px;
              display: inline-block;
          } 
          .right3{
              background-color: #f5f6f7;
              margin: 20px 0 0 0;
              width: 340px;
              height: 540px;
              border-top: 2px solid #ed4040;
          }  
          .right3 ul{
              text-align: left;
              padding: 0 20px;
          }
          .right3 ul li {
              list-style: none;         
              color: #777;
              line-height: 3;
              font-size: 14px;
              display: inline-block;
          }
          .center {
              display: inline-block;
              width: 660px;
          }
          .link{
              text-decoration: none;
          }
          .clear{
            clear:both;
          }`
        }
        </style>
      </div>
      </body>
    )
  }
}
NewsList.getInitialProps = async ({ query }) => {
  const behot_time=(new Date().getTime()-2*60*60*1000).toString().substring(0,10)
     const res = await http.get(process.browser?`/api/list/`:`/list/`, {params: {
      tag: '__all__',
      ac: 'wap',
      count: '20',
      format: 'json_raw',
      as: 'A1750EBF6820180',
      cp: '5EF860E1D8F03E1',
      max_behot_time: behot_time,
      _signature: 'zzhYuAAAkcgoT6C-L.hV.s84WK',
      i: behot_time,
      page: 1
    }});
    return {  
      list:res.data.data||[],
    }
}
export default NewsList;