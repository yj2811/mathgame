var playing = false;
var score;
var action;
var timerem;
var correctAns;
var wrongAns;
// Clicking on startreset
document.getElementById("startreset").onclick =
    function(){
        // If user is playing
        if (playing == true){
            // Reloading the page
            location.reload()
        }
        // If user is not playing
        else{
            // Change mode to playing
            playing = true;
            // Set score to 0
            score = 0;
            document.getElementById("scorevalue").innerHTML = score;
            // Display the countdown
            show("timeremaining");
            timerem = 60;
            document.getElementById("timevalue").innerHTML = timerem;
            // Change button to "Reset Game"
            document.getElementById("startreset").innerHTML = "Reset Game";
            // Hide "gameover"
            hide("gameover");
            // Start countdown
            startCountdown();

            // Generate new QnA
            generateQnA();
        }

    }

    // Clicking on an answer
    for( i=1; i<5; i++){
        document.getElementById("box"+ i).onclick =
            function(){
                // Check if the user is playing
                if ( playing == true){
                    // Check if the answer is correct
                    if ( this.innerHTML == correctAns){
                        score++;
                        document.getElementById("scorevalue").innerHTML = score;

                        hide("tryagain");
                        show("correct");

                        setTimeout(function(){
                            hide("correct");
                        }, 1000)

                        // Generate new QnA
                        generateQnA();
                    }else{
                        hide("correct");
                        show("tryagain");

                        setTimeout(function(){
                            hide("tryagain");
                        }, 1000)
                    }
                }
            }
    }


    // Functions:

    // Start Countdown
    function startCountdown(){
        action = setInterval(function(){

            timerem -= 1
            document.getElementById("timevalue").innerHTML = timerem;

            // When 60 seconds are over
            if(timerem == 0){
                // Stop Countdown
                stopCountdown();
                // Change contents of "gameover"
                document.getElementById("gameover").innerHTML =
                    "<p> Game Over! </p> <p> Your score is " + score + ".</p>";
                    // Display "gameover"
                    show("gameover");
                    hide("timeremaining");
                    hide("correct");
                    hide("tryagain");
                    playing = false;
                    document.getElementById("startreset").innerHTML = "Start Game";

            }
        }, 1000)
    }

    // Stop Countdown
    function stopCountdown(){
        clearInterval(action);
    }

    // Hide an element
    function hide(Id){
        document.getElementById(Id).style.display = "none";
    }

    // Show an element
    function show(Id){
        document.getElementById(Id).style.display = "block";
    }

    // Generating QnA
    function generateQnA(){
        var x = 1 + Math.round(9*Math.random());
        var y = 1 + Math.round(9*Math.random());
        correctAns = x*y;

        document.getElementById("question").innerHTML = x + "x" + y;

        var correctPosition = 1 + Math.round(3*Math.random());
        // Fill one box with correct answer.
        document.getElementById("box" + correctPosition).innerHTML = correctAns;

        var answers = [correctAns];
        // Fill  other boxes with wrong answers
        for ( i=1; i<5; i++){
            if ( i != correctPosition){

                // Make sure the wrong answer is different from the correct answer.
                do{
                    wrongAns = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random()));

                } while(answers.indexOf(wrongAns)>-1)

                answers.push(wrongAns);

                document.getElementById("box" + i).innerHTML = wrongAns;

            }
        }
    }
