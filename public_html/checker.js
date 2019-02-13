/*
 * Лабораторная работа 2 по дисциплине ЛОИС
 * Выполнена студентом группы 621701 БГУИР Новицким Владиславом Александровичем
 * Скрипт предназначен для определения того, является ли введённая формула ДНФ, а также для распечатки ответа 
 * Версия №1
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
    var disjMas;

    if (checkAtom(inputFormula)
            || checkUnaryComplex(inputFormula)) {
        answer = true;
    } else if (notEmpty(disjMas = getConjuncts(inputFormula))
            && isUnique(disjMas)) {
        answer = true;
    } else {
        answer = false;
    }

    return answer;
}

function getConjuncts(formula) {
    if (formula.indexOf('(') === 0) {
        formula = cutBrackets(formula);
    } else {
        return [];
    }

    var operatorIndex = findOperatorIndex(formula, '|');
    var subforms = [];
    var result = [];
    var mas = [];

    subforms = getSubforms(formula, operatorIndex);

    for (var i = 0; i < subforms.length; i++) {
        if (checkAtom(subforms[i])) {
            mas.push(subforms[i]);
        } else if (checkUnaryComplex(subforms[i])) {
            mas.push(cutBrackets(subforms[i]));
        } else if (notEmpty(result = getConjunctElements(subforms[i]))) {
            mas.push(result.sort().join());
        } else if (notEmpty(result = getConjuncts(subforms[i]))) {
            mas = mas.concat(result);
        } else {
            mas = [];
            break;
        }
    }

    return mas;
}

function getConjunctElements(formula) {
    if (formula.indexOf('(') === 0) {
        formula = cutBrackets(formula);
    } else {
        return [];
    }

    var operatorIndex = findOperatorIndex(formula, '&');
    var subforms = [];
    var result = [];
    var mas = [];

    subforms = getSubforms(formula, operatorIndex);

    for (var i = 0; i < subforms.length; i++) {
        if (checkAtom(subforms[i])) {
            mas.push(subforms[i]);
        } else if (checkUnaryComplex(subforms[i])) {
            mas.push(cutBrackets(subforms[i]));
        } else if (notEmpty(result = getConjunctElements(subforms[i]))) {
            mas = mas.concat(result);
        } else {
            mas = [];
            break;
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

function checkUnaryComplex(formula) {
    var unaryComplexPat = /^\(!([A-Z])+\)\d*$/;
    return formula.match(unaryComplexPat);
}

function checkAtom(formula) {
    var unaryComplexPat = /^[A-Z]+\d*$/;
    return formula.match(unaryComplexPat);
}

function cutBrackets(line) {
    var second = 1;
    var newLength = line.length - 2;

    return line.substr(second, newLength);
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

function goToInteractiveTest() {
    document.location.href = "interactive_test.html";
}