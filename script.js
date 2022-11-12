const canvas = document.querySelector('canvas');

const generateButton = document.querySelector('#generate-btn');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let curve= 10; 
let curve2 = 0;

function dibujarArbol(startX, startY, len, angle, branchWidth, color1, color2) {    

    ctx.beginPath(); // funcion que sirve para decirle al contexto de canvas que vamos a empezar a dibujar un camino.
    ctx.save(); // función que guarda el estado actual del canvas
    ctx.strokeStyle = color1; // strokeStyle es el color del contorno del dibujo
    ctx.fillStyle = color2; // fillStyle es el color del contenido del dibujo, en este caso será el color de las hojas.
    ctx.shadowBlur = 20 ; // nivel de desenfoque de la sombra
    ctx.shadowColor = 'rgba(255,255,255,.5)' // color de la sombra 
    ctx.lineWidth = branchWidth; // lineWidth es el ancho de la línea
    ctx.translate(startX, startY); // función que mueve el objeto manteniendo proporciones
    ctx.rotate(angle * Math.PI/Math.trunc((Math.random()+1 )* 90)); // función que sirve para rotar las figuras
    ctx.moveTo(0,0); // función que mueve las líneas en ejes x, y
    //ctx.lineTo(0, -len); // función que indica las líneas RECTAS en ejes x, y;
    if (angle > 0) {
        ctx.bezierCurveTo(curve2, -len/2, curve, -len/2, 0, -len); // función que crea lineas curvas
    }
    else {
        ctx.bezierCurveTo(curve, -len/2, -curve2, -len/2, 0, -len); // función que crea lineas curvas
    }
    
    ctx.stroke(); // función que crea las líneas

    if (len < 10) {

        //hojas del arbol
        ctx.beginPath();
        ctx.arc(0, -len, 20, 0 , Math.PI/2);
        ctx.fill();
        ctx.restore();
        return;
    }

    curve = (Math.random() * 10) + 10;
    curve2 = (Math.random() * 30);


    // inicio desde el eje X, dirección del eje Y (es - len para que vaya hacia arriba)
    // len largo del arbol, angle angulo de las ramas del arbol, 
    //por ende +curve y - curve para que el arbol se abra en ambas direcciones
    // branchWidth es el ancho de la rama
    dibujarArbol(0, -len, len * 0.75, angle + curve , branchWidth * 0.7);    
    dibujarArbol(0, -len, len * 0.75, angle - curve, branchWidth * 0.5);

    ctx.restore(); // función que recupera el estado previamente guardado del canvas.

}

dibujarArbol(canvas.width/2, canvas.height - 80, 120, 0, 20, 'green', 'white');


function generarArbolRandom() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    let centerPointX = canvas.width/2;
    let len = Math.floor((Math.random() * 20) + 100);
    let angle = 0;
    let branchWidth = (Math.random()*70) + 1;
    let color1 = 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')';
    let color2 = 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')';

    generateButton.style.background = color1;

    curve = (Math.random() * 10) + 2;

    dibujarArbol(centerPointX, canvas.height - 80, len, angle, branchWidth, color1, color2);
     
}

generateButton.addEventListener('click', generarArbolRandom) ;

setInterval(generarArbolRandom, 60000);

