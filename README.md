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


##### Custom build 
```sh
docker build -t <image name> .
```
image name can be as per your choice 
```sh
docker build -t kazan .
```

##### image
```sh
docker run  <image name>
```
app will run on port `:5173` 
Use `-it` or `-d` flag to specify interactive or detached mode respectively
For Development use bind mount with `-v' or '--mount' flag

