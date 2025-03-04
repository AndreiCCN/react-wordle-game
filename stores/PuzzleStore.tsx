import words from "@/utils/words.json";

export default {
  word: "",
  guesses: [],
  currentGuess: 0,
  get won() {
    return this.guesses[this.currentGuess - 1] === this.word;
  },
  get lost() {
    return !this.won && this.currentGuess === 6;
  },
  get allGuesses() {
    return this.guesses.slice(0, this.currentGuess).join("").split("");
  },
  get exactGuesses() {
    return this.word.split("").filter((letter, i) => {
      return this.guesses
        .slice(0, this.currentGuess)
        .map((word) => word[i])
        .includes(letter);
    });
  },
  get inexactGuesses() {
    return this.word
      .split("")
      .filter((letter) => this.allGuesses.includes(letter));
  },
  init() {
    this.word = words[Math.round(Math.random() * words.length)];
    this.guesses.replace(new Array(6).fill(""));
    this.currentGuess = 0;
  },
  submitGuess() {
    if (words.includes(this.guesses[this.currentGuess])) {
      this.currentGuess += 1;
    }
  },
  handleKeyUp(e: any, pressedKey: string = "") {
    if (this.won || this.lost) {
      return;
    }
    if (e) {
      pressedKey = e.key;
    }
    if (pressedKey === "Enter") {
      return this.submitGuess();
    }
    if (pressedKey === "Backspace") {
      this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
        0,
        this.guesses[this.currentGuess].length - 1
      );
      return;
    }
    if (
      this.guesses[this.currentGuess].length < 5 &&
      pressedKey.match(/^[A-z]$/)
    ) {
      this.guesses[this.currentGuess] =
        this.guesses[this.currentGuess] + pressedKey.toLowerCase();
    }
  },
};
