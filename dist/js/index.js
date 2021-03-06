var dataList,list,control,len,timer,currSongIndex,root=window.player,audio=root.audioManager,deg=0;getCookie();var scroTop=0;function songName(){for(var t=$(".song-info").find(".song-name"),o=t.text(),n=o.length,i=0,e=0;e<n;e++)255<o[e].charCodeAt()&&i++;30<n+i?t.css({animation:"songNameRuning 10s cubic-bezier(0, 0, 1, 1) alternate infinite"}):t.css({transform:"translate3d(1%, 0px, 0px)"})}function getData(t){$.ajax({type:"GET",url:t,success:function(t){len=(dataList=t).length,control=new root.controlIndex(len,currSongIndex),root.rendering(t,currSongIndex),audio.getAudio(t[currSongIndex].audio),root.progress.renderTotalTime(t[currSongIndex].duration),bindEvent(),bindTouch()},error:function(t){}})}function bindTouch(){var o,n,i,e,a,r,s;e=$(".curr-img").width(),a=$("body").width(),$(".img-box").on({touchstart:function(t){o=t.changedTouches[0].pageX,$(".curr-img").css({transition:"none"}),cancelAnimationFrame(timer),$(".arm-img").add(".play").removeClass("playing")},touchmove:function(t){n=t.changedTouches[0].pageX,$(".curr-img").css("left",n-o),i=$(".curr-img").offset().left,a<=i+e?$(".pro-img").css({display:"block",transform:"translate3d(-142%, 0px, 0px)",left:n-o,transition:"none"}):i<=0?$(".next-img").css({display:"block",transform:"translate3d(132%, 0px, 0px)",left:n-o,transition:"none"}):$(".moveIn").css("left",0)},touchend:function(t){i<-e/2?($("body").trigger("play-changer",control.next()),root.switch.imgTouchMove($(".next-img"),$(".pro-img"),"next-img","pro-img","-132%","-142%","-132%")):a-e/2<=i?($("body").trigger("play-changer",control.prev()),root.switch.imgTouchMove($(".pro-img"),$(".next-img"),"pro-img","next-img","142%","132%","0")):($(".img-box").css({left:0,transition:"left .3s cubic-bezier(0, 0, 1, 1)"}),"play"==audio.status&&(rotate(deg=$(".curr-img").attr("data-deg")),$(".arm-img").add(".play").addClass("playing")))}}),r=$(".pro-wrap").offset().left,s=parseInt($(".pro-wrap").css("width")),$(".slider").on({touchstart:function(){$(this).css({height:"13px",width:"13px",top:"-5px"}),root.progress.stop()},touchmove:function(t){var o=(t.changedTouches[0].clientX-r)/s;o<0?o=0:1<o&&(o=1),audio.pause(),root.progress.updata(o),-1<$(".play").attr("class").indexOf("playing")&&($(".play").add(".arm-img").removeClass("playing"),cancelAnimationFrame(timer))},touchend:function(t){$(this).css({height:"8px",width:"8px",top:"-3px"});var o=(t.changedTouches[0].clientX-r)/s;o<0?o=0:1<o&&(o=1);var n=root.progress.conversonSecondTime(dataList[currSongIndex].duration)*o;root.progress.updata(o),setTimeout(function(){root.audioManager.playTo(n),$(".play").add(".arm-img").addClass("playing"),songName(),currSongIndex=$(".list").attr("song-index"),root.progress.start(dataList[currSongIndex],o),rotate(deg=$(".curr-img").attr("data-deg"))},1500)}})}function bindEvent(){$("body").on("play-changer",function(t,o){audio.getAudio(dataList[o].audio),$(".play").add(".arm-img").removeClass("playing"),setTimeout(function(){$(".play").add(".arm-img").addClass("playing"),rotate(0),audio.play()},500),$(".list").attr("song-index",o),root.progress.renderTotalTime(dataList[o].duration),root.progress.start(dataList[o]),saveCookie(o),$(".curr-img").find("div").css({transform:"translatez(0px) rotateZ(0deg)",transition:"none"}).attr("data-deg","0")}),$(".prev").on("click",function(t){root.switch.imgClickMove($(".pro-img"),$(".next-img"),"pro-img","next-img","moveIn-right","moveOut-right","132%","-142%"),$("body").trigger("play-changer",control.prev())}),$(".next").on("click",function(t){root.switch.imgClickMove($(".next-img"),$(".pro-img"),"next-img","pro-img","moveIn-left","moveOut-left","-142%","132%"),$("body").trigger("play-changer",control.next())}),$(".play").on("click",function(){"pause"==audio.status?(audio.play(),rotate(deg=$(".curr-img").attr("data-deg")),songName(),root.progress.start(dataList[currSongIndex],"",!0)):(audio.pause(),cancelAnimationFrame(timer),root.progress.stop()),$(".play").add(".arm-img").toggleClass("playing")}),$(".like").on("click",function(){-1!=$(this).attr("class").indexOf("liking")?($(this).removeClass("liking"),dataList[currSongIndex].isLike=!1):($(this).addClass("liking"),dataList[currSongIndex].isLike=!0)}),$(".list").on("click",function(t){t.stopPropagatoion?t.stopPropagatoion():t.cancelBubble=!0,list=new root.songList(dataList),$(this).addClass("playList"),list.renderListDom(),getCookie(),$("ul",".songList").find("li").eq(currSongIndex).addClass("active"),$(".active").find("span").css("margin-left","30px"),$(this).find(".list-top").css({opacity:"1",transform:" translate3d(-50%, -82%, 0)"}),$("ul",".songList").on("click",function(t){var o=t.target||t.srcElement;t.offsetY=scroTop,10<parseInt($(o).css("width"))&&$(o).parent().attr("data-index")!=$(".list").attr("song-index")&&($(".list").attr("song-index",$(o).parent().attr("data-index")),currSongIndex=$(".list").attr("song-index"),control=new root.controlIndex(dataList.length,+currSongIndex),audio.pause(),saveCookie(currSongIndex),root.rendering(dataList,$(".list").attr("song-index")),audio.getAudio(dataList[$(".list").attr("song-index")].audio),$("body").trigger("play-changer",$(".list").attr("song-index")),scroTop=t.offsetY,$("ul",".songList").find("li").eq(currSongIndex).addClass("active"),$(".img-box").css({left:0,transition:"left .3s cubic-bezier(0, 0, 1, 1)"}),rotate(0))}),$(".shadow").css({display:"block"}).on("click",function(){$(".list").find(".list-top").css({transform:" translate3d(-50%, 70%, 0)"}),setTimeout(function(){$(".list").removeClass("playList")},300),$(this).css({display:"none"})})})}function rotate(o){cancelAnimationFrame(timer);o=Number(o);!function t(){o+=.2,$(".curr-img").attr("data-deg",o.toFixed(1)),$(".curr-img").find("div").css({transform:"translatez(0px) rotateZ("+o+"deg)",transition:"transform .1s cubic-bezier(0, 0, 1, 1) "}),timer=requestAnimationFrame(t)}()}function saveCookie(t){document.cookie="index="+t+";max-age=1000000000"}function getCookie(){currSongIndex=null!=document.cookie.match(/\w+=\d+$/g)?+document.cookie.match(/\w+=\d+$/g)[0].replace(/^\w+=/g,function(t){return""}):0}audio.bindMediaEnd(function(){cancelAnimationFrame(timer),root.switch.imgClickMove($(".next-img"),$(".pro-img"),"next-img","pro-img","moveIn-left","moveOut-left","-142%","132%"),$("body").trigger("play-changer",control.next())}),getCookie(),getData("../moke/data.json");