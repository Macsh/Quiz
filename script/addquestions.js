$('#addQuestions').on('click', function(){
    window.location.href = "index.html";
});

$(document).on('submit','form',function(e){
    e.preventDefault();
    let yourquestion = $('#yourquestion').val();
    let answer1 = $('#1').val();
    let answer2 = $('#2').val();
    let answer3 = $('#3').val();
    let answer4 = $('#4').val();
    let yoursolution = $('#solution').val();
    
    if(yourquestion == ""){
        alert("Vous n'avez pas renseigné de question !");
    }
    else if (answer1 == "") {
        alert("Il vous manque la réponse 1 !");
    }
    else if (answer2 == "") {
        alert("Il vous manque la réponse 2 !");
    }
    else if (answer3 == "") {
        alert("Il vous manque la réponse 3 !");
    }
    else if (answer4 == "") {
        alert("Il vous manque la réponse 4 !");
    }
    else if (yoursolution == "") {
        alert("Il vous manque la solution !");
    }
    else if (!parseInt(yoursolution) || parseInt(yoursolution) > 4 || parseInt(yoursolution) < 1) {
        alert("La solution n'est pas comprise entre 1 et 4 !");
    }
    else {
        let answers = [answer1, answer2, answer3, answer4];
        $.getJSON("./document.json", function (datas){
            datas.push(
                {question: yourquestion, reponses: answers, solution: yoursolution}
            );
            let newJson = JSON.stringify(datas);
            jQuery.post('./updatejson.php', {
            data: newJson
            }, function(response){
                alert("Your question was added to the quizz!");
                window.location.href = "index.html";
            })
        });
    }
});