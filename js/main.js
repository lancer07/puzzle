
// 随机block
var SUCCESS = [1,2,3,4,5,6,7,8,0];
var emptyPosition = 8; // 空格的位置
var randomPosition = [];
var step = 0;

function randomBlock(){
    step = 0;
    $(".step").html(step);
    var arr = $.extend([],SUCCESS);
	for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    randomPosition = arr;
    for (var i in arr) {
        if(arr[i]==0){
            emptyPosition = parseInt(i) ;
        }
        $("#main>div").eq(arr[i]).attr('data-index',i).css({
            left : 100 * (i%3),
            top : 100 * (Math.floor(i/3))
        })
    }
}

function change(){
    var random = Math.round(Math.random()*9+1);
    $('.answer,.block').css('background-image','url(img/bg_'+ random +'.jpg)');
    randomBlock();
}

function updatePosition(p1,p2){
    var tmpl = [];
    var end = ['8','0','1','2','3','4','5','6','7'];

    emptyPosition = p2;
    step ++;
    $(".step").html(step);
    $("#main>div").each(function(){
        tmpl.push($(this).attr('data-index'));
    });

    if(tmpl.toString() == end.toString()){
        $("#success").show();
    }
}

function up(){
    if (emptyPosition < 6) {
        var targetIndex = parseInt(emptyPosition) + 3 ;
        $("#main>div[data-index='"+ targetIndex +"']").animate({
            top : '-=100px'
        },100,function(){
            $(this).attr('data-index',targetIndex-3)
        });

        $("#main>div[data-index='"+ emptyPosition +"']").animate({
            top : '+=100px'
        },100,function(){
            $(this).attr('data-index',targetIndex);
            updatePosition(emptyPosition,targetIndex);
        });

    }
}

function down(){
    if (emptyPosition > 2) {
        var targetIndex = parseInt(emptyPosition) - 3 ;
        $("#main>div[data-index='"+ targetIndex +"']").animate({
            top : '+=100px'
        },100,function(){
            $(this).attr('data-index',targetIndex+3)
        });

        $("#main>div[data-index='"+ emptyPosition +"']").animate({
            top : '-=100px'
        },100,function(){
            $(this).attr('data-index',targetIndex);
            updatePosition(emptyPosition,targetIndex);

        });
    }
}

function left(){
    if(emptyPosition%3<2){
        var targetIndex = parseInt(emptyPosition) + 1 ;
        $("#main>div[data-index='"+ targetIndex +"']").animate({
            left : '-=100px'
        },100,function(){
            $(this).attr('data-index',targetIndex-1)
        });

        $("#main>div[data-index='"+ emptyPosition +"']").animate({
            left : '+=100px'
        },100,function(){
            $(this).attr('data-index',targetIndex);
            updatePosition(emptyPosition,targetIndex);
        });

    }
}

function right(){
    if(emptyPosition%3>0){
        var targetIndex = parseInt(emptyPosition) - 1 ;
        $("#main>div[data-index='"+ targetIndex +"']").animate({
            left : '+=100px'
        },100,function(){
            $(this).attr('data-index',targetIndex+1)
        });

        $("#main>div[data-index='"+ emptyPosition +"']").animate({
            left : '-=100px'
        },100,function(){
            $(this).attr('data-index',targetIndex);
            updatePosition(emptyPosition,targetIndex);
        });
    }
}

$(document).ready(function(){
    change();
}).on('keypress',function(e){
    if(!$("#main>div").is(":animated")) {
        switch (e.keyCode) {
            case 119: //上
                up();
                break;
            case 115: //下
                down();
                break;
            case 97: //左(會導致輸入時無法使用左右移)
                left()
                break;
            case 100: //右(會導致輸入時無法使用左右移)
                right();
                break;
            default:
                return;
        }
    }
}).on('click','.reset',function(){
    randomBlock();
    $("#success").hide();
}).on('click','#showNum',function(){
    $("#main>div>span").toggle();
}).on('click','#showAnswer',function(){
    $(".answer").toggle();
}).on('click','#change',function(){
    change();
});


touch.on(document, 'swipeleft', left);
touch.on(document, 'swiperight', right);
touch.on(document, 'swipeup', up);
touch.on(document, 'swipedown', down);
