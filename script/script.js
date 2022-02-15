let i = 0;
let points = 0;
let initialLoad = true;
let finished = false;

function quizz() {
    initialLoad = false;
    $.getJSON("./document.json", function (datas){
        $('#number').html(datas.length - i);
        if (datas[i] == null){
            ending();
            finished = true;
        }
        if(!finished) {
            $('#question').html(datas[i].question);
            $.each(datas[i].reponses, function (index, value){
                $('#answers').append($('<input/>', {
                    type: "radio",
                    name: "answer",
                    value: index,
                    id: value
                }));
                $('#answers').append($('<label/>', {
                    for: value,
                    html: value,
                }));
                $('#answers').append($('<br/>'));
                $('#answers').append($('<br/>'));
            });
        }
    }).fail(function(){
        console.log("An error has occured.");
    });
}

$( document ).ready(function(){
    if (initialLoad) {
        quizz();
    }
});

function checking(){
    $.getJSON("./document.json", function (datas){
        let baseAnswer = $("#answers input[type='radio']:checked").val();
        let answer = parseInt($("#answers input[type='radio']:checked").val())+1;

        if (baseAnswer == null) {
            alert("Please choose at least one answer.");
        }
        else if (answer == datas[i].solution) {
            alert("Good Answer!");
            points++;
            i++;
            $('#answers').empty();
            quizz();
        }
        else {
            let rightAnswer = datas[i].reponses[datas[i].solution-1];
            alert("Shame, bad answer. The good answer was " + rightAnswer + ".");
            i++;
            $('#answers').empty();
            quizz();
        }
    });
}

function ending(){
    $('h1').remove();
    $('#submit').remove();
    $.getJSON("./document.json", function (datas){
        if(points == datas.length){
            $('#question').html("What wonderful knowledge! You got all the points! " + points + " points! Congratulations!");
        }

        else if(points >= (Math.ceil(datas.length/2) + Math.floor(datas.length/3))){
            $('#question').html("An almost perfect score : " + points + " points! Amazing!");
        }

        else if(points >= (Math.ceil(datas.length/2))){
            $('#question').html("A great score : " + points + " points! Well done!");
        }
        
        else if(points == 0){
            $('#question').html("Ouch, you got " + points + " points!");
        }

        else if(points <= (Math.ceil(datas.length/2))){
            $('#question').html("You're missing a few right answers, why not try again? " + points + " points!");
        }
    });
}

$('#submit').on('click', function(){
    checking();
});

$('#addQuestions').on('click', function(){
    window.location.href = "addquestions.html";
});