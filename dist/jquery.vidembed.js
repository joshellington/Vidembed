/*
 *  Vidembed - v0.1
 *  Embed YouTube, Vimeo and Instagram videos with just a link.
 *  http://github.com/joshellington/Vidembed
 *
 *  Made by Josh Ellington
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

  // undefined is used here as the undefined global variable in ECMAScript 3 is
  // mutable (ie. it can be changed by someone else). undefined isn"t really being
  // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
  // can no longer be modified.

  // window and document are passed through as local variable rather than global
  // as this (slightly) quickens the resolution process and can be more efficiently
  // minified (especially when both are regularly referenced in your plugin).

  // Create the defaults once
  var pluginName = "vidembed",
  defaults = {
    embed: false,
    service: false,
    youtube: {
      width: 640,
      height: 480
    },
    vimeo: {
      width: 640,
      height: 480
    },
    instagram: {
      width: 612,
      height: 710
    }
  };

  // The actual plugin constructor
  function Plugin ( element, options ) {
    this.element = element;
    // jQuery has an extend method which merges the contents of two or
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don"t want to alter the default options for
    // future instances of the plugin
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {
    init: function () {
        // Place initialization logic here
        // You already have access to the DOM element and
        // the options via the instance, e.g. this.element
        // and this.settings
        // you can add more functions like the one below and
        // call them like so: this.yourOtherFunction(this.element, this.settings).
      this.check();
    },

    check: function() {
      var href = $(this.element).attr("href") || $(this.element).attr("data-href");
      
      if (href) {
        if (href.indexOf("youtube") !== -1) {
          this.settings.service = "youtube";
          this.parseYoutube(href);
        } else if (href.indexOf("vimeo") !== -1) {
          this.settings.service = "vimeo";
          this.parseVimeo(href);
        } else if (href.indexOf("instagram") !== -1) {
          this.settings.service = "instagram";
          this.parseInstagram(href);
        }
      } else {
        console.error("Missing href value.");
      }
    },

    parseYoutube: function (href) {
      // console.log(this.element, href);

      var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
          videoId = (href.match(p)) ? RegExp.$1 : false,
          embed = "//youtube.com/embed/"+videoId;

      // console.log(videoId);
      this.render(embed);
    },

    parseVimeo: function (href) {
      // console.log(this.element, href);

      var p = /http(s)?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/,
          videoId = (href.match(p)) ? RegExp.$3 : false,
          embed = "//player.vimeo.com/video/"+videoId;

      // console.log(videoId);
      this.render(embed);
    },

    parseInstagram: function (href) {
      // console.log(this.element, href);

      var videoId = href.split("/")[4],
          embed = "//instagram.com/p/"+videoId+"/embed/";

      // console.log(videoId);
      this.render(embed);
    },

    render: function(embed) {
      if (this.settings.embed) {
        var iframe = "<iframe src='"+embed+"' width='"+this.settings[this.settings.service].width+"' height='"+this.settings[this.settings.service].height+"' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen scrolling='no' allowtransparency='true'></iframe>";
        $(this.element).replaceWith(iframe);
      } else {
        $(this.element).attr("data-embed", embed).attr("data-embed-width", this.settings[this.settings.service].width).attr("data-embed-height", this.settings[this.settings.service].height);
      }
    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[ pluginName ] = function ( options ) {
    this.each(function() {
        if ( !$.data( this, "plugin_" + pluginName ) ) {
            $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
        }
    });

    // chain jQuery functions
    return this;
  };

})( jQuery, window, document );
