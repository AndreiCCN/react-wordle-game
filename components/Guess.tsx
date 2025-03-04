import React from "react";

// @ts-ignore
const Guess = ({ isGuessed, guess, word }) => {
  return (
    <div className="grid grid-cols-5 gap-2 mb-2">
      {new Array(5).fill(0).map((_, i) => {
        const bgColor = !isGuessed
          ? "bg-black"
          : guess[i] === word[i]
          ? "bg-green-400"
          : word.includes(guess[i])
          ? "bg-yellow-400"
          : "bg-black";
        return (
          <div
            key={`guess-letter-${i}`}
            className={`${bgColor} w-16 h-16 flex justify-center items-center border border-gray-400 text-white font-bold uppercase`}
          >
            {guess[i]}
          </div>
        );
      })}
    </div>
  );
};

export default Guess;
