import { LitElement, html } from "lit";

// EXERCISE 1
/**
 * @typedef {'Western Cape' | 'Gauteng' | 'Northern Cape' | 'Eastern Cape' | 'KwaZulu-Natal' |
 *  'Free State'} Provinces
 */

/**
 * @typedef {'Ashwin' | 'Sibongile' | 'Jan-Hendrik' | 'Sifso' | 'Shailen' | 'Frikkie'} Names
 */

/**
 * @type {Array<Provinces>}
 */
const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal',
    'Free State'];

/**
 * @type {Array<Names>}
 */
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie'];

//Using forEach() to log each name to the console
const eachName = [];

names.forEach((item) => eachName.push(item));

console.log(eachName);

//Using forEach() to log each name with a matching province
const provinceAndName = []
// names.forEach((item) => {
//     const result = provinces.forEach((eachProvince) => {
//         return `${item}: ${eachProvince}`
//     })
//     return provinceAndName.push(result)
// })
// console.log(provinceAndName)
names.forEach((item, index) => {
    return provinceAndName.push(`${item}: ${provinces[index]}`)
    console.log(item)
    console.log(index)
})

console.log(provinceAndName)

//Mapping over all province names and turning them to uppercase
const uppercaseProvinces = [];

provinces.map((item) => {
    return uppercaseProvinces.push(item.toUpperCase());
});

console.log(uppercaseProvinces);

//Creating a new array with map() that has the same amount of characters in each name
const nameLetterAmount = [];

names.map((item) => {
    return nameLetterAmount.push(item.length);
});

console.log(nameLetterAmount);

//Using toSorted() to sort all provinces alphabetically
const provincesAscending = []

provincesAscending.push(provinces.sort()); //says toSorted() does not exist

console.log(provincesAscending);

//Filtering all the provinces that have the word 'Cape' in them
const noCape = provinces.filter((item) => (!item.includes('Cape'))).length;
console.log(noCape);


/**
 * Create a boolean array by using map() and some() to determine whether a name contains an 'S' 
 * character
 * @type {Array} 
 */
const containsS = [];
/**
 * - needs to loop over each item and then check each one for an 's', and then 
 * log that result to the array
 * @type {boolean}
 */
const ifContainsS = names.map(person => person.split('').some((char => char.includes('S'))))

containsS.push(ifContainsS)
console.log(containsS)

/**
 * Using reduce(), turn the two given arrays {@link Provinces} and {@link Names} into an 
 * object that indicates the province of an individual
 * 
 * (the accumulator , which is the empty object, takes every person in names and sets it as the key,
 * and then takes each province with the corresponding index of each name, and sets it as the key's
 *  value )
 */
const createObject = names.reduce((accumulator, person, index) => 
    {accumulator[person] = provinces[index];
    return accumulator;
}, {})

console.log(createObject)


// EXERCISE 2
/**
 * @typedef {Array<object>} Products
 */
/**
 * @type {Products}
 */
const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
]

//Using forEach() to console.log() each product name to the console
console.log(products.forEach((item) => {
    console.log(item.product) 
}))

//Using filter() to filter out products that have a name longer than 5 characters
console.log( products.filter((item) => {
        const checkNameLength = item.product.length > 5 
        return checkNameLength;
        }
    )
)

/**
 * - Use both filter() and map() to convert all prices that are strings to numbers, and remove
 * all products from that array that do not have prices. 
 * - After this has been done, then use reduce() to calculate the combined price of all remaining 
 * products
 */
console.log(
    

)