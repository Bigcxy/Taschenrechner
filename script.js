let history = document.querySelector(".history");
let display = document.querySelector(".display");
let button = document.querySelectorAll(".ZahlenButton");
let kommabutton = document.querySelector(".kommabutton");
let switchbutton = document.querySelector(".switchbutton");
let deleteButton = document.querySelector("#deleteButton");
let deleteAll = document.querySelector("#deleteAll");
let prozent = document.querySelector("#prozentButton");
let plus = document.querySelector("#plus");
let minus = document.querySelector("#minus");
let geteilt = document.querySelector("#geteilt");
let mal = document.querySelector("#mal");
let ergibt = document.querySelector("#ergibt");
let fullZahl = "";
let firstZahle = "";
let secondZahl = "";
let rechenzeichen = "";
let ergebniss = "";
let isProzentFirstZahl = false;
let isProzentSecondZahl = false;



for(let i = 0; i < button.length; i++) {
    let zahl = button[i].innerText;
    button[i].addEventListener("click", function() {
        if(rechenzeichen === "") {
            firstZahle = firstZahle + zahl
            UpdateDisplay();
        }
        else{
            secondZahl = secondZahl + zahl;
            UpdateDisplay();
        }
    });
}

kommabutton.addEventListener("click", function() {
    if(firstZahle.includes(".") === false) {
        if(rechenzeichen === "") {
            firstZahle = firstZahle + ".";
        }
        else {
            secondZahl = secondZahl + ".";
        }
        UpdateDisplay();
    }
});

switchbutton.addEventListener("click", function() {
    if(rechenzeichen === "") {
        if(firstZahle.startsWith("-")) {
            firstZahle = firstZahle.slice(1);
        }
        else {
            firstZahle = "-" + firstZahle;
        }
    }
    else {
        if(secondZahl.startsWith("-" ) ) {
            secondZahl = secondZahl.slice(1);
        }
        else {
            secondZahl = "-" + secondZahl;
        }
    }
    UpdateDisplay();
})

plus.addEventListener("click", function() {
    rechenzeichen = "+";
    UpdateDisplay();
});

minus.addEventListener("click", function() {
    rechenzeichen = "-";
    UpdateDisplay();
});

geteilt.addEventListener("click", function() {
    rechenzeichen = "÷";
    UpdateDisplay();
});

mal.addEventListener("click", function() {
    rechenzeichen = "×";
    UpdateDisplay();
})

ergibt.addEventListener("click", function rechenergebniss() {
    let number1 = Number(firstZahle);
    let number2 = Number(secondZahl);
    let show1 = firstZahle;
    let show2 = secondZahl;

    if(isProzentFirstZahl) {
        number1 = number1 / 100;
    }

    if(isProzentSecondZahl) {
        number2 = number2 / 100;
    }


    if(rechenzeichen === "+") {
        ergebniss = number1 + number2;
        Updateergebniss();
    }

    if(rechenzeichen === "-") {
        ergebniss = number1 - number2;
        Updateergebniss();
    } 

    if(rechenzeichen === "×") {
        ergebniss = number1 * number2;
        Updateergebniss();
    }

    if(rechenzeichen === "÷") {
        ergebniss = number1 / number2;
        Updateergebniss();
    }

    if(isProzentFirstZahl) {
        show1 = show1 + "%";
    }

    if(isProzentSecondZahl) {
        show2 = show2 + "%";
    }

    let neueRechnung = show1 + rechenzeichen + show2 + " = " + ergebniss;

   if (history.innerHTML === "") {
       history.innerHTML = neueRechnung;
    } else {
        history.innerHTML = history.innerHTML + "<br>" + neueRechnung;
    }

    firstZahle = String(ergebniss);
    secondZahl = "";
    rechenzeichen = "";

    UpdateDisplay();
});

function UpdateDisplay() {
    let show1 = firstZahle.replace(".", ",");
    let show2 = secondZahl.replace(".", ",");
    if(isProzentFirstZahl) {
        show1 = show1 + "%";
    }

    if(isProzentSecondZahl) {
        show2 = show2 + "%";
    }

    display.value = show1 + rechenzeichen + show2; 
}

function Updateergebniss() {
    display.value = ergebniss;
}

deleteButton.addEventListener("click", function() {
    if(secondZahl !== "") {
        secondZahl = secondZahl.slice(0, secondZahl.length - 1);
    }
    else if(rechenzeichen !== "") {
        rechenzeichen = "";
    }
    else {
        firstZahle = firstZahle.slice(0, firstZahle.length - 1);
    }
    
   UpdateDisplay();
});

deleteAll.addEventListener("click", function() {
    firstZahle = "";
    secondZahl = "";
    rechenzeichen = "";
    isProzentFirstZahl = false;
    isProzentSecondZahl = false;
    history.innerHTML = "";
    UpdateDisplay();
});

prozent.addEventListener("click", function() {
    if(secondZahl === "") {
        if(isProzentFirstZahl) {
        isProzentFirstZahl = false;
        }
        else {
           isProzentFirstZahl = true;
        }
    }
    else {
        if(isProzentSecondZahl) {
        isProzentSecondZahl = false;
    }
        else {
            isProzentSecondZahl = true;
        }
    }
    UpdateDisplay();
})

document.addEventListener("keydown", function(event) {
    if(event.key >= "0" && event.key <= "9") {
        if(rechenzeichen = "") {
            firstZahle = firstZahle + event.key;
        }
        else {
            secondZahl = secondZahl + event.key;
        }
    }

    if(event.key === "/") {
        rechenzeichen = "÷";
    }
    if(event.key === "*") {
        rechenzeichen = "×";
    }
    if(event.key === "+") {
        rechenzeichen = "+";
    }
    if(event.key === "-") {
        rechenzeichen = "-";
    }
    if(event.key === "Enter") {
        ergibt.click();
    }

    UpdateDisplay();
});

