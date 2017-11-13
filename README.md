# Checkers Game
This is a very simple implementation of the famous Checkers game, using Javascript, HTML and CSS without any framework. This project, however, uses Bootstrap (for the board grid) and a very, very basic config of Webpack to generate a single JS file.
The rules for this game was based on this [page](https://simple.wikipedia.org/wiki/Checkers) and you can check the result [here](https://dccj-checkers-game.herokuapp.com/).

---

# Running the app locally

- Ensure you are using the Node version specified in `.nvmrc` and `package.json`:
```bash
$ nvm install
$ nvm use
```

- For this project, I used Yarn:
```bash
npm install -g yarn@`node -pe "require('./package.json').engines.yarn"`
```

- Then, clone this repo:
```bash
$ git clone https://github.com/davicorreiajr/checkers-game.git
$ cd checkers-game
```

- Install the dependencies:
```bash
$ yarn
```

- Finally, run the app:
```bash
$ yarn start
```




