# Oiii.JS
--------------
##### or just OpenImage JS

## Step 1
Clone this repository first:\
`git clone https://github.com/tomasci/oiii.git`

Then:\
`npm install`\
`npm run build`

When build complete you will see `/build` folder:\
`/build/`\
`- oiii.min.js`\
`- oiii.min.js.map`\
`- /styles/`\
`-- oiii.css`\
`-- oiii.css.map`\
`-- oiii.min.css`

## Step 2

All you need now is to include 2 files into your html code.\
Example located in `index.html`.

So, between `<head></head>` insert this line:\
`<link rel="stylesheet" href="build/styles/oiii.min.css">`

And before `</body>` insert:\
`<script src="build/oiii.min.js" charset="utf-8"></script>`

## Step 3
Before `</body>` but after already included `oiii.min.js` write something like this:
```
window.addEventListener('load', function() {
    var oi = new Oiii()
})
```

## Step 4
##### Lists
If you have a list of images or links to youtube videos, so add `data-oi-list` or `data-oi-list-yt` attribute to container of them.

Each image must contain `src="path_to_your_thumb"`, `data-oi-preview="path_to_your_small_image"` and `data-oi-fullsize="path_to_your_fullsize_image"` attributes.

Each yt-link must contain `data-oi-yt="link_to_youtube_video"` attribute.

Example:
```
<div class="myAwesomeDemoWithImages" data-oi-list>
    <img src="" data-oi-preview="" data-oi-fullsize="" alt="">
    <img src="" data-oi-preview="" data-oi-fullsize="" alt="">
</div>

<div class="myAwesomeDemoWithYoutube" data-oi-list-yt>
    <a href="#" data-oi-yt="">video 1</a>
    <a href="#" data-oi-yt="">video 2</a>
</div>
```

Also, you can use images or something different inside of `<a>` tag for YouTube videos.

##### Single images and youtube links

Every single image must contain `data-oi-image` attribute and also `src`, `data-oi-preview`, `data-oi-fullsize` attributes.

Example for images:
```
<img src="" data-oi-image data-oi-preview="" data-oi-fullsize="" alt="">
```

Each single youtube link must containt `data-oi-video` attribute and also `data-oi-yt` attribute.

Example:
```
<a data-oi-video data-oi-yt="">video 3</a>
```