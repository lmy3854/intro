/**
 * Created by okihouse on 2017. 8. 8..
 */
$(function() {
    'use strict';
    var notice = {
        init: function(){
            this.data();
            this.cacheDom();
            this.bindEvent();
            this.hash();
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
            $.getJSON('https://s3-ap-northeast-1.amazonaws.com/kyaraten-notice/data.json', function(data) {
                $.each(data, function(index, value){
                    var $template = notice.template(index);
                    $template.find('.title').text(value.title)
                    $template.find('time').text(value.issueDate);
                    $template.find('article').html(value.content);

                    var $anchor = $template.find('a.unit');
                    if($anchor.attr('href') === notice.hash){
                        $template.addClass('active');
                    }
                    notice.$toggleList.append($template);
                });
            });
        },
        template: function(index){
            var $section = $('<section>' +
                '<a href="#' + ++index +'" class="unit">' +
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