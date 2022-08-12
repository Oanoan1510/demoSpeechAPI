const btn = document.getElementById('btn');


var array = [
    {
        image: 'image/mama.jpg',
        vocaburaly:'妈妈',
        pronunciation:'mā ma',
    },
    {
        image: 'image/baba.jpg',
        vocaburaly:'爸爸',
        pronunciation:'bà ba',
    },    {
        image: 'image/talot.jpg',
        vocaburaly:'尿布',
        pronunciation:'niào bù',
    },    {
        image: 'image/hat.jpeg',
        vocaburaly:'帽子',
        pronunciation:'mào zi',
    },    {
        image: 'image/ban.jpg',
        vocaburaly:'桌子',
        pronunciation:'zhuō zi',
    },    {
        image: 'image/noi.jpg',
        vocaburaly:'锅',
        pronunciation:'guō',
    },    {
        image: 'image/tv.jpg',
        vocaburaly:'电视机',
        pronunciation:'diàn shì jī',
    },    {
        image: 'image/giuong.jpg',
        vocaburaly:'床',
        pronunciation:'chuáng',
    },    {
        image: 'image/thungrac.jpg',
        vocaburaly:'垃圾箱',
        pronunciation:'lā jī xiāng',
    },    {
        image: 'image/khan.jpeg',
        vocaburaly:'毛巾',
        pronunciation:'máo jīn',
    },
]

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const synth = window.speechSynthesis;
recognition.lang = 'zh-Hans';
recognition.continuous = false;



const microphone = document.querySelector('.microphone');
recognition.onstart = function(){
    console.log('Speak Now!');
}

recognition.onspeechend = () => {
    recognition.stop();
}

recognition.onerror = (err) => {
    console.log(err);
}

var i = 0;


function prevButton (){
    if(i > 0){
        i--
    }
    else{
        i = array.length - 1
    }
    document.getElementById('image').src = array[i].image
    document.getElementById('vocabulary').innerHTML = array[i].vocaburaly
    document.getElementById('pronunciation').innerHTML = array[i].pronunciation
    document.getElementById('recording').innerHTML = "";
    document.getElementById('result').innerHTML = ""
    
}
function nextButton (){
    if(i < array.length - 1){
        i++
    }
    else{
        i = 0
    }

    document.getElementById('image').src = array[i].image
    document.getElementById('vocabulary').innerHTML = array[i].vocaburaly
    document.getElementById('pronunciation').innerHTML = array[i].pronunciation
    document.getElementById('recording').innerHTML = "";
    document.getElementById('result').innerHTML = ""
}

document.getElementById('image').src = array[i].image
document.getElementById('vocabulary').innerHTML = array[i].vocaburaly
document.getElementById('pronunciation').innerHTML = array[i].pronunciation

const speak = (text) => {
    if (synth.speaking) {
        console.error('Busy. Speaking...');
        return;
    }

    const utter = new SpeechSynthesisUtterance(text);

    utter.onend = () => {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utter.onerror = (err) => {
        console.error('SpeechSynthesisUtterance.onerror', err);
    }

    synth.speak(utter);
};
function read(){
    speak(array[i].vocaburaly);
}

recognition.onresult = (e) => {
    var a;
    console.log('onresult', e);
    var text = e.results[0][0].transcript;
    document.getElementById('recording').innerHTML = text;

    if(text == array[i].vocaburaly){
        a = '正しいです'
        // setTimeout(nextButton, 3000)
    } else {
        a = '正しくない'
    }
    document.getElementById('result').innerHTML = a
}

