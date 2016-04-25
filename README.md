# Ftv::Components::SVG

Angular module to manage svg.

## Get sources

```
git clone git@gitlab.ftven.net:team-infini/ftv-angular-svg.git
```

## How to use

Include javascript

```js
<script src="dist/component.js"></script>
```

Include your svg in "svg" folder, then run gulp task

```
gulp build
```

Use directive

```html
<ftv-svg svg="'filename'"></ftv-svg>
```

## Build only svg

```
gulp svg
```

## Required dependencies

- [npm](https://nodejs.org/)

## Build process

```
npm install -g gulp

npm install

gulp build
```

## Development build for front web only

```
gulp build-dev-watch
```

## Demo

```
gulp build
npm install -g http-server
http-server
```

Open [demo](http://127.0.0.1:8080/demo.html)
