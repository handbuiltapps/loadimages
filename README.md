# Image Load callbacks using jQuery#
This is a light-weight jquery plugin that allows you load images asynchronously and provides callback for them. In addition it allows to defer the loading images resulting in faster page load time.

##Requirements##
[jQuery](https://jquery.com) 1.4+

##Installation##
```html
<!-- jQuery library (served from Google) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- HBA Dropdown file -->
<script type="text/javascript" src="jquery.hbaLoadImages.js"></script>
```
##Usage##
```javascript
$('div').hbaLoadImages();
```
##Configuration Options##
```javascript
$('.parent').hbaLoadImages({
    selector: 'img',
    //Specifies the child images to be selected under a parent tag. Works only with a parent other than image tag.
    //Defaults to "img"
    attribute: 'src',
    //Specifies the attribute that contains the image source. Useful to defer image load.
    //Deafults to "src"
    debug: false,
    //Logs the error messages to console.
    //Deafults to false
    onSuccess: function(source, element) {
        //Code to be executed when an image has loaded successfully.
        //source: Contains the image path that was loaded
        //element: Contains the image element that was processed
    },
    onError: function(message, source, element) {
        //Code to be executed when an image has failed.
        //message: Contains the reason why the image load failed
    },
    onComplete: function(source, element) {
        //Code to be executed when each image has been processed.
    },
    onQueueComplete: function() {
        //Code to be executed once when all the images in the queue has been processed.
    }
});
```
##Defer Images##
The following code sample provides an idea of deferring image load with this plugin.
```html
<div class="deferred-loading">
    <img data-src="https://www.handbuiltapps.com/media/icons/apple/touch-icon-180.png" />
    <img data-src="https://www.handbuiltapps.com/media/icons/apple/touch-icon-152.png" />
</div>
```
```javascript
$('.deferred-loading').hbaLoadImages({
    attribute: 'data-src',
    onSuccess: function(source, element) {
        element.src = source;
    }
});
```
##Author##
[Balaji Viswanath](https://github.com/balajigans)
