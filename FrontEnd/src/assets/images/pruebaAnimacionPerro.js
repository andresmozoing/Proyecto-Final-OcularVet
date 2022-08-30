
function achicar (){
    var pupila = document.getElementById('pupilaDerecha');
    pupila.style.transform = 'scale(0.7,0.7)';   
    pupila.style.transition= '5s' 

    pupila = document.getElementById('pupilaIzquierda');
    pupila.style.transform = 'scale(0.7,0.7)';  
    pupila.style.transition= '5s'  

    console.log("hola")
}

function linterna (){
    var body = document.getElementById('body');
    body.style.cursor= url(linterna.png)

    console.log("hola")
}

function aver(){
    console.log("aver");
}