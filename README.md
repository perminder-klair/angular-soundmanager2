# AngularJs Music Player

A music player made with SoundManager 2 API for AngularJs to play music files.

SoundManager 2 brings reliable cross-platform audio to JavaScript.

**Requirements:** AngularJS 1.2+

## Usage:

1. install via bower:

```
bower install angular-soundmanager2
```

2. include required file:

```
dist/angular-soundmanager2.js
```

3. include the angularSoundManager as a dependency for your app.

```js
angular.module('myApp', ['angularSoundManager'])
```

4. That's it -- you're done!


### Example demo
Take a look at files under `examples` directory for demo and how to create player using AngularJs directives.


## HTML5 Audio() Support

    * 100% Flash-free MP3 + MP4/AAC where supported
    * Compatible with Apple iPad 3.2, iPhone/iOS 4 and newer
    * Fallback to Flash for MP3/MP4 support, as needed
    * SM2 API is transparent; HTML5/flash switching handled internally
    * HTML5 API support approximates Flash 8 API features
    * Some other formats (WAV/OGG) supported via HTML5, depending on browser
    * See "useHTML5Audio" property for implementation details

## Why I created this
There are a couple projects similar to this out there, but none were ideal for me and none of them was using awesome API of SoundManager2.

Feel free to fork this project and amend it according to your needs. This is just an start point!

## Credits:
Credit goes to [Scott Schiller](https://github.com/scottschiller) for his excellent [SoundManager2](https://github.com/scottschiller/SoundManager2).

## License:
Licensed under the MIT license