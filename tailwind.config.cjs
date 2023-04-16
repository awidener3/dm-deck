/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				draconis: ['Draconis', 'Asul', 'sans-serif'],
			},
			backgroundImage: {
				'back-1': "url('/src/assets/images/card_backs/back_1.jpg')",
				'back-2': "url('/src/assets/images/card_backs/back_2.jpg')",
				'back-3': "url('/src/assets/images/card_backs/back_3.jpg')",
				'back-4': "url('/src/assets/images/card_backs/back_4.jpg')",
				'back-5': "url('/src/assets/images/card_backs/back_5.jpg')",
				'back-6': "url('/src/assets/images/card_backs/back_6.jpg')",
				'back-7': "url('/src/assets/images/card_backs/back_7.jpg')",
				'back-8': "url('/src/assets/images/card_backs/back_8.jpg')",
				'back-9': "url('/src/assets/images/card_backs/back_9.jpg')",
				'back-10': "url('/src/assets/images/card_backs/back_10.jpg')",
				'back-11': "url('/src/assets/images/card_backs/back_11.jpg')",
				'back-12': "url('/src/assets/images/card_backs/back_12.jpg')",
				'back-13': "url('/src/assets/images/card_backs/back_13.jpg')",
				'back-14': "url('/src/assets/images/card_backs/back_14.jpg')",
				'back-15': "url('/src/assets/images/card_backs/back_15.jpg')",
				'back-16': "url('/src/assets/images/card_backs/back_16.jpg')",
				'back-17': "url('/src/assets/images/card_backs/back_17.jpg')",
			},
		},
	},
	plugins: [],
};
