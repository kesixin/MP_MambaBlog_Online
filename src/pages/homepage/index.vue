<template>
    <div class="homepage">
        <music></music>
        <div class="content">
            <div class="avatar">
                <img src="https://upload.jianshu.io/users/upload_avatars/6673460/1f56c2bb-1e2d-4e4c-8c51-316a0b659e7e.png?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120"
                     class="avatar-item">
            </div>
            <h1 class="description">Mamba Blog</h1>
            <ul class="tab">
                <li class="tab-item">
                    <a class="tab-link">技术</a>
                </li>
                <li class="tab-item">
                    <a class="tab-link">生活</a>
                </li>
                <li class="tab-item">
                    <a class="tab-link">吐槽</a>
                </li>
                <li class="tab-item">
                    <a class="tab-link">梦想</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import Music from '@/components/music'

    export default {
        components: {
            Music
        }
    }
</script>
<style>
    .homepage {
        position: relative;
        height: 100vh;
        overflow: hidden;
        background: #fff;
        z-index: 3;
    }

    .content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 3;
        text-align: center;
    }

    .avatar {
        margin-bottom: 20px;
    }

    img {
        width: 120px;
        height: 120px;
        overflow: hidden;
        border-radius: 50%;
        background: #FFF;
        box-shadow: rgba(255, 255, 255, 0.1) 0 0 0 5px, rgba(0, 0, 0, 0.1) 0 0 5px 4px;
        transition: transform .4s ease-out;
    }

    img:hover {
        transform: rotate(360deg);
    }

    .description {
        margin-bottom: 20px;
        font-weight: bold;
        color: #6289ad;
        font-size: 24px;
    }

    .tab .tab-item {
        height: 40px;
        line-height: 40px;
        text-align: center;
        list-style: none;
    }

    .tab-link {
        padding: 10px;
        color: #9caebf;
        font-size: 14px;
        font-weight: 600;
    }
    a{
        background: none;
    }
    a:hover {
        color: #6289ad;
        font-weight: 700;
        background: none;
    }
</style>