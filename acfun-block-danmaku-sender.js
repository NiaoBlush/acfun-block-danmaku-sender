// ==UserScript==
// @name            AcFun 屏蔽弹幕发送人
// @name            acfun-block-danmaku-sender
// @namespace       https://github.com/NiaoBlush/acfun-block-danmaku-sender
// @version         1.0
// @description     acfun 在视频窗口屏蔽弹幕发送人
// @author          NiaoBlush
// @license         MIT
// @grant           none
// @require         https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js
// @include         https://www.acfun.cn/*
// ==/UserScript==


(function () {
    "use strict";
    var $ = window.$;
    addBtn();

    function addBtn() {

        const containerPluginsInner = $(".container-plugins-inner");
        containerPluginsInner.bind("DOMNodeInserted", function (e) {
            const contextMenu = $(e.target);
            if (contextMenu.hasClass("context-menu")) {
                // console.log("contextMenu created");
                containerPluginsInner.unbind("DOMNodeInserted");
                contextMenu.bind("DOMNodeInserted", onMenuCreated);
            }
        });
    }

    function onMenuCreated(e) {
        const menu = $(e.target);
        const user = menu.data("user");
        const message = menu.data("message");
        const blockUserBtn = $("<span class='btn-tm-block-user'>屏蔽用户</span>");
        menu.children(".danmaku-operate").append(blockUserBtn);
        blockUserBtn.click(function () {
            // console.log(user, message);

            $(".options-control-select>div[data-value='user']").trigger("click");
            $(".filter-input-wrap>input.filter-input").val(user);
            $(".btn-danmaku-filter-add").trigger("click");
        });

    }
})();

