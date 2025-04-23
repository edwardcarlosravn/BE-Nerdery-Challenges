const readline = require('readline');

const prompt = (message) => {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input : process.stdin,
            output : process.stdout
        });
        rl.question(message, (answer) => {
            rl.close();
            resolve(answer);
        })
    })
}
module.exports = {
    prompt
};