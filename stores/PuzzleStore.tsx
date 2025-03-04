import words from "@/words.json";
export default {
  word: "",
  guesses: [],
  currentGuess: 0,
  get won() {
    return this.guesses[this.currentGuess - 1] === this.word;
  },
  get lost() {
    return this.currentGuess === 6;
  },
  init() {
    this.word = words[Math.round(Math.random() * words.length)];
    // @ts-ignore
    this.guesses.replace(new Array(6).fill(""));
    this.currentGuess = 0;
  },
  submitGuess() {
    if (words.includes(this.guesses[this.currentGuess])) {
      this.currentGuess += 1;
    }
  },
  handleKeyUp(e: any) {
    if (this.won || this.lost) {
      return;
    }
    if (e.key === "Enter") {
      return this.submitGuess();
    }
    if (e.key === "Backspace") {
      // @ts-ignore
      this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
        0,
        // @ts-ignore
        this.guesses[this.currentGuess].length - 1
      );
      return;
    }
    // @ts-ignore
    if (this.guesses[this.currentGuess].length < 5 && e.key.match(/^[A-z]$/)) {
      // @ts-ignore
      this.guesses[this.currentGuess] =
        this.guesses[this.currentGuess] + e.key.toLowerCase();
    }
  },
};
