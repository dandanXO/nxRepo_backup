init()
function init() {
  var baseUrl = '/hs/admin/auth';
  var currentUA = window.navigator.userAgent;

  var parentUrl = window.location.href;
  var start = parentUrl.lastIndexOf("=");
  //1.得到页面的渠道id
  var channelId =parentUrl.substring(start+1);
  //2.通过该渠道id去数据库查询该渠渠道配置的渠道商信息
  var channelUAUrl = baseUrl + '/getChannelUA';
  var channelUA = getUA(channelUAUrl,channelId);

  // if("渠道不存在" ==channelUA ){
  //   alert("渠道不存在，可跳转到错误页面");
  //   return null;//需要返回一个错误页面
  // }
  // if("渠道已禁用" == channelUA){
  //   alert("渠道已禁用,可跳转至错误页面");
  //   return null;//需要返回一个渠道被禁用的页面
  // }

  //3.后台获取到的渠道商信息与页面获取到的渠道商信息作对比，看该点击是否来自渠道商
  var flag = currentUA == (channelUA||channelUA==null)?true:false;
  if(!flag){
    window.location.href="https://www.baidu.com/";//临时跳百度，可设计个非法访问页面
    return false;
  }
}

function getUA(channelUAUrl,id){
  var channelUA=null;
  $.ajax({
    url: channelUAUrl,
    type : 'post',
    async:false,
    data: {
        channelId: id
    },
    dataType: 'json',
    success: function(data) {
        if(data.code !== 200) { 
            return false;
        }
        console.log(data.data)
        channelUA = data.data;
    }
})
  return channelUA;
}