import React, { useCallback, useEffect, useRef, useState } from "react";

function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [disabledv, setDisabled] = useState(false); // State to track disabled status
  const [showReset, setShowReset] = useState(false); // State to manage Reset button visibility
  const [hasCopied, setHasCopied] = useState(false); // State to track if changes were made

  const passwordRef = useRef(null);

  // Function to generate password
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  // Function to copy password to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    setDisabled(true); // Disable checkboxes and range
    setShowReset(true); // Show Reset button when copy is clicked
    setHasCopied(true); // Set changes made to true

    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, 999);
      window.navigator.clipboard.writeText(password);
    }
  }, [password]);

  // Function to reset the disabled elements and hide Reset button
  const resetSettings = () => {
    setDisabled(false); // Enable checkboxes and range
    setShowReset(false); // Hide Reset button
    setHasCopied(false); // Reset changes made
  };

  // Handle the browser's unload or reload event
  useEffect(() => {
    if (hasCopied) {
      window.onbeforeunload = (event) => {
        event.preventDefault(); // Prevent default unload action
        event.returnValue = ""; // Chrome requires returnValue to be set
      };
    } else {
      window.onbeforeunload = null; // Remove the event listener if no changes
    }

    return () => {
      window.onbeforeunload = null; // Clean up on component unmount
    };
  }, [hasCopied]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      
      {/* Password Display and Control Buttons */}
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          className="outline-none w-full py-1 px-3"
          value={password}
          ref={passwordRef}
          placeholder="Password"
          readOnly
        />
        <button
          onClick={copyPasswordToClipboard}
          className={`outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 ${
            disabledv ? "cursor-not-allowed" : ""
          }`}
          disabled={disabledv}
        >
          Copy
        </button>
        
        {/* Reset Button with Conditional Display */}
        {showReset && (
          <button
            onClick={resetSettings}
            className="outline-none bg-red-500 text-white px-3 py-0.5 shrink-0 ml-2"
          >
            Reset
          </button>
        )}
      </div>

      {/* Options and Length Slider */}
      <div className="flex text-sm gap-x-2">
        {/* Length Slider */}
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            id="range"
            min={6}
            max={100}
            value={length}
            disabled={disabledv}
            onChange={(e) => setLength(Number(e.target.value))}
            className="cursor-pointer"
          />
          <label>Length: {length}</label>
        </div>

        {/* Checkbox for Numbers */}
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberAllowed}
            disabled={disabledv}
            onChange={() => setNumberAllowed((prev) => !prev)}
            id="numberInput"
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        {/* Checkbox for Special Characters */}
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={charAllowed}
            disabled={disabledv}
            onChange={() => setCharAllowed((prev) => !prev)}
            id="characterInput"
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
