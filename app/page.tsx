"use client";

import React, { useEffect, useState } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import PuzzleStore from "@/stores/PuzzleStore";
import Guess from "@/components/Guess";
import Qwerty from "@/components/Qwerty";
import Delayed from "@/components/Delayed";

export default observer(function Home() {
  const store = useLocalObservable(() => PuzzleStore);
  const [resultOpacity, setResultOpacity] = useState(0);

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
      {(store.won || store.lost) && (
        <Delayed resultOpacityHandler={setResultOpacity} waitBeforeShow={1000}>
          <div
            className={`opacity-${resultOpacity} absolute w-full h-full top-0 right-0 flex justify-center items-center bg-gray-800/75 transition duration-300 ease-in-out`}
          >
            <div className="w-[40%] flex flex-col justify-between items-center gap-12 p-10 rounded-xl bg-gray-600 uppercase">
              <h1 className={`text-5xl ${headingStyle}`}>
                {store.won && "Challenge Complete !"}
                {store.lost && "Challenge Unfinished !"}
              </h1>
              <p className={`text-3xl ${headingStyle}`}>
                Given Word: {store.word}
              </p>
              {store.won && (
                <p className={`text-3xl ${headingStyle}`}>
                  Total Guesses:{" "}
                  {store.guesses.filter((el) => el !== "").length}
                </p>
              )}
              <button
                onClick={store.init}
                className="p-5 rounded-xl text-xl font-bold text-gray-800 bg-gradient-to-br from-blue-400 to-green-400 cursor-pointer hover:from-green-400 hover:to-blue-400 transition duration-300 ease-in-out"
              >
                {store.won && "Play Again"}
                {store.lost && "Try Again"}
              </button>
            </div>
          </div>
        </Delayed>
      )}
      {/* @ts-expect-error: Should expect store */}
      <Qwerty store={store} />
    </div>
  );
});
