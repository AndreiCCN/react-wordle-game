import React from "react";

const Guess = ({ isGuessed, guess, word }) => {
  return (
    <>
      {new Array(5).fill(0).map((_, i) => {
        const bgColor = !isGuessed
          ? "bg-black"
          : guess[i] === word[i]
          ? "bg-green-400"
          : word.includes(guess[i])
          ? "bg-yellow-400"
          : "bg-gray-800";
        return (
          <div
            key={`guess-letter-${i}`}
            className={`${bgColor} w-16 h-16 flex justify-center items-center border rounded-xl border-gray-400 text-white font-bold uppercase`}
          >
            {guess[i]}
          </div>
        );
      })}
    </>
  );
};

export default Guess;
