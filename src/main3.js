const API_ENDPOINT = "https://restcountries.com/v3.1/all";

let i = 0;
let j = 0;
let flag = "";
let name = "";
let capital = [];
let continents = [];
let languageObject = "";
let language = {};
let population = "";
let currenciesObject = {};
let currencyName = "";
let currencySymbol = "";
let region = "";
const countryContainer = document.getElementById('country-container');

const displayCountries = (start, end) => {
    axios
    .get(API_ENDPOINT)
    .then((response) => {
      let countries = response.data;
      let countriesObject= countries.slice(start,end);
      createCountry(countriesObject);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
        console.log("Fetch successful!");
    });
};

document.addEventListener("DOMContentLoaded", displayCountries(200, 250));


const createCountry = (countriesObject)=>{
    for (let i = 0; i < countriesObject.length; i++) {
        flag = countriesObject[i].flags.png;
        name = countriesObject[i].name.common;
        capital = countriesObject[i].capital;
        continents = countriesObject[i].continents[0];
        population = countriesObject[i].population;
        languageObject = countriesObject[i].languages;
        for(l in languageObject){
            language = languageObject[l];
            break;
        }
        currenciesObject = countriesObject[i].currencies;
        for(cur in currenciesObject){
            currency = currenciesObject[cur];
            let {name, symbol} = currency;
            currencyName = name;
            currencySymbol = symbol;
            break;
        }
        region = countriesObject[i].region;

        console.log(`*** ${i+1} ***`);
        console.log(flag);
        console.log(name);
        console.log(capital);
        console.log(continents);
        console.log(population);
        console.log(language);
        console.log(currencyName);
        console.log(currencySymbol);
        console.log(region);
        console.log("-----------------------");
  
        let countryDiv = document.createElement("div");
        countryDiv.classList.add("a-country");

        let flagDiv = document.createElement("div");
        flagDiv.classList.add("flag-div");
        
        let flagImage = document.createElement("img");
        flagImage.setAttribute("src", flag);
        flagImage.setAttribute("alt", `The flag of ${name}`);
        flagDiv.appendChild(flagImage);
        
        let countryDetails = document.createElement("div");
        countryDetails.classList.add("country-details");
        
        let mainCountryDetailsDiv = document.createElement("div");
        mainCountryDetailsDiv.classList.add("main-details");
        
        let countryNameHeader = document.createElement("h2");
        countryNameHeader.innerHTML = name;

        let capitalDiv = document.createElement("div");
        capitalDiv.classList.add("capital");

        let capitalCityTitleParagraph = document.createElement("p");
        capitalCityTitleParagraph.innerHTML = "Capital:";

        let capitalCityNameHeader = document.createElement("h3");
        capitalCityNameHeader.innerHTML = capital;
        
        capitalDiv.appendChild(capitalCityTitleParagraph);
        capitalDiv.appendChild(capitalCityNameHeader);
        mainCountryDetailsDiv.appendChild(countryNameHeader);
        mainCountryDetailsDiv.appendChild(capitalDiv);

        let otherDetailsDiv = document.createElement("div");
        otherDetailsDiv.classList.add("other-details");
        let otherDetailsTable = document.createElement("table");
        
        let regionTableRow = document.createElement("tr");
        let regionTableHeader = document.createElement("th");
        regionTableHeader.innerHTML = "Region:";
        let regionTableData = document.createElement("td");
        regionTableData.innerHTML = region;
        regionTableRow.appendChild(regionTableHeader);
        regionTableRow.appendChild(regionTableData);

        let continentTableRow = document.createElement("tr");
        let continentTableHeader = document.createElement("th");
        continentTableHeader.innerHTML = "Continent:";
        let continentTableData = document.createElement("td");
        continentTableData.innerHTML = continents;
        continentTableRow.appendChild(continentTableHeader);
        continentTableRow.appendChild(continentTableData);

        let populationTableRow = document.createElement("tr");
        let populationTableHeader = document.createElement("th");
        populationTableHeader.innerHTML = "Population";
        let populationTableData = document.createElement("td");
        populationTableData.innerHTML = population;
        populationTableRow.appendChild(populationTableHeader);
        populationTableRow.appendChild(populationTableData);

        let currencyNameTableRow = document.createElement("tr");
        let currencyNameTableHeader = document.createElement("th");
        currencyNameTableHeader.innerHTML = "Currency Name:"
        let currencyNameTableData = document.createElement("td");
        currencyNameTableData.innerHTML = currencyName;
        currencyNameTableRow.appendChild(currencyNameTableHeader);
        currencyNameTableRow.appendChild(currencyNameTableData);

        let currencySymbolTableRow = document.createElement("tr");
        let currencySymbolTableHeader = document.createElement("th");
        currencySymbolTableHeader.innerHTML = "Currency Symbol:";
        let currencySymbolTableData = document.createElement("td");
        currencySymbolTableData.innerHTML = currencySymbol;
        currencySymbolTableRow.appendChild(currencySymbolTableHeader);
        currencySymbolTableRow.appendChild(currencySymbolTableData);

        let mainLanguageTableRow = document.createElement("tr");
        let mainLanguageTableHeader = document.createElement("th");
        mainLanguageTableHeader.innerHTML = "Language:"
        let mainLanguageTableData = document.createElement("td");
        mainLanguageTableData.innerHTML = language;
        mainLanguageTableRow.appendChild(mainLanguageTableHeader);
        mainLanguageTableRow.appendChild(mainLanguageTableData);


        otherDetailsTable.appendChild(regionTableRow);
        otherDetailsTable.appendChild(continentTableRow);
        otherDetailsTable.appendChild(populationTableRow);
        otherDetailsTable.appendChild(currencyNameTableRow);
        otherDetailsTable.appendChild(currencySymbolTableRow);
        otherDetailsTable.appendChild(mainLanguageTableRow);

        otherDetailsDiv.appendChild(otherDetailsTable);
        
        countryDetails.appendChild(mainCountryDetailsDiv);
        countryDetails.appendChild(otherDetailsDiv);
        
        countryDiv.appendChild(flagDiv);
        countryDiv.appendChild(countryDetails);

        countryContainer.appendChild(countryDiv);
    }
}
