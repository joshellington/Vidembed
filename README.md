# Vidembed

### Embed YouTube, Vimeo and Instagram videos with just a link

Stop using random Regex's on each project to parse out YouTube, Vimeo and Instagram embed links.

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="dist/jquery.vidembed.min.js"></script>
	```

3. Call the plugin:

	```javascript
	$("a").vidembed({
		embed: true,
		youtube: {
			width: 720,
			height: 480
		},
		vimeo: {
			width: 640,
			height: 360
		},
		instagram: {
			width: 612,
			height: 720
		}
	});
	```


```

## License

[MIT License](http://zenorocha.mit-license.org/)
