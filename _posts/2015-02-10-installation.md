---
layout: page
title: "Installation"
category: doc
date: 2015-02-10 12:05:27
order: 1
---

install via bower:

```
bower install angular-soundmanager2
```

include required file:

```
dist/angular-soundmanager2.js
```

include the angularSoundManager as a dependency for your app.

```js
angular.module('myApp', ['angularSoundManager'])
```

That's it -- you're done!


## Development

Install dependencies

`npm install`

Run grunt to watch files to update `dist`

`grunt`