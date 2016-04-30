/**
 * Created by Administrator on 2016/4/23.
 */
var main=document.getElementById("main");
var oLis=document.querySelectorAll("#main>ul>li");
var desW=640;
var desH=960;
var winW=document.documentElement.clientWidth;
var winH=document.documentElement.clientHeight;
if(winW/winH<desW/desH){
    main.style.webkitTransform="scale("+winH/desH+")";
}else{
    main.style.webkitTransform="scale("+winW/desW+")";
}

//控制音乐
var Omusic=document.querySelector("#music");
Omusic.play();
var musicPic = document.querySelector("#musicPic");
musicPic.addEventListener("click",function(){
    if(Omusic.paused){
        Omusic.play();
        musicPic.className="musicPic";
    }else{
        Omusic.pause();
        musicPic.className="";
    }
},false);

//给每个LI绑定触摸事件
[].forEach.call(oLis,function(oLi,i){
    oLi.index=i;
    oLi.addEventListener("touchstart",start,false);
    oLi.addEventListener("touchmove",move,false);
    oLi.addEventListener("touchend",end,false);
});

window.setTimeout(function(){
    oLis[0].firstElementChild.id="a0";
},1000);

function start(e){
    //获得初始坐标
    this.startY= e.touches[0].pageY;
    this.startX= e.touches[0].pageX;

}
function move(e){
    e.preventDefault();
    this.flag=true;

    //移动到了哪
    var moveY= e.touches[0].pageY;
    var moveX= e.touches[0].pageX;
    //滑动的距离
    var changeY=moveY-this.startY;
    var changeX=moveX-this.startX;
    if(Math.abs(changeX)>Math.abs(changeY)){
        this.flag=false;
        return;
    }
    var index=this.index;
    var lastItem=oLis.length-1;//最后一项的索引
    [].forEach.call(oLis,function(){
        if(index!=arguments[1]){
            arguments[0].style.display="none";
        }
        arguments[0].className = "";
        arguments[0].firstElementChild.id = "";


    });
    if(changeY>0){//下滑
        this.prevsIndex=index==0?lastItem:index-1;
        var duration=-480+changeY;
        oLis[this.prevsIndex].style.webkitTransform="translate(0,"+duration+"px)";

    }else if(changeY<0){//上滑
        this.prevsIndex=index==lastItem?0:index+1;
        var duration=480+changeY;
        oLis[this.prevsIndex].style.webkitTransform="translate(0,"+duration+"px)";

    }
    oLis[this.prevsIndex].className="zIndex";
    oLis[this.prevsIndex].style.display="block";

    //处理当前这张
    this.style.webkitTransform = "scale("+(1-Math.abs(changeY/winH)*1/2)+") translate(0,"+changeY+"px)";

}


var twoTitle=document.querySelector("#twoTitle");


function end(e){
    if(this.flag){
        var curIndex=this.prevsIndex;
        //让上一张或者下一张都回到0,0的位置
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "0.5s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd",function(){
            this.style.webkitTransition = "";
            //增加执行动画的id名

            switch(curIndex){
                case 0:
                    this.firstElementChild.id = "a"+curIndex;
                    break;
                case 1:
                    this.firstElementChild.id = "a"+curIndex;
                    twoTitle.className="twoTitle";
                    setTimeout(function(){
                        twoTitle.className="";
                    },1000);
                    break;
                case 3:
                    this.firstElementChild.id = "a"+curIndex;
                default:
                    break;
            }
        },false)
        this.flag = false;
    }
}

document.addEventListener("touchmove",function(e){

},false);