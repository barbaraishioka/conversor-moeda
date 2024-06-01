document.addEventListener("DOMContentLoaded", () => {
  const fromCurrencySelect = document.querySelector("#fromCurrencySelect");
  const toCurrencySelect = document.querySelector("#toCurrencySelect");

  const amount = document.querySelector("#amount");
  const convertButton = document.querySelector("button");

  const fromCurrencyFlag = document.querySelector("#fromCurrencyFlag");
  const toCurrencyFlag = document.querySelector("#toCurrencyFlag");

  const fromCurrencyName = document.querySelector("#fromCurrencyName");
  const toCurrencyName = document.querySelector("#toCurrencyName");

  const fromCurrencyValue = document.querySelector("#fromCurrencyValue");
  const toCurrencyValue = document.querySelector("#toCurrencyValue");

  const rates = {
    BRL: { EUR: 0.18, GBP: 0.15, USD: 0.19 },
    USD: { BRL: 5.17, GBP: 0.78, EUR: 0.92 },
    EUR: { GBP: 0.85, USD: 1.09, BRL: 5.62 },
    GBP: { USD: 1.28, BRL: 6.6, EUR: 1.18 },
  }; // Exemplo: 1 BRL é igual a 0.15 BGP

  const currencyDetails = [
    {
      currency: "BRL",
      name: "Real Brasileiro",
      flag: "./img/real.png",
      symbol: "R$ ",
      language: "pt-BR",
    },
    {
      currency: "USD",
      name: "Dólar Americano",
      flag: "./img/dolar.png",
      symbol: "US$ ",
      language: "en-US",
    },
    {
      currency: "EUR",
      name: "Euro",
      flag: "./img/euro.png",
      symbol: "€ ",
      language: "pt-PT",
    },
    {
      currency: "GBP",
      name: "Libra Esterlina",
      flag: "./img/libra.png",
      symbol: "£ ",
      language: "en-GB",
    },
  ];

  function updateCurrencyDetails() {
    if (fromCurrencySelect.value === toCurrencySelect.value) {
      for (let option of toCurrencySelect.options) {
        if (option.value !== fromCurrencySelect.value) {
          toCurrencySelect.value = option.value;
          break;
        }
      }
    }

    for (let i = 0; i < currencyDetails.length; i++) {
      if (currencyDetails[i].currency === fromCurrencySelect.value) {
        fromCurrencyName.innerHTML = currencyDetails[i].name;
        fromCurrencyFlag.src = currencyDetails[i].flag;
      }
    }

    for (let i = 0; i < currencyDetails.length; i++) {
      if (currencyDetails[i].currency === toCurrencySelect.value) {
        toCurrencyName.innerHTML = currencyDetails[i].name;
        toCurrencyFlag.src = currencyDetails[i].flag;
      }
    }

    convertMoney();
  }

  function convertMoney() {
    const rate = rates[fromCurrencySelect.value][toCurrencySelect.value];
    const convertedValue = amount.value * rate;

    for (let i = 0; i < currencyDetails.length; i++) {
      if (currencyDetails[i].currency === fromCurrencySelect.value) {
        fromCurrencyValue.innerHTML = formatNumber(
          currencyDetails[i].language,
          fromCurrencySelect.value,
          amount.value
        );

        if (
          amount.value === "" ||
          isNaN(amount.value) ||
          amount.value === null
        ) {
          fromCurrencyValue.innerHTML = currencyDetails[i].symbol + "-";
        }
      }
    }

    for (let i = 0; i < currencyDetails.length; i++) {
      if (currencyDetails[i].currency === toCurrencySelect.value) {
        toCurrencyValue.innerHTML = formatNumber(
          currencyDetails[i].language,
          toCurrencySelect.value,
          convertedValue
        );

        if (
          amount.value === "" ||
          isNaN(amount.value) ||
          amount.value === null
        ) {
          toCurrencyValue.innerHTML = currencyDetails[i].symbol + "-";
        }
      }
    }
  }

  function formatNumber(language, currency, formatValue) {
    return new Intl.NumberFormat(language, {
      style: "currency",
      currency: currency,
    }).format(formatValue);
  }

  fromCurrencySelect.addEventListener("change", updateCurrencyDetails);
  toCurrencySelect.addEventListener("change", updateCurrencyDetails);
  amount.addEventListener("input", updateCurrencyDetails);
  convertButton.addEventListener("click", convertMoney);
});
