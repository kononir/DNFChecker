/*
 * Лабораторная работа 2 по дисциплине ЛОИС
 * Выполнена студентом группы 621701 БГУИР Новицким Владиславом Александровичем
 * Скрипт предназначен для определения того, является ли введённая формула ДНФ, а также для распечатки ответа 
 * Версия №2 Удалена проверка на уникальность; Исправлена ошибка с неправильным ответом при последовательности конъюнкций (добавлена проверка на конъюнкцию)
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

    return checkAtom(inputFormula) 
            || checkNegation(inputFormula)
            || checkDisjunction(inputFormula)
            || checkConjunction(inputFormula);
}

function checkDisjunction(formula) {
    var result = false;
    
    if (formula.indexOf('(') === 0) {
        formula = cutBrackets(formula);
        
        var operatorIndex = findOperatorIndex(formula, '|');
        var subforms = getSubforms(formula, operatorIndex);

        for (var i = 0; i < subforms.length; i++) {
            result = checkAtom(subforms[i]) 
                    || checkNegation(subforms[i]) 
                    || checkConjunction(subforms[i]) 
                    || checkDisjunction(subforms[i]);
            
            if (result === false) {
                break;
            }
        }
    }

    return result;
}

function checkConjunction(formula) {
    var result = false;
    
    if (formula.indexOf('(') === 0) {
        formula = cutBrackets(formula);
        
        var operatorIndex = findOperatorIndex(formula, '&');
        var subforms = getSubforms(formula, operatorIndex);

        for (var i = 0; i < subforms.length; i++) {
            result = checkAtom(subforms[i]) 
                    || checkNegation(subforms[i])
                    || checkConjunction(subforms[i]);
            
            if (result === false) {
                break;
            }
        }
    }

    return result;
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
    return unaryComplexPat.test(formula);
}

function checkAtom(formula) {
    var unaryComplexPat = /^[A-Z]+\d*$/;
    return unaryComplexPat.test(formula);
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