// PASSWORD GENERATOR

// Character Generator Functions

// function accepts a string value as an argument and return a random index number from the string argument
    function randomIndex(str){
        return Math.floor (Math.random() * str.length);
    }

        // Example of the randomIndex Function
            // console.log(randomIndex('Chicken')); // Generate random whole number from 0 to 6.



// function that returns a random lowercase letter using a random index in the letter string
    function getRandomLower() {
        const letters = `abcdefghijklmnopqrstuvwxyz`;
            // Returning a random letter using a random index in the "letters" string
            return letters [randomIndex(letters)];
    }

        // Example of the randomIndex Function
            // console.log(getRandomLower()); // Random lowercase letter



// function that returns a random uppercase letter
    function getRandomUpper() {
        // Running the getRandomLower function to create a random lowercase letter and setting that value to the "letter" variable
        const letter = getRandomLower();
            // Changing the random lowercase letter to an uppercase letter and returning it from the function
            return letter.toUpperCase();
    }
        // Example of getRandomUpper function
            // console.log(getRandomUpper()); // Random uppercase letter



// function that returns a random number (AKA random number as a string value)
    function getRandomNumber() {
        const numbers = `0123456789`;
            //Returning a random number using a random index from the "numbers" string
            return numbers[randomIndex(numbers)];
    }
        // Example of the getRandomNumber function
            //console.log(getRandomNumber()); // Random number from the "numbers" string



// Function that returns a random symbol
    function getRandomSymbol() {
        const symbol = `!@#$%^&*?`;
            // Returning a random symbol using a random index from the "symbols" string
            return symbol [randomIndex(symbol)];
    }

        // Example of the getRandomSymbol function
            //console.log(getRandomSymbol()); // Random symbol from the "Symbols" string



// Object to store all the characters generator functions
    const randomFunctions = {
        lower: getRandomLower,
        upper: getRandomUpper,
        number: getRandomNumber,
        symbol: getRandomSymbol
    };



// Selecting the DOM Elements
    const resultEl = document.querySelector(`#result`);
    const clipboardEl = document.querySelector(`#clipboard`);
    const lowercaseEl = document.querySelector(`#lowercase`);
    const uppercaseEl = document.querySelector(`#uppercase`);
    const numbersEl = document.querySelector(`#numbers`);
    const symbolsEl = document.querySelector(`#symbols`);
    const lengthEl = document.querySelector(`#length`);
    const generateEl = document.querySelector(`#generate`);



// Generate Password Function (Function that accepts true or false values as well as a number as an argument)
// NOTE: The Checkbox inputs and number (AKA Length) inputs will determine the values/arguments entered into this function
    function generatePassword(lower, upper, number, symbol, length){
        //console.log(lower, upper, number, symbol, length);

        // 1. Create The Password Variable
            let generatedPassword = ``;


        // 2. Filer Out Unchecked Options
            // True and False Values can be added together (True = 1) (false = 0)
            // NOTE: The values set to the typesCount variable will be used when building out the password
                const typesCount = lower + upper + number + symbol;
                //console.log(typesCount);

            // If the user has not selected any of the four options, then the alert will be displayed and an empty string will be returned from the function so the password displays to the user will be any empty string (AKA Nothing)
                if (typesCount === 0){
                    alert(`Please select at least one option`)
                    // the RETURN keyword stops/ends the execution of a function (AKA does not run any of the lines of code tha follow the return in the function)
                    return ``;
                }

            // Creating an array of arrays. The first item in each nested array holds the value of a string that will be used to access a function in the randomFunctions object. Also, the second items in each nested array are of teh values passed into this generatedPassword function
                let typesArr = [
                    [`lower`, lower],
                    [`upper`, upper],
                    [`number`, number],
                    [`symbol`, symbol]
                ];
                //console.log(typesArr);
            
            // The filter method creates a new array with all the items that "pass the test" implemented by the provided function (AKA all the items that cause the function to return a boolean value of true when the function is run using the item as the argument for the item parameter in this example)
            
                //Checking if the value for index of 1 in each item (AKA Array) in the typesArr array is true of false. Also, removing the item from the typesArr array if it is false.
                    typesArr = typesArr.filter(item => {
                        console.log(item[1]);
                        return item[1];
                    });
                    //console.log(typesArr);
        
        
        // 3. Loop over the length and call the generator function for each checked option
            //Building password with a for loop
            //Note: The Value for "length" is the value entered/selected for the length number input
                for (i = 0; i < length; i += typesCount){
                    //One of the items in the updated/filtered version of the typesArr Array will be the value/argument passed in for the types parameter each time the anonymous arrow function is run
                        typesArr.forEach(type => {
                            const funcName = type[0];
                                //console.log(funcName);
                        // Accessing and running/executing a function in the randomFunctions object. Also, concatenating/adding the value returned from the accessed function to the generatedPassword string variable
                            generatedPassword += randomFunctions[funcName]();
                                //console.log(generatedPassword);
                        });
                }


        // 4. Add Generated Password to the Final Password and return it out of the function
            
            // Removing extra characters if necessary (The above loop will create a password that may NOT match the length selected if that length is NOT a multiple of the number of options/checkboxes selected)
                const finalPassword = generatedPassword.slice(0, length);
                    // console.log(finalPassword);

                    return finalPassword;
    }



// EXAMPLE of the generatePassword function
    
    // Note: Using the starting value for when the page first loads
        // console.log(generatePassword(true, true, true, true, 10));

    // Event listener for when the "Generate Password" Button is clicked
        generateEl.addEventListener(`click`, () => {
            // Checking if the following options/checkboxes are selected/checked and the true/false values to the respective variables
                const hasLower = lowercaseEl.checked;
                const hasUpper = uppercaseEl.checked;
                const hasNumber = numbersEl.checked;
                const hasSymbol = symbolsEl.checked;
            
            // Accessing the value for the number input and changing the value from a string to a number
            
            // Note: the Value returned from a number input is a string value

                const length = parseInt(lengthEl.value);

                    //console.log(hasLower, hasUpper, hasNumber, hasSymbol, length);
            
            // The generatePassword function takes the true/false values determined by the checkboxes as well as the number from the number input as arguments and returns a string (AKA the Password) which is set as the innerText value for the "result" (AKA Span) Element
                resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);

        });

// Copy Password
    clipboardEl.addEventListener(`click`, () => {
        const textarea = document.createElement(`textarea`);
        const password = resultEl.innerText;
        const body = document.querySelector(`body`);
    
        if (password === ``){
            alert(`Please generate a password first`);
            return;
        }
    
        textarea.value = password;
    
        body.append(textarea);
        textarea.select();
        document.execCommand(`copy`);
        textarea.remove();
    
        alert(`Password has been copied to the clipboard`);
    })
        
    