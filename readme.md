# Backbone - Marionette - Framework7

A full bundle to create quickly crossplatform apps composed with :
  - [Backbone.JS]
  - [MarionetteJS] - Backbone Framework
  - [Framework7] - Full featured HTML Framework

### Out of the box
- GruntJS
- Bower
- Main navigation based on tabbar for exemple
- Single popup
- Popup with internal navigation controller
- Support Android's back button on different kind of view

### Tech

Due to the difficulty to make Backbone & Framework7 work together, I give you some exemple directly in the app to show you how to make Pages, Popup, Navigation...

The Backbone's router is not really use. You won't be able to access directly to a single page like /#/mypage, but for a mobile app, it's not a problem! If you want to make deeplinking, you'll have to manage it at the start of the app.

Some details about different kind of views will come later.

### Installation

Please use the Yeoman's generator to get all the features related to Cordova initialization.
The document is available on my Github's repo here : <https://github.com/Under-Warz/yeoman-framework7-backbone-marionette>

### GruntJS

The app comes with 2 GruntJS' tasks :

Start dev
```sh
$ grunt serve
```

Build
```sh
$ grunt build --force
```

Build and compile on Android physical device
```sh
$ grunt build:android --force
```

Note : by default, there is no Cordova setup on this repo. Cordova is set-up if you use the Yeoman's generator.

### Changelog

##### 10/9/2015
• Improve the child page system. You can now add a sub-page like main page in the router by using 
```
this.layout.REGION.show(page, {
    preventDestroy: true
});
```

   [Backbone.JS]: <http://backbonejs.org/>
   [MarionetteJS]: <http://marionettejs.com/>
   [Framework7]: <http://www.idangero.us/framework7>


