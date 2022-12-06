export default function useQuote() {
	const quotes = [
		"It's not how much we give, but how much love we put into giving.",
		"Always give without remembering and always receive without forgetting",
		"No one has ever become poor from giving",
		"Those who are happiest are those who do the most for others",
		"Help others without any reason and give without the expectation of receiving anything in return",
	];

	//get a random quotes from the array
	const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

	return {
		randomQuote,
	};
}
