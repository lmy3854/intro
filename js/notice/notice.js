/**
 * Created by okihouse on 2017. 8. 8..
 */
$(function() {
    'use strict';
    var notice = {
        env: {
            endpoint: {
                jp: 'https://s3-ap-northeast-1.amazonaws.com/kyaraten-notice/data.json',
                ko: 'https://s3-ap-northeast-1.amazonaws.com/kyaraten-notice/data_kr.json'
            },
            accept_language: {
                japan: 'ja',
                korea: 'ko'
            }
        },
        init: function(){
            this.data();
            this.cacheDom();
            this.bindEvent();
        },
        cacheDom: function(){
            this.$body = $('body');
            this.$el = $('.container');

            this.$toggleList = this.$el.find('.toggleList');
        },
        bindEvent: function(){
            notice.$toggleList.on('click', 'a', function(e){
                e.preventDefault();
                var isActive = $(this).parent().hasClass('active');
                if (isActive){
                    $(this).parent().removeClass('active');
                } else {
                    $(this).parent().addClass('active');
                }
            });
        },
        data: function(){
            var endpoint = notice.endpoint();
            $.getJSON(endpoint, function(data) {
                $.each(data, function(index, value){
                    var $template = notice.template();
                    $template.find('.title').text(value.title)
                    $template.find('time').text(value.issueDate);
                    $template.find('article').html(value.content);
                    notice.$toggleList.append($template);
                });
            });
        },
        endpoint: function(){
            var country = navigator.language || navigator.userLanguage;
            switch (country) {
                case notice.env.accept_language.japan:
                    return notice.env.endpoint.jp;
                case notice.env.accept_language.korea:
                    return notice.env.endpoint.ko;
                default:
                    return notice.env.endpoint.jp;
            }
        },
        template: function(){
            var $section = $('<section>' +
                '<a href="#">' +
                '<div class="titleWrapper">' +
                '<div class="title"></div>' +
                '<time></time>' +
                '</div>' +
                '</a>' +
                '<article></article>' +
                '</section>');
            return $section;
        }
    }
    notice.init();
});