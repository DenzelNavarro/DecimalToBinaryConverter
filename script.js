const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");
const animationData = [
  {
    inputVal: 5,
    addElDelay: 1000,
    msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.',
    showMsgDelay: 15000,
    removeElDelay: 20000,
  },
  {
    inputVal: 2,
    addElDelay: 1500,
    msg: 'decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 10000,
    removeElDelay: 15000,
  },
  {
    inputVal: 1,
    addElDelay: 2000,
    msg: "decimalToBinary(1) returns '1' (base case) and gives that value to the stack below. Then it pops off the stack.",
    showMsgDelay: 5000,
    removeElDelay: 10000,
  }
];

/* Recursion Function: decimalToBinary()

Base Case: if (input === 0 || input === 1). 
If the input is 0 or 1, the function returns that value as a string, 
since those are the simplest cases in binary (0 and 1 are themselves).

Recursive Case: The recursive call reduces the problem by dividing the input by 2 (Math.floor(input / 2)), 
which moves toward the base case. The remainder of that division (input % 2) is concatenated to the binary string. 
This continues until the base case is reached.
*/
const decimalToBinary = (input) => {
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

/* Animation Function: showAnimation()
This function controls the animation of the recursion process:

-Adding Elements: setTimeout() is used to delay adding an element representing each recursive call (decimalToBinary(5), decimalToBinary(2), etc.).
-Updating Messages: After a delay, the text inside the element is updated to display the message explaining what’s happening at that stage of the recursion.
-Removing Elements: Finally, after another delay, the element is removed, simulating the "popping" off of the recursion stack as the function returns.
*/
const showAnimation = () => {
  result.innerText = "Call Stack Animation";

  animationData.forEach((obj) => {
    setTimeout(() => {
      animationContainer.innerHTML += `
        <p id="${obj.inputVal}" class="animation-frame">
          decimalToBinary(${obj.inputVal})
        </p>
      `;
    }, obj.addElDelay);

    setTimeout(() => {
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);

    setTimeout(() => {
      document.getElementById(obj.inputVal).remove();
    }, obj.removeElDelay);
  });

  setTimeout(() => {
    result.textContent = decimalToBinary(5)
}, 20000);
};

/* Input Validation and Logic: checkUserInput()
This function handles user input:

-It validates whether the input is a valid number and ensures it’s greater than or equal to 0.
-If the input is 5, it calls the showAnimation() function to trigger the visual explanation of recursion. 
Otherwise, it directly shows the binary result by calling decimalToBinary().
*/
const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);

  if (!numberInput.value || isNaN(inputInt) || inputInt < 0) {
    alert("Please provide a decimal number greater than or equal to 0");
    return;
  }

  if (inputInt === 5) {
    showAnimation();
    return;
  }

  result.textContent = decimalToBinary(inputInt);
  numberInput.value = "";
};

/* EVENT LISTENERS */
convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
