<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 200rpx 0;
        box-sizing: border-box;
    }
    /* this rule will be remove */
    * {
        transition: width 2s;
        -moz-transition: width 2s;
        -webkit-transition: width 2s;
        -o-transition: width 2s;
    }
    page {
        height: 100%;
        line-height: 1;
        font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', 'arial', 'sans-serif', 'Droid Sans Fallback', 'Helvetica neue', 'Microsoft Yahei', 'Helvetica', 'Tahoma', 'lantinghei sc';
        -webkit-tap-highlight-color: transparent;
        background: #fff;
    }
    navigator {
        color: #7e8c8d;
    }

    .navigator-hover{
        background-color: #fff;
        opacity: 1;
    }
    @font-face{
        font-family: 'icomoon';
        src:  url('./fonts/icomoon.eot?29mqfn');
        src:  url('./fonts/icomoon.eot?29mqfn#iefix') format('embedded-opentype'),
        url('./fonts/icomoon.ttf?29mqfn') format('truetype'),
        url('./fonts/icomoon.woff?29mqfn') format('woff'),
        url('./fonts/icomoon.svg?29mqfn#icomoon') format('svg');
        font-weight: normal;
        font-style: normal;
    }

    [class^="icon-"], [class*=" icon-"]{
        /* use !important to prevent issues with browser extensions that change fonts */
        font-family: 'icomoon' !important;
        speak: none;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;

        /* Better Font Rendering =========== */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

    }
    .icon-price-tags:before{
        content: "\e936";
    }
    .icon-money:before{
        content: "\e93e";
    }
    .icon-clock:before{
        content: "\e94e";
    }
    .icon-user:before{
        content: "\e971";
    }
    .icon-eye:before{
        content: "\e9ce";
    }
    .icon-cross:before{
        content: "\ea0f";
    }
    .icon-sina-weibo:before{
        content: "\ea9a";
    }

    .wxParse {
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif !important;
        color: #24292e !important;
        font-size: 15px;
    }

    .wxParse .pre {
        background:#f6f8fa !important;
        padding: 16px !important;
        overflow: scroll;
        white-space: pre !important;
        border-radius: 3px;
    }

    .wxParse .code {
        background: #f6f8fa !important
    }

    .wxParse .pre, .wxParse .tt, .wxParse .code, .wxParse .kbd, .wxParse .samp {
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif !important;
    }

</style>
