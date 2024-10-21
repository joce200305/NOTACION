const evaluarExpresion = (num1, num2, operador) => {
    switch (operador) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num1 / num2;
        default: return null;
    }
};

const convertirExpresion = () => {
    const signos = ["+", "-", "*", "/"];
    let expression = document.getElementById("expression").value.trim();
    let elementos = expression.split(" ");
    let pilaInfija = [];
    let pilaResultado = [];

   
    if (expression === "") {
        document.getElementById("resultado").value = "La expresión no puede estar vacía";
        return;
    }

  
    for (let i = elementos.length - 1; i >= 0; i--) {
        const elemento = elementos[i];

       
        if (!isNaN(elemento) && parseFloat(elemento) < 0) {
            document.getElementById("resultado").value = "No se permiten números negativos";
            return;
        }

        if (signos.includes(elemento)) {
           
            if (pilaResultado.length < 2 || pilaInfija.length < 2) {
                document.getElementById("resultado").value = "Expresión inválida";
                return;
            }

            const num1 = parseFloat(pilaResultado.pop());
            const num2 = parseFloat(pilaResultado.pop());
            const infija = `(${pilaInfija.pop()} ${elemento} ${pilaInfija.pop()})`;

         
            const resultadoOperacion = evaluarExpresion(num1, num2, elemento);
            pilaResultado.push(resultadoOperacion);  
            pilaInfija.push(infija);  
        } else if (!isNaN(elemento)) {
            pilaResultado.push(parseFloat(elemento));  
            pilaInfija.push(elemento);  
        } else {
            document.getElementById("resultado").value = "Expresión inválida";
            return;
        }
    }

    if (pilaInfija.length === 1 && pilaResultado.length === 1) {
        const resultadoFinal = pilaResultado.pop();
        const expresionInfija = pilaInfija.pop();
        document.getElementById("resultado").value = `Infija: ${expresionInfija.replace(/^\((.*)\)$/, '$1')}, Resultado: ${resultadoFinal}`;  // Mostrar infija y resultado
    } else {
        document.getElementById("resultado").value = "Expresión inválida";
    }
};

document.getElementById("convertirBtn").addEventListener("click", convertirExpresion);