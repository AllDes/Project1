

let money, time,
    firstStartHTML = document.getElementById("start"),
    budgetHTML = document.getElementsByClassName("budget-value")[0],
    daybudgetHTML = document.getElementsByClassName("daybudget-value")[0],
    levelHTML = document.getElementsByClassName("level-value")[0],
    expensesHTML = document.getElementsByClassName("expenses-value")[0],
    optionalexpensesHTML = document.getElementsByClassName("optionalexpenses-value")[0],
    incomeHTML = document.getElementsByClassName("income-value")[0],
    monthsavingsHTML = document.getElementsByClassName("monthsavings-value")[0],
    yearsavingsHTML = document.getElementsByClassName("yearsavings-value")[0],
    expensesItemsHTML = document.getElementsByClassName("expenses-item"),
    approve1HTML = document.getElementsByTagName("button")[0],
    approve2HTML = document.getElementsByTagName("button")[1],
    calculateHTML = document.getElementsByTagName("button")[2],
    optionalExpensesItemHTML = document.querySelectorAll(".optionalexpenses-item"),
    countBudgetHTML = document.querySelector(".count-budget"),
    chooseIncomeHTML = document.querySelector(".choose-income"),
    checkSavingsHTML = document.querySelector("#savings"),
    sumHTML = document.querySelector(".sum"),
    chooseSumHTML = document.querySelector(".choose-sum"),
    percentHTML = document.querySelector(".percent"),
    choosePercentHTML = document.querySelector(".choose-percent"),
    yearHTML = document.querySelector(".time-data .year .year-value"),
    monthHTML = document.querySelector(".time-data .month .month-value"),
    dayHTML = document.querySelector(".time-data .day .day-value");

console.log(expensesItemsHTML);

firstStartHTML.addEventListener("click", function() {
    money = +prompt("Ваш месячный бюджет?", "1000");

    while(isNaN(money) || money == "" || money == null) {
        alert("Что-то случилось с Вашими деньгами, пожалуйста попробуйте ответить еще раз. Ответ стоит записывать цифрами.");
        money = +prompt("Ваш месячный бюджет?", "1000");
    }
    time = prompt("Введите сегодняшнюю дату в формате YYYY-MM-DD", "2019-07-21");
    let a = time.split("-");

    while(a.length != 3) {
        alert("Пожалуйста, введите дату корректно");
        time = prompt("Введите сегодняшнюю дату в формате YYYY-MM-DD", "2019-07-21");
        a = time.split("-");
    }

    appData.budget = money;
    appData.timeData = time;
    budgetHTML.textContent = money.toFixed();
    yearHTML.value = new Date(Date.parse(time)).getFullYear();
    monthHTML.value = new Date(Date.parse(time)).getMonth() + 1;
    dayHTML.value = new Date(Date.parse(time)).getDate();
});

approve1HTML.addEventListener("click", function() {
    if(appData.budget != undefined){
        let sum = 0;

        for(let i = 0; i < expensesItemsHTML.length; i++) {
            let a = expensesItemsHTML[i].value,
                b = +expensesItemsHTML[++i].value;
    
            while(isNaN(b) || b == "" || b == null) {
                alert("Пожалуйста введите цену обязательных расходов цифрами.");
                b = +expensesItemsHTML[++i].value;
            }
    
            sum += b;
            let d = "|" + i + "." + a + "|";
            appData.expenses[d] = b;
        }
    
        expensesHTML.textContent = sum;
        appData.expensesSum = sum;
    } else {
        alert("Пожалуйста нажмите клавишу 'начать расчет' перед выполнением этой операции.");
    }
});

approve2HTML.addEventListener("click", function() {
    if(appData.budget != undefined) {

        for (let i = 0; i != optionalExpensesItemHTML.length; i++) { 
            appData.optionalExpenses[i] = optionalExpensesItemHTML[i].value;
            optionalexpensesHTML.textContent += appData.optionalExpenses[i] + ' ';
        }
    } else {
        alert("Пожалуйста нажмите клавишу 'начать расчет' перед выполнением этой операции.");
    }
});

calculateHTML.addEventListener("click", function() {

    if(appData.budget != undefined) {

        appData.moneyPerDay = ((appData.budget - appData.expensesSum)/30).toFixed();
        daybudgetHTML.textContent = appData.moneyPerDay;

        if(appData.moneyPerDay <= 100) {
            appData.WealthLevel = "Низкий";
        } else if (appData.moneyPerDay <= 2000 && appData.moneyPerDay > 100) {
            appData.WealthLevel = "Нормальный";
        } else if (appData.moneyPerDay > 2000) {
            appData.WealthLevel = "Высокий";
        } else {
            alert("Что-то пошло не так");
        }

        levelHTML.textContent = appData.WealthLevel;

    } else {
        alert("Пожалуйста нажмите клавишу 'начать расчет' перед выполнением этой операции.");
    }
});

chooseIncomeHTML.addEventListener('input', function() {
    if(appData.budget != undefined) {
        let items = chooseIncomeHTML.value;
        appData.arrIncome = items.split(", ");
        incomeHTML.textContent = chooseIncomeHTML.value;
    }
});

checkSavingsHTML.addEventListener("click", function() {
    if(appData.savings) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

chooseSumHTML.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSumHTML.value,
            percent = +choosePercentHTML.value,
            yaerResult = sum/100*percent,
            monthResult = sum/1200*percent;
            
        yearsavingsHTML.textContent = yaerResult.toFixed(1);
        monthsavingsHTML.textContent = monthResult.toFixed(1);
    }
});

choosePercentHTML.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSumHTML.value,
            percent = +choosePercentHTML.value,
            yaerResult = sum/100*percent,
            monthResult = sum/1200*percent;
            
        yearsavingsHTML.textContent = yaerResult.toFixed(1);
        monthsavingsHTML.textContent = monthResult.toFixed(1);
    }
});

var appData = {
    budget: money,
    timeData: time,
    expenses: {},
    expensesSum: 0,
    optionalExpenses: {},
    arrIncome: [],
    savings: false
};















