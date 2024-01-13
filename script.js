let api= 'https://v6.exchangerate-api.com/v6/5fda3e36c94f21bf08f51c57/latest/USD';
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");

// Create dropdown from the currencies array
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    fromDropDown.add(option);
});

//Repeat same thing for the other dropdown
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    toDropDown.add(option);
});


// Select default values
fromDropDown.value = "USD";
toDropDown.value = "INR";

let convertCurrency = () => {
    // Create References
    const amount = document.querySelector("#amount").value;
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;
   

//If amount input field is not empty
  if (amount.length != 0) {
    fetch(api)
      .then((resp) => resp.json())
      .then((data) => {
        let fromExchangeRate = data.conversion_rates[fromCurrency];
        let toExchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
          2)} ${toCurrency}`;
      });
  } else {
    alert("Please fill in the amount");
  }
  dropdown[i].addEventListener("change", e =>{
    loadFlag(e.target);
  })
};

function loadFlag(element) {
    for (const code in currencies) {
        if (currencies[code] == element.value) {
            const imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${currencies[code]}/flat/64.png`;
        }
    }
}

document
  .querySelector("#convert-button")
  .addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);