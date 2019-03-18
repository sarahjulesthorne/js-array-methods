/*This project was a class session regarding JS array methods. We learned about:
push/unshift/splice: We used these methods to build up an array of passengers on the struggleBus.
pop/unshift: we used these methods to remove passengers from the bus.
forEach: We used this alternate form of a for loop to iterate over the struggleBus array and test to see which passengers could afford the busfare.
 */
//Empty array for holding objects to be inserted using various array methods throughout this project
const struggleBus = [

];

/*Function passes objects into the struggleBus array above by:
Building Object to be passed into array, using arguments as the values in the key-value pairs.
Using conditionals to select where in the array the new object should be inserted.
Using various array methods or in one case calling a second function to insert the objects into the array.*/
const addPassenger = (name, wallet, isStruggling, seat) => {
    const passenger = {
        name: name,
        wallet: wallet,
        isStruggling: isStruggling,

    }
    if (seat === 'back') {
        struggleBus.push(passenger);
    } else if (seat === 'front') {
        struggleBus.unshift(passenger);
    } else if (seat === 'middle') {
        addInMiddle(struggleBus, passenger);
    }
};

//Function uses conditionals to select where in the array an object should be removed, and removes it/returns that object using various array methods.
const removePassenger = (bus, seat) => {
    //removes passenger and returns their object
    if (seat === 'front') {
        return bus.shift();
    } else if (seat === 'back') {
        return bus.pop();
    }
};

/*Function splices object into middle of array by:
Using math to determine whether the array has an odd or even number of items.
Using math to determine the desired index at which to splice.
Calling the splice method to insert a variable at the designated index into the selected array.*/
const addInMiddle = (bus, passenger) => {
    let middleIndex;
    if (bus.length / 2 === 0) {
        middleIndex = (bus.length / 2) + 1;
    } else {
        middleIndex = ((bus.length - 1) / 2) + 1;
    }
    bus.splice(middleIndex, 0, passenger);
};
//console.log(struggleBus);

//Basic print function which selects the container on the HTML page to which to print and prints the designated variable to that element.
const printToDom = (divId, textToPrint) => {
    const selectedDiv = document.getElementById(divId);
    selectedDiv.innerHTML = textToPrint;
};

//string-builder function which loops over the designated array to form HTML cards and prints them to the page.
const buildDomString = (bus) => {
    let domString = '';
    for (let i = 0; i < bus.length; i++) {
        domString += `<div class='passenger-card'>`;
        domString += `<h3>`;
        domString += `${bus[i].name}`;
        domString += `</h3>`;
        domString += `<p>They have $${bus[i].wallet} in their wallet.</p>`;
        domString += `<p>It is ${bus[i].isStruggling} that they are struggling.</p>`;
        domString += `</div>`;
    }
    printToDom('arrayMethodsContainer', domString);
};
const allAboard = (bus) => {
    //This function will loop over the passengers and test whether they have enough to pay for the busFare
    const busFare = 55;
    const validPassengers = [];
    bus.forEach((passenger) => {
        if (passenger.wallet >= busFare) {
            passenger.wallet -= busFare;
            validPassengers.push(passenger);
        }
    });
    return validPassengers;
};

//initialize function which calls other functions on page load
const init = () => {
    addPassenger('Crom', 47, true, 'back');
    addPassenger('Percey', 30, false, 'front');
    addPassenger('Lillah', 777, true, 'back');
    addPassenger('Surija', 373, false, 'front');
    addPassenger('Zoe', 1000, true, 'back');
    addPassenger('Hell', 55, false, 'front');
    addPassenger('Light', 77, false, 'middle');
    //const firstPassenger = removePassenger(struggleBus, 'front');
    //const lastPassenger = removePassenger(struggleBus, 'back');
    //console.log('arrayMethodsContainer', firstPassenger);

    buildDomString(allAboard(struggleBus));
};
init();