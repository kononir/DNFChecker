/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function goToStandart() {
    document.location.href = "index.html";
}

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
        
        correctAnswer = main();
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
