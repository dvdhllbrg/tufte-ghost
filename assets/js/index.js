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

        // Wait to make sure everything is rendered before calculating the locations of footnotes.
        setTimeout(placeFootnotes, 10);
        addFigCaptions();

        // If the window is resized, the footnotes will have to move.
        $(window).resize(placeFootnotes);
    });

})(jQuery);

var placeFootnotes = function() {
    var top, prev = null;

    if($(window).width() > 760) {
        $('.footnotes ol li').each(function(index, footnote) {
            top = Math.floor($('#fnref\\:' + (index+1)).position().top) - 24;

            if(prev != null && $(prev).position().top + $(prev).height() > top) {
                top = Math.floor($(prev).position().top + $(prev).height()) + 10;
            }

            $(footnote).css('top', top + 'px');
            prev = footnote;
        });

        $('a[href^="#fnref"]').remove();

        $('.post-content').height(top);
    }
}

var addFigCaptions = function() {
    $('.post-content figure img').each(function(index, figure) {
        var caption = $(figure).attr('alt');
        $(figure).after('<figcaption>' + caption + '</figcaption>');
    });
}