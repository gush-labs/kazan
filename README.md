# [カザン - Kazan](https://kana.vadimgush.com)

Web-app for kana, vocabularity, kanji, and reading practice.

# Development
You can run local dev server either by using `npm` directly or by using docker container.

## Using Docker

Start local dev server using `docker-compose`.
```sh
docker-compose up
```
It will bind your current directory to the content of the docker container allowing you to make changes interactively.

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



