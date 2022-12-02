![Untitled](https://user-images.githubusercontent.com/6123702/194173134-23fec594-76ed-44a9-88b5-26c33e396a28.png)
# [Kazan - Japanese learning assistant](https://kazan.vadimgush.com)

Web-app that helps you to practice hiragana, katakana, vocabulary, and kanji (coming soon). An assistance tool for your [WaniKani](https://wanikani.com) learning journey.

![iPhone 12 Pro Max -- Silver](https://user-images.githubusercontent.com/6123702/194172375-9a630f5a-805b-4235-ba23-3a2bc7369d36.png)

## Features

List of currently supported features
 * **Kana review**
 * **Vocabulary review**
   * Meaning, reading, and translation reviews
   * Review by WaniKani user level
 * **Settings**
   * Japanese fonts
 * **WPA support**

## Development

There are 2 directories inside of this repository:
 * `server` - source code for the server (NodeJS app)
 * `client` - source code for the web-app (Vue/TypeScript app)

You can navigate to any of those and init them as local npm projects through
`npm install`. And then use IDE of your choice to make appropriate changes.

If you just want to try to run both server and client locally, you can do that
by using the following `make` commands:

```sh
# To launch the server locally
make server-run

# To lanuch the web-server for the web-app locally
make client-run
```

