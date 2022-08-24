# [カザン - Kazan](https://kana.vadimgush.com)

Web-app for kana, vocabularity, kanji, and reading practice.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
### Docker Setup

##### Start container with docker-compose
```sh
docker-compose up
```
##### Stop container with docker-compose
```sh
docker-compose down
```
##### Custom build and run
```sh
docker build -t <image name> .
```
```sh
docker run -v <local directory>:/usr/app <image name>
```
