const history = require('./db');

function monthlMileages(data) {
    let mileageArr = [];
    let realAnnual = [];
    data.map((e) => {
        // if (e.data.passed) {
        mileageArr.push(e.data.mileage)
        // };
    });
    for (let i = 0; i < mileageArr.length - 1; i++) {
        realAnnual.push(mileageArr[i] - mileageArr[i + 1])
    };
    return realAnnual;
}

function annualMileage(real) {
    let res = Math.round(real.reduce((a, b) => {
        return a + b;
    }) / real.length);
    return res;
}

function currentMileage(recent, annual) {
    dateFix(history);
    let perMonth = Math.round(annual / 12);
    let diff = (new Date().getMonth() + 1) - (new Date(history[0].date).getMonth() + 1);
    return perMonth * diff + recent;

}

function main() {
    let mostRecent = history[0].data.mileage;
    let monthlMileage = monthlMileages(history);
    let realAnnualmileage = annualMileage(monthlMileage);
    let currentMil = currentMileage(mostRecent, realAnnualmileage);
    console.log(`The average annual mileage: ${realAnnualmileage} \nThe current mileage: ${currentMil}`);
    return;
}

main();

function dateFix(data) {
    data.map((e) => {
        e.date = e
            .date
            .slice(0, 5) + '0' + e
            .date
            .slice(5);
    })
}
