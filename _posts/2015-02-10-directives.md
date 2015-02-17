---
layout: page
title: "Directives"
category: ref
date: 2015-02-10 14:27:47
order: 3
---

- TODO complete this documentation

Note: Please replace all `single` curly brackets with `double` curly brackets for now. :/


### Init SoundManager

Required to initialize soundmanager

```html
<sound-manager></sound-manager>
```

#### Current Playing Track status

Currently Playing: { currentPlaying.title } by { currentPlaying.artist } ({ currentPostion } / { currentDuration })

### Add Music


```html
<button music-player add-song="song">+</button>
```

To add + play selected track:

```html
<button music-player="play" add-song="song">{song.title}</button>
```      

To play song from playlist:

```html
<a play-from-playlist="song">{song.title}</a>
```

var song must contain following data:

```json
{
    id: 'one',
    title: 'Rain',
    artist: 'Drake',
    url: 'http://www.schillmania.com/projects/soundmanager2/demo/_mp3/rain.mp3'
}
```          

### Remove from playlist

```html
<a remove-from-playlist="song" data-index="{$index}">Remove</a>
```

### Seek Track

Example:

```html
<div class="seekBase" seek-track>
    <div class="seekLoad" ng-style="{width : ( progress + '%' ) }"></div>
</div>
```

### Play Track

```html
<button play-music>Play</button>
```

### Play All Tracks

```html
<button play-all="songs">Play all</button>
```

##### Add All Tracks

Following will only add tracks to playlist and will not trigger play

```html
<button play-all="songs" data-play="false">Add all</button>
```

### Pause Track

```html
<button pause-music>Pause</button>
```

### Play Pause Toggle

```html
<button play-pause-toggle data-play="Play!" data-pause="Pause!">Play Toggle</button>
```

- Show playing status

```
Is Playing: { isPlaying }

```

### Stop Track

```html
<button stop-music>Stop</button>
```

### Previous Track

```html
<button prev-track>Prev Track</button>
```

### Next Track

```html
<button next-track>Next Track</button>
```

### Mute Track

```html
<button mute-music>Mute ({ mute })</button>
```

### Repeat Track

```html
<button repeat-music>Repeat ({ repeat })</button>
```

### Volume

Up:

```html
<button music-volume data-type="increase">+</button>
```

Down:

```html
<button music-volume data-type="decrease">-</button>
```

- Show current volume

```
Volume: {{ volume }}
```

### Clear Playlist

```html
<button clear-playlist>Clear Playlist</button>
```
