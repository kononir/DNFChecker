/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function goToStandart() {
    document.location.href = "index.html";
}

var e;
var testNum = 0;

document.getElementById('files').addEventListener('change', handleFileSelect, false);
function handleFileSelect(evt) {
    e = evt;
    loadTest();
}

function loadTest() {
    var files = e.target.files;
    
    var reader = new FileReader();
    reader.onload = showTest;
    reader.readAsText(files[0]);
}

function showTest(reader) {
    let lines = reader.target.result;
    
    if (lines !== undefined) {
        var testNumber = testNum;
        var testMas = JSON.parse(lines);

        document.getElementById("formula").value = testMas[testNumber];
    } else {
        alert("Test file error!");
    }
}

function test() {
    var radBtns = document.getElementsByName("radio_button");
    var checkedNum;
    var correctAnswer;
    var checkedAnswer;
    var result;
    
    for (var i = 0; i < radBtns.length; i++) {
        if (radBtns[i].checked) {
            checkedNum = i;
        }
    }
    
    try {
        if (checkedNum === undefined) {
            throw "not checked";
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
        alert("Please, choose answer.");
    }
}

function nextTest() {
    document.getElementById("answer").innerHTML = "";
    
    testNum++;
    
    loadTest();
}

function prevTest() {
    document.getElementById("answer").innerHTML = "";
    
    testNum--;
    
    loadTest();
}
