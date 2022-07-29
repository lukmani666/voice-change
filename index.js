var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || window.webkitGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var colors = ['aqua', 'azure',  'black', 'beige', 'bisque',
'blue', 'brown', 'chocolate', 'coral', 'yellow',
 'white', 'violet', 'lime', 'magenta', 'ghostwhite',
'pink', 'sienna', 'snow', 'tomato', 'tan', 'violet', 'silver',
 'khaki', 'navy', 'peru', 'gray'];

var recognition = new SpeechRecognition();
if (SpeechGrammarList) {
    var SpeechRecognitionList = new SpeechGrammarList();
    var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
    SpeechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = SpeechRecognitionList;
}

recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var mic = document.querySelector('#voiceout');

var colorHTML = '';
colors.forEach (function(v, i, a) {
    console.log(v, i);
    colorHTML += '<span style="background-color:' + v + ';">' + v + '<span>';
});

document.body.onclick = function voice() {
    recognition.start();
    console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {
    var color = event.results[0][0].transcript;
    diagnostic.textContent = 'Result reveived: ' + color + '.';
    bg.style.backgroundColor = color;
    console.log('confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
    recognition.stop();
}

recognition.onerror = function(event) {
    diagnostic.textContent = "Error occurred in recognition" + event.error;
}

function voice() {
    mic.style.color = 'green';
    setTimeout(() => (mic.style.color = 'red'), 4000);
}