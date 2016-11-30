# tinypng-loader

PNG is useful because it's the only widely supported format that can store partially transparent images.
When app moves to production stage, image compression is essential. However, according to my experience using
such as gulp-image, imagemin-webpack, most of them relied on optipng plugin. This compression algorithm only help reduce
around 5%-10%. [tinypng.com](https://tinypng.com) uses smart lossy compression techniques to reduce the file size of PNG/JP(E)G files
with around <b>60%-70%</b> file size reduction.

Here is a [command line way](https://github.com/jf3096/tinypng-loader-cli) if you just want to quickly use it without any coding.

### Advantage
By compare to other tinypng library, this library use a tinypng "loophole" API to compress images.
Support popular build tools gulp and webpack so that developers can easily used this in and <b>only in Production stage</b> (Since this library rely on tinypng web api which require network accesss)

### Compatible Image
* PNG
* JP(E)G

### Get Started
```bash
npm install tinypng-loader --save-dev
```

### Support
* Webpack
* Gulp

### Language
* Typescript
* Javascript

## Example

### Gulp
```javascript
    var gulp = require('gulp');
    var gulpTinyPng = require('tinypng-loader/gulp/index');
    gulp.task('tinypng', (cb) => {
        gulp.src(`test/img/**/*.png`)
            .pipe(gulpTinyPng())
            .pipe(gulp.dest('test/dist'))
            .on('end', cb);
    });
```

### Webpack
```javascript
    ...
    module:{
        ... //webpack loader starts from here
        {
           test: /\.png$/,
           loader: 'file!tinypng'
        },
        ... //end of webpack loader
    }
```

### Screenshot
Here is a normal case if you use this library correctly
![alt tag](/git-img/success.png)

Any errors occured will be logged in console
![alt tag](/git-img/error.png)

### Roadmap
Due to single thread for gulp/webpack, the upload and download might be slow as each image processes optimization in a sequence.
The speed is acceptable as this library mean to be used in production stage. Thus
if anyone wants to make it process faster, please <b>star it</b> to show me your support.
I would like to add a <b>concurrent queue worker</b> to support concurrent upload/download.
