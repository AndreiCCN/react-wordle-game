const Guess = ({ isGuessed, guess, word }) => {
  return (
    <>
      {new Array(5).fill(0).map((_, i) => {
        const bgColor = !isGuessed
          ? "bg-black opacity-100"
          : guess[i] === word[i]
          ? "bg-green-400 opacity-100"
          : word.includes(guess[i])
          ? "bg-yellow-400 opacity-100"
          : "bg-gray-800 opacity-100";
        return (
          <div
            key={`guess-letter-${i}`}
            className={`${bgColor} opacity-0 transition duration-300 ease-in-out`}
          >
            <div
              className={`w-16 h-16 flex justify-center items-center border rounded-xl border-gray-400 text-white font-bold uppercase`}
            >
              {guess[i]}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Guess;
