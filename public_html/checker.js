/*
 * Лабораторная работа 2 по дисциплине ЛОИС
 * Выполнена студентом группы 621701 БГУИР Новицким Владиславом Александровичем
 * Скрипт предназначен для определения того, является ли введённая формула ДНФ, а также для распечатки ответа 
 * Версия №2 
 * 
*/

function checkFormulaWithPrinting() {
    var answer = checkFormula();
    var text;
    
    if (answer) {
        text = "Данная формула является ДНФ!";
    } else {
        text = "Данная формула не является ДНФ!";
    }
    
    document.getElementById("answer").innerHTML = "Ответ: " + text;
}

function checkFormula() {
    var inputFormula = document.getElementById("formula").value;
    
    var answer;
    var conjMas = [];
    var conjElMas = [];

    if (checkAtom(inputFormula)) {
        answer = true;
    } else if (checkNegation(inputFormula)) {
        answer = true;
    } else if (notEmpty(conjMas = findConjuncts(inputFormula)) 
            && isUnique(conjMas)) {
        answer = true;
    } else if (notEmpty(conjElMas = findConjunctElements(inputFormula)) 
            && isUnique(conjElMas)) {
        answer = true;
    } else {
        answer = false;
    }

    return answer;
}

function findConjuncts(formula) {
    var mas = [];
    
    if (formula.indexOf('(') === 0) {
        formula = cutBrackets(formula);
        
        var operatorIndex = findOperatorIndex(formula, '|');
        var subforms = [];
        var result = [];

        subforms = getSubforms(formula, operatorIndex);

        for (var i = 0; i < subforms.length; i++) {
            if (checkAtom(subforms[i])) {
                mas.push(subforms[i]);
            } else if (checkNegation(subforms[i])) {
                mas.push(cutBrackets(subforms[i]));
            } else if (notEmpty(result = findConjunctElements(subforms[i]))) {
                mas.push(result.sort().join());
            } else if (notEmpty(result = findConjuncts(subforms[i]))) {
                mas = mas.concat(result);
            } else {
                mas = [];
                break;
            }
        }
    }

    return mas;
}

function findConjunctElements(formula) {
    var mas = [];
    
    if (formula.indexOf('(') === 0) {
        formula = cutBrackets(formula);
        
        var operatorIndex = findOperatorIndex(formula, '&');
        var subforms = [];
        var result = [];

        subforms = getSubforms(formula, operatorIndex);

        for (var i = 0; i < subforms.length; i++) {
            if (checkAtom(subforms[i])) {
                mas.push(subforms[i]);
            } else if (checkNegation(subforms[i])) {
                mas.push(cutBrackets(subforms[i]));
            } else if (notEmpty(result = findConjunctElements(subforms[i]))) {
                mas = mas.concat(result);
            } else {
                mas = [];
                break;
            }
        }
    }

    return mas;
}

function findOperatorIndex(formula, operator) {
    var i = 0;
    var unclosedBrackets = 0;

    while (i < formula.length) {
        if (formula[i] === '(') {
            unclosedBrackets++;
        } else if (formula[i] === ')') {
            unclosedBrackets--;
        } else if (formula[i] === operator && unclosedBrackets === 0) {
            break;
        }

        i++;
    }

    return i;
}

function checkNegation(formula) {
    var unaryComplexPat = /^\(!([A-Z])+\)\d*$/;
    return formula.match(unaryComplexPat);
}

function checkAtom(formula) {
    var unaryComplexPat = /^[A-Z]+\d*$/;
    return formula.match(unaryComplexPat);
}

function cutBrackets(formula) {
    var second = 1;
    var newLength = formula.length - 2;

    return formula.substr(second, newLength);
}

function getSubforms(formula, operatorIndex) {
    var subforms = [];

    subforms.push(formula.slice(0, operatorIndex));
    subforms.push(formula.slice(operatorIndex + 1, formula.length));

    return subforms;
}

function isUnique(mas) {
    for (var i = 0; i < mas.length - 1; i++) {
        for (var j = i + 1; j < mas.length; j++) {
            if (mas[i] === mas[j]) {
                return false;
            }
        }
    }

    return true;
}

function notEmpty(mas) {
    return mas.length !== 0;
}

/**
 * проверка на совпадение элементов конъкта
 * ошибка при (A&B) - удаление скобок, потом снова проверка на их наличие
 */