
const rent = 400;
const tax = '12%';
const food = 51.7501;
const salary = 800;
const transport = 10.2;
const hourOfDay = 00;
const minuteOfDay = 00;

// Only change below this line

const calcBalance = () => {
	if(hourOfDay === 00 && minuteOfDay === 00){
		parseInt(tax)
		console.log(tax)
		const taxAsDecimal = tax / 100
		const startingAfterTax = salary - taxAsDecimal
		const cost = rent + tax + food
		const balance = startingAfterTax - cost		
		console.log('R' + balance.toFixed(2))

	}	
}

calcBalance()