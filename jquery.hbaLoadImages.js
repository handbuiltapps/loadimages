/*!
 * jquery.hbaLoadImages.js v1.0
 * @link https://github.com/handbuiltapps/loadimages
 * @author Balaji Viswanath
 * @organisation HandBuiltApps
 * @license https://github.com/handbuiltapps/loadimages/blob/master/LICENSE
 */
(function ($) {
    $.fn.hbaLoadImages = function (options) {
        //Default Options
        var defaults = {
            total: 0, //Read only
            completed: 0, //Read only
            selector: 'img',
            attribute: 'src',
            debug: false,
            onSuccess: null,
            onError: null,
            onComplete: null,
            onQueueComplete: null
        };
        var settings = $.extend({}, defaults, options);

        /****************************
         CORE FUNCTION FOR THIS PLUGIN
         *****************************/
        var core = {
            init: function (element, settings) {
                var selector = $(element);

                //Check if tag is not an image then find images
                if (element.tagName !== "IMG") {
                    selector = $(element).find(settings.selector);
                    settings.total = selector.length;
                }
                
                //Push total to variable
                settings.completed = 0;

                //Loop through images
                selector.each(function () {
                    var imageElement = this,
                        imageTag = $(imageElement),
                        source = imageTag.attr(settings.attribute),
                        image = new Image();
                    
                    if(this.tagName !== "IMG") {
                        core.trigger.onError("The element must be used only with a IMG tag.", "", imageElement);
                    }
                    else if(typeof source == "undefined") {
                        core.trigger.onError("Source attribute was not found.", "", imageElement);
                    }
                    else if($.trim(source) == "") {
                        core.trigger.onSuccess("", imageElement);
                    }
                    else {
                        image.src = source;
                        if (image.complete || image.readystate === 4) {
                            core.trigger.onSuccess(source, imageElement);
                        }
                        else {
                            image.onload = function () {
                                core.trigger.onSuccess(source, imageElement);
                            };
                            image.onerror = function () {
                                core.trigger.onError("Unable to load the image.", source, imageElement);
                            };
                        }
                    }
                });
            },
            trigger: {
                onSuccess: function (source, imageElement) {
                    if ($.isFunction(settings.onSuccess))
                        settings.onSuccess(source, imageElement);
                    
                    core.trigger.onComplete(source, imageElement);
                },
                onError: function (message, source, imageElement) {
                    if(settings.debug === true)
                        console.log(message);

                    if ($.isFunction(settings.onError))
                        settings.onError(message, source, imageElement);
                    
                    core.trigger.onComplete(source, imageElement);
                },
                onComplete: function (source, imageElement) {
                    settings.completed += 1;
                    
                    if ($.isFunction(settings.onComplete))
                        settings.onComplete(source, imageElement);
                    
                    if(settings.completed === settings.total)
                        core.trigger.onQueueComplete();
                },
                onQueueComplete: function () {
                    if ($.isFunction(settings.onQueueComplete))
                        settings.onQueueComplete();
                }
            }
        };
        
        /********************
         INITIALIZE THE PLUGIN
        *********************/

        //Find queue length if plugin is called directly in a img tag. e.g. $(img)
        settings.total = 0;
        this.each(function () {
            settings.total += 1;
        });

        this.each(function () {
            core.init(this, settings);
        });

        return this;
    };
}(jQuery));