module.exports = {
    name: 'Mathematics',
    description: 'Basic Calculations',
    match: (input) => {
        return input.toLowerCase().startsWith('calc');
    },
    execute: (input) => {
        try {
            // Contoh input: "calc 50 * 2"
            const expression = input.substring(4).trim();
            // Hati-hati dengan eval, tapi aman untuk demo lokal user sendiri
            const result = eval(expression); 
            return `[MATH RESULT]: ${result}`;
        } catch (e) {
            return "[MATH ERROR]: Invalid calculation.";
        }
    }
};
