/*
 * Лабораторная работа 2 по дисциплине ЛОИС
 * Выполнена студентом группы 621701 БГУИР Новицким Владиславом Александровичем
 * Скрипт предназначен для тестирования знаний пользователя, загрузки теста и переключения между заданиями
 * Версия №1
*/

var testMas;
var testNum;

document.getElementById('files').addEventListener('change', handleLoading, false);
function handleLoading(evt) {
    var files = evt.target.files;
    
    var reader = new FileReader();
    reader.onload = getTestMas;
    reader.readAsText(files[0]);
}

function getTestMas(evt) {
    let lines = evt.target.result;
    
    try {
        if (lines === undefined) {
            throw "Ошибка чтения файла!";
        }
        
        testMas = JSON.parse(lines);
        testNum = 0;
        
        showTest();
    } catch (e) {
        alert(e);
    }
}

function showTest() {    
    document.getElementById("formula").value = testMas[testNum];
}

function test() {
    var radBtns = document.getElementsByName("radio_button");
    var checkedNum;
    var correctAnswer;
    var checkedAnswer;
    var result;
    
    try {
        if (testMas === undefined) {
            throw "Пожалуйста, выберите файл теста!";
        }
    
        for (var i = 0; i < radBtns.length; i++) {
            if (radBtns[i].checked) {
                checkedNum = i;
            }
        }
    
        if (checkedNum === undefined) {
            throw "Пожалуйста, выберите ответ!";
        }
        
        correctAnswer = checkFormula();
        checkedAnswer = (checkedNum === 0);
        
        if (checkedAnswer === correctAnswer) {
            result = "Ответ верный";
        } else {
            result = "Ответ неверный";
        }
    
        document.getElementById("answer").innerHTML = result;
    } catch (e) {
        alert(e);
    }
}

function nextTest() {
    try {
        if (testMas === undefined) {
            throw "Пожалуйста, выберите файл теста!";
        }
        
        if (testNum + 1 > testMas.length - 1) {
            throw "Вы достигли конца теста!";
        }
        
        document.getElementById("answer").innerHTML = "";

        testNum++;
        showTest();
    } catch (e) {
        alert(e);
    }
}

function prevTest() {
    try {
        if (testMas === undefined) {
            throw "Пожалуйста, выберите файл теста!";
        }
        
        if (testNum - 1 < 0) {
            throw "Это первая формула теста!";
        }
        
        document.getElementById("answer").innerHTML = "";

        testNum--;
        showTest();
    } catch (e) {
        alert(e);
    }
}
