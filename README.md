![Untitled](https://user-images.githubusercontent.com/6123702/194172737-2861adfa-d812-46c4-8e04-03582c3f5df7.png)


Web-app for kana, vocabularity, kanji, and reading practice.

![iPhone 12 Pro Max -- Silver](https://user-images.githubusercontent.com/6123702/194172375-9a630f5a-805b-4235-ba23-3a2bc7369d36.png)


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



