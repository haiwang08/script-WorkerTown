// ==UserScript==
// @name         Worker Town
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to make money!
// @author       RedHatHusky
// @match        https://game.worker.town/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @require      http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...

    initWait();

    // 初始扫描
    initialScan();
})();

function initWait(){
    jQuery.fn.wait = function (selector, func, times, interval) {
        var _times = times || -1, //100次
            _interval = interval || 20, //20毫秒每次
            _self = this,
            _selector = selector, //选择器
            _iIntervalID; //定时器id
        if( this.length ){ //如果已经获取到了，就直接执行函数
            func && func.call(this);
        } else {
            _iIntervalID = setInterval(function() {
                if(!_times) { //是0就退出
                    clearInterval(_iIntervalID);
                }
                _times <= 0 || _times--; //如果是正数就 --
                _self = $(_selector); //再次选择
                if( _self.length ) { //判断是否取到
                    func && func.call(_self);
                    clearInterval(_iIntervalID);
                }
            }, _interval);
        }
    }
    return this;
}

function initialScan(){
    console.log(11111);
    // 防止被覆盖
    initWait();

    var switcher00 = 0;
    var switcher01 = 0;
    // 是酒馆
    if(window.location.href.indexOf("/tavern") > 0 && switcher00 == 0){
        console.log(11111);
        switcher00 = 1;
        $("img[class='show img-sleep z-50 workerNotif']").wait("img[class='show img-sleep z-50 workerNotif']",function(){
            console.log(22222);
            $("img[class='show img-sleep z-50 workerNotif']").each(function(){
                console.log($(this).attr("src").indexOf("hungry"));
                if($(this).attr("src").indexOf("hungry") != -1){
                    console.log(33333);
                    $(this).click();
                    $("#modalWorkerActionButton").mousedown();
                }
            });
        }, 101, 1000);
        // 扫描状态
        var needRest = false;
        console.log(55555);
        $("#modalWorkerActionButton").wait("#modalWorkerActionButton", function(){
                        $(this).click();
                    }, 101, 1000);
        $("span[class='title-font font-bold text-xs']").wait("span[class='title-font font-bold text-xs']", function(){
            console.log(666666);
            $("span[class='title-font font-bold text-xs']").each(function(){
                if($(this).text().indexOf("resting") != -1){
                    // 有"睡饱了的"的,执行对应操作
                    $(this).click();
                    $("#modalWorkerActionButton").mousedown();
                }
                else if($(this).text().indexOf("working") != -1){
                    // 有"下班了"的,执行对应操作
                    $(this).click();
                    $("#modalWorkerActionButton").mousedown();
                    needRest = true;
                }
            });
        }, 101, 1000)

        $("span[class='title-font font-bold text-xs']").wait("span[class='title-font font-bold text-xs']",function(){
            $("div[class='flex justify-end items-center']").each(function(){
                $(this).click();
                $("#modalWorkerActionButton").mousedown();
            });
        }, 101, 1000)

        $("p[class='text-md text-black-800 flex font-bold justify-center bg-gray-100 mt-2 center-text rounded']").wait("p[class='text-md text-black-800 flex font-bold justify-center bg-gray-100 mt-2 center-text rounded",function(){
            $("p[class='text-md text-black-800 flex font-bold justify-center bg-gray-100 mt-2 center-text rounded']").each(function(){
                if($(this).text().indexOf("Exhausted") != -1){
                    window.location = "https://game.worker.town/town";
                }
            });
        }, 101, 1000)
        if(needRest){
            setTimeout(function(){
                window.location = "https://game.worker.town/town";
            }, 2000);
        }

        var randomNum = Math.floor(Math.random() *60) * 1000;
        console.log(randomNum);
        setTimeout(function(){
            window.location = "https://game.worker.town/tavern";
        }, randomNum);
    }


    console.log(77777);
    // 是镇
    if(window.location.href.indexOf("/town") > 0 && switcher01 == 0){
        switcher01 = 1;

        $(".house").wait(".house",function(){
            $(".house").get(0).click();
        }, 101, 1000);

        $("div[class='relative max-w-sm min-w-[150px] p-2 mx-auto']").wait("div[class='relative max-w-sm min-w-[150px] p-2 mx-auto",function(){
            $("a[class='modalSlot showWorkerList cursor-pointer']").each(function(){
                $(this).find("div").eq(0).click();
                setTimeout(function(){
                    $("div[class='p-2 rounded-xl flex']").get(0).click();
                }, 1000);
            });
        }, 101, 1000);

        setTimeout(function(){
            window.location = "https://game.worker.town/tavern";
        }, 5000);
    }
}

