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

    window.addEventListener("keyup", (e) => store.handleKeyUp(e));

    return () => {
      window.removeEventListener("keyup", (e) => store.handleKeyUp(e));
    };
  }, []);

  const headingStyle =
    "font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-green-400";

  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center p-8">
      <div className="flex flex-col gap-2 text-center bg-gray-600 py-8 px-20 rounded-[50px]">
        <h1 className={`text-5xl uppercase ${headingStyle}`}>Re - Wordle</h1>
        <h2 className={`text-2xl ${headingStyle}`}>React Wordle Game</h2>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {store.guesses.map((_, i) => (
          <Guess
            key={`guess-element-${i}`}
            word={store.word}
            guess={store.guesses[i]}
            isGuessed={i < store.currentGuess}
          />
        ))}
      </div>
      {/* @ts-expect-error: Should expect store */}
      <Qwerty store={store} />
    </div>
  );
});
