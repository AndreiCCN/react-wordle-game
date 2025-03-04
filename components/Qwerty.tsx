import { observer } from "mobx-react-lite";

// @ts-expect-error: Should expect store
export default observer(function Qwerty({ store }) {
  const qwerty = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  const buttonStyle =
    "flex justify-center items-center rounded-xl uppercase text-xl font-bold text-white cursor-pointer hover:bg-gray-400";

  return (
    <div className="flex flex-col gap-2">
      {qwerty.map((row, i) => (
        <div key={`keyboard-row-${i}`} className="flex justify-center gap-2">
          {i === 2 && (
            <div
              className={`w-32 h-16 ${buttonStyle} bg-gray-600`}
              onClick={() => store.handleKeyUp(false, "Backspace")}
            >
              <svg width="32" height="32" fill="#ffffff" viewBox="0 0 16 16">
                <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
                <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
              </svg>
            </div>
          )}
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
                onClick={() => store.handleKeyUp(false, char)}
                className={`w-16 h-16 ${buttonStyle} ${bgColor}`}
              >
                {char}
              </div>
            );
          })}
          {i === 2 && (
            <div
              className={`w-32 h-16 ${buttonStyle} bg-gray-600`}
              onClick={() => store.handleKeyUp(false, "Enter")}
            >
              Enter
            </div>
          )}
        </div>
      ))}
    </div>
  );
});
