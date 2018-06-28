<!--
 * 音乐播放器组件
 * 编写：MambaBlog(http://blog.kesixin.xin)
 * 时间：‎2018‎-6‎-‎7
 * 使用网易云音乐外链，参考薛聪的博客小程序
-->
<template>
    <div class="music" :class="{'hide': hide}">
        <div class="music-item" :class="{'rotate': listen}" @click="playMusic">
            <audio :src="link" id="myAudio" loop></audio>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                listen: true,
                hide: false,
                link: 'http://music.163.com/song/media/outer/url?id=38358214.mp3'
            }
        },
        created () {
            this.audioPlay()
        },
        methods: {
            audioPlay () {
                this.audioCtx = wx.createAudioContext('myAudio')
                this.audioCtx.play()
            },
            playMusic () {
                if (this.listen) {
                    this.listen = false
                    this.audioCtx.pause()
                    return
                }
                this.listen = true
                this.audioCtx.play()
            }
        }
    }
</script>
<style>
    .music {
        position: relative;
    }

    .hide {
        display: none
    }

    .music-item {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 36px;
        height: 36px;
        background-image: url(http://p5vnm2kox.bkt.clouddn.com/images/music_pause.png);
        background-size: 36px 36px;
        background-repeat: no-repeat;
        z-index: 100;
    }

    .rotate {
        background-image: url(http://p5vnm2kox.bkt.clouddn.com/images/music.gif)
    }

</style>