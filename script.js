// -- Funções de Verificação -- //

// Verifica se o valor é primo //
function isPrime(p) {
  if (!p) return false;

  for (let i = 2; i * i <= p; i++) {
    if (p % i == 0) return false;
  }
  return true;
}

// Printa os resultados //
function showOutput(element, outPut, concat) {
  if (concat) return (element.innerHTML += outPut);
  return (element.innerHTML = outPut);
}

// Coloca os valores de Z em um vetor //
function chargeZ(z) {
  const vetor = [];

  for (let i = 1n; i <= z; i++) {
    if (z % i === 0n) {
      vetor.push(i);
    }
  }

  return vetor;
}

// Retorna os valores Co-primos //
function coPrime(z, res) {
  const vetorZ = chargeZ(z);
  const vetDV2 = [];
  const vetD = [];
  let aux = 0;

  for (let i = 2; i < 999; i++) {
    // Gera valores aleatórios e os coloca em um vetor //
    for (let j = 0; j <= i; j++) {
      if (i % j == 0) {
        vetDV2.push(j);
      }
    }

    // Compara os divisores de vetor aleatório com o valores de vetor Z //
    for (let k = 0; k < vetorZ.length; k++) {
      for (let l = 0; l < vetDV2.length; l++) {
        if (vetorZ[k] == vetDV2[l]) {
          aux++;
        }
      }
    }

    if (aux != 1) {
      vetDV2.length = 0;
      aux = 0;
    }

    if (aux == 1) {
      vetD.push(i);
      aux = 0;
    }
  }

  showOutput(res, `Candidatos ao valor de D: ${vetD.join(", ")}`, true);
}

// -- Funções de Calculo -- //

// Armazena os valores de N e Z //
function getParameters() {
  const p = document.getElementById("txtp");
  const q = document.getElementById("txtq");

  const condition = isPrime(p.value) && isPrime(q.value);
  if (!condition) return alert("Insira apenas valores primos!");

  const n = BigInt(p.value * q.value);
  const z = BigInt((p.value - 1) * (q.value - 1));

  return {
    n,
    z,
  };
}

// Calcula os candidatos de D //
function calcD() {
  const res = document.getElementById("res");

  const { n, z } = getParameters();

  showOutput(res, "");
  showOutput(res, `<p>N = ${n} </p> <p>Z = ${z} </p>`);

  coPrime(z, res);
}

// Calcula os candidatos de E //
function calcE() {
  const { z } = getParameters();
  const d = document.getElementById("txtd").value;
  const resultE = document.getElementById("res-e");
  const vetorE = [];
  let cont = 0;

  for (let e = 1; cont < 10; e++) {
    const calc = BigInt(e * d);
    if (calc % z === 1n) {
      vetorE.push(e);
      cont += 1;
    }
  }

  showOutput(resultE, `Candidatos ao valor de E: ${vetorE.join(", ")} `);
}

// Coloca em ascii, criptografa e descriptografa o texto e depois printa tudo //
function ascii() {
  var texto = document.getElementById("txt-frase").value;
  var d = document.getElementById("txtd").value;
  var criptografado = document.getElementById("res-criptografar");
  var e = document.getElementById("txte").value;

  const { n } = getParameters();

  var vetCript = [];
  var vetDescript = [];
  var textCript = "";
  criptografado.innerHTML = "";

  const ascii = texto.split("").map((i) => i.charCodeAt(0));

  for (var i = 0; i < ascii.length; i++) {
    const calc = BigInt(ascii[i]) ** BigInt(e);
    vetCript[i] = calc % n;
  }

  for (var i = 0; i < vetCript.length; i++) {
    textCript += String.fromCharCode(parseInt(vetCript[i]));
  }

  for (var i = 0; i < vetCript.length; i++) {
    const calc = vetCript[i] ** BigInt(d);
    console.log(calc);
    vetDescript[i] = calc % n;
  }

  // Print //
  showOutput(
    criptografado,
    `<p>Texto: ${texto}</p> <p>Texto em Ascii: ${ascii.join(", ")}</p>`
  );

  showOutput(
    criptografado,
    `<p>Texto Criptografado: ${vetCript.join(", ")} </p>`,
    true
  );

  showOutput(
    criptografado,
    `<p> Texto Descriptografado: ${vetDescript
      .map((i) => String.fromCharCode(Number(i)))
      .join("")}</p>`,
    true
  );
}