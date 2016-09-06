/**
 * Created by yinsq on 16/8/28.
 */


(function(){

    var desW = 640;
    var winW = document.documentElement.clientWidth;
    var ratio = winW/desW;
    var oMain = document.getElementById('main');
    if(winW > desW){
        oMain.style.margin = '0 auto';
        oMain.style.width = desW + 'px';
        return;
    }
    document.documentElement.style.fontSize = ratio * 100 +'px';

})();

var swiperStart = (function(){
    var main = document.getElementById('main');
    return {
        init:function(){


            //->INIT SWIPER
            new Swiper('.swiper-container', {
                direction: 'vertical',
                loop: true,
                lazyLoading: true,
                autoplay:5000,
                lazyLoadingInPrevNext: true,
                /*当切换结束后,给当前展示的区域添加对应的ID,由此实现对应的动画效果*/
                onSlideChangeEnd: function (swiper) {
                    //swiper.slides:获取当前一共有多少个活动块(包含LOOP模式先前后多加的两个)
                    //swiper.activeIndex:当前展示这个区域的索引
                    var slideAry = swiper.slides,
                        curIn = swiper.activeIndex,
                        total = slideAry.length;

                    //->计算ID是PAGE?
                    var targetId = 'page';
                    switch (curIn) {
                        case 0:
                            targetId += total - 2;
                            break;
                        case (total - 1):
                            targetId += 1;
                            break;
                        default:
                            targetId += curIn;
                    }

                    //->给当前的活动快设置ID即可,还要把其余的移除
                    [].forEach.call(slideAry, function (item, index) {
                        if (curIn === index) {
                            item.id = targetId;
                            return;
                        }
                        item.id = null;
                    });
                }
            });
        }
    }
})();

var start = (function(){

    var start = document.getElementById('start');
    var page1 = document.getElementsByClassName('page1')[0];
    //console.log(start);
    var t =null;


    return{
        init:function(){
            start.addEventListener('click',function(){
                //console.log(1);
                var musicMenu = document.getElementById('musicMenu'),
                    musicAudio = document.getElementById('musicAudio');
                function controlMusic() {
                    musicAudio.volume = 0.5;
                    musicAudio.play();
                    start.className = 'moveStart';
                    swiperStart.init();
                    musicAudio.addEventListener('canplay', function () {
                        //音乐开始
                        page1.id = 'page1';
                    }, false);
                }
                t  = window.setTimeout(controlMusic,500);
//            window.clearTimeout(t);
            },false);

            window.clearTimeout(t);
        }
    }

})();

start.init();










