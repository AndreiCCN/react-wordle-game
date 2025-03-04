"use client";

import React, { useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import PuzzleStore from "@/stores/PuzzleStore";
import Guess from "@/components/Guess";
import Qwerty from "@/components/Qwerty";

export default observer(function Home() {
  const store = useLocalObservable(() => PuzzleStore);
  useEffect(() => {
    store.init();

    window.addEventListener("keyup", store.handleKeyUp);

    return () => {
      window.removeEventListener("keyup", store.handleKeyUp);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl fontbold uppercase text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-green-400">
        Wordle
      </h1>
      {store.guesses.map((_, i) => (
        <Guess
          key={`guess-element-${i}`}
          word={store.word}
          guess={store.guesses[i]}
          isGuessed={i < store.currentGuess}
        />
      ))}
      {/* @ts-ignore */}
      <Qwerty store={store} />
    </div>
  );
});
