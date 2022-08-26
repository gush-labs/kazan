# [カザン - Kazan](https://kana.vadimgush.com)

Web-app for kana, vocabularity, kanji, and reading practice.

# Development
You can run local dev server either by using `npm` directly or by using docker container.

## Using Docker

Start local dev server with `docker-compose` by using the current state
of the source code:
```sh
docker-compose up
```
Please keep in mind that in order to see your changes, you need
to rebuild the docker image.

Stop running local dev server:
```sh
docker-compose down
```

## Using npm

Install all required dependencies:
```sh
npm install
```

Compile and Hot-Reload for Development
```sh
npm run dev
```

Type-Check, Compile and Minify for Production

```sh
npm run build
```

Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```



