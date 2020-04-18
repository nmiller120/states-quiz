var getQueryString = function ( field, url ) {
	var href = url ? url : window.location.href;
	var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
	var string = reg.exec(href);
	return string ? string[1] : null;
}


function generateQuestion(indexOfState, questionSeed) {
	
	var question = {
		"questionString" : "",
		"options" : [],
		"answer" : 0
	};
	
	question.questionString = questionData[questionSeed].text + " " + data[indexOfState].name + "?";

	question.answer = Math.floor(Math.random() * 4); 
	
	var stateIndiciesUsed = [indexOfState];
	
	for (let x = 0; x < 4; x++) {
		if (x == question.answer) {
			question.options.push(data[indexOfState][questionData[questionSeed]["stateAttribute"]]);
		}
		
		else {
			var seed = Math.floor(Math.random() * data.length);
			while (stateIndiciesUsed.includes(seed)){
				seed = Math.floor(Math.random() * data.length);
				
			}
			console.log(seed);
			console.log(stateIndiciesUsed);
			question.options.push(data[seed][questionData[questionSeed]["stateAttribute"]]);
			stateIndiciesUsed.push(seed);
		}
		
	}
	console.log(question);
	return question;		
}

function onSubmit() {
	var points = 0;
	for (x in questionData){
		var container = document.getElementById("containerQ" + x);
		var correctAnswer = container.answer;
		var options = document.getElementsByName("radioGroup" + x);
		var selectedAnswer = null;
		
		for (y in options){
			if (options[y].checked == true){
				selectedAnswer = y;
				break;
			}
		}
		
		if (selectedAnswer == correctAnswer){
			points += 1;
		}
	}
	document.getElementById("answer").innerHTML = "<b>" + points + "/" + questionData.length + "</b><br>";
	
	if (document.getElementById("returnLink") == null) {
		var returnLink = document.createElement("a");
		returnLink.id = "returnLink";
		returnLink.href = "\\index.html";
		returnLink.innerHTML = "Return to Home";
		document.body.appendChild(returnLink);
	}
}
		
function buildQuestionHTML(questionNumber, indexOfState) {
	
	// container
	var container = document.createElement("div");
	container.id = "containerQ" + questionNumber;
	
	
	// questions
	var question = generateQuestion(indexOfState, questionNumber);
	
	
	container.answer = question.answer;
	
	// question text
	var questionLabel= document.createElement("label");
	questionLabel.for = container.id;
	questionLabel.innerHTML = question.questionString + "<br>";
	container.appendChild(questionLabel);
	
	// add radio buttons for question
	for (let x = 0; x < 4; x++){
		// create radio button
		var answer = document.createElement("input");
		answer.type = "radio";
		
		// set name / value
		answer.setAttribute("name", "radioGroup" + questionNumber);
		answer.setAttribute("value", x);
		var id = "button" + questionNumber + "." + x;
		answer.setAttribute("id", id);
		
		// add radio button , label, line break
		container.appendChild(answer);
		var radioButtonLabel = document.createElement("label");
		radioButtonLabel.setAttribute("id", id);
		radioButtonLabel.innerHTML = question.options[x];
		container.appendChild(radioButtonLabel);
		container.appendChild(document.createElement("br"));
		
	}

	// add div element to body
	document.body.appendChild(container);
}
