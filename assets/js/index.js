/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

        setTimeout(placeFootnotes, 1);

        $(window).resize(placeFootnotes);

    });

})(jQuery);

var placeFootnotes = function() {
    if($('.footnotes').length > 0) {
        var numberOfFootnotes = $('.footnotes ol li').last().attr('id').substring($('.footnotes ol li').last().attr('id').indexOf(':')+1);
        var width = $(window).width();

        if(width > 760) {
            for(var i=1; i<=numberOfFootnotes; i++) {
                var top = Math.floor($('#fnref\\:' + i).position().top);
                $('#fn\\:' + i).css('top', (top - 24) + 'px');
            }
            $('a[href^="#fnref"]').remove();
        }
    }
}