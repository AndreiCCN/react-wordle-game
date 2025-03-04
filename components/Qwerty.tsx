import { observer } from "mobx-react-lite";

// @ts-ignore
export default observer(function Qwerty({ store }) {
  const qwerty = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

  return (
    <div>
      {qwerty.map((row, i) => (
        <div key={`keyboard-row-${i}`} className="flex justify-center">
          {row.split("").map((char, charIndex) => {
            const bgColor = store.exactGuesses.includes(char)
              ? "bg-green-400"
              : store.inexactGuesses.includes(char)
              ? "bg-yellow-400"
              : store.allGuesses.includes(char)
              ? "bg-gray-800"
              : "bg-gray-600";

            return (
              <div
                key={`keyboard-char-${charIndex}`}
                className={`${bgColor} w-10 h-10 flex justify-center items-center m-px rounded-xl uppercase text-white cursor-pointer`}
              >
                {char}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
});
