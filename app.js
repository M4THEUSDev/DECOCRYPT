function scrollToAnchor(anchorId) {
    const targetElement = document.getElementById(anchorId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var codificarSection = document.getElementById('secaoCodificar');

    window.addEventListener('scroll', function () {
        var bounding = codificarSection.getBoundingClientRect();

        if (bounding.top <= window.innerHeight * 0.75) {
            codificarSection.classList.add('visible-content');
            codificarSection.classList.remove('hidden-content');
        } else {
            codificarSection.classList.remove('visible-content');
            codificarSection.classList.add('hidden-content');
        }
    });
});

// Adicione o listener fora da função criptografar
document.getElementById("inputText").addEventListener("input", verificarEntrada);

// Função para verificar a entrada de texto
function verificarEntrada() {
    var inputText = document.getElementById("inputText").value;

    // Verificar se a entrada contém acentos ou caracteres especiais
    if (/[^a-z]/.test(inputText)) {
        alert("Apenas letras minúsculas e sem acento são permitidas.");

        // Limpar o campo de entrada
        document.getElementById("inputText").value = "";
    }
}

// Função para criptografar
function criptografar() {
    var textoOriginal = document.getElementById("inputText").value;

    // Verificar se o texto contém caracteres ou letras maiúsculas
    if (/[^a-z ]/.test(textoOriginal)) {
        alert("Digite apenas letras minúsculas sem acentos.");
        limparCampo(); // Limpar campo se houver caracteres não permitidos
    } else {
        // Se não houver caracteres ou letras maiúsculas, prosseguir com a criptografia
        var textoCriptografado = aplicarCriptografia(textoOriginal, true);

        // Exibir o texto criptografado no conteúdo do aside
        document.querySelector(".conteudo-aside h2").textContent = "Texto Criptografado:";
        document.querySelector(".conteudo-aside p").textContent = textoCriptografado;
    }
}

function limparCampo(){
    document.getElementById('inputText').value = '';
}

// Função para descriptografar
function descriptografar() {
    var textoCriptografado = document.getElementById("inputText").value;
    limparCampo(); // Limpar campo se houver caracteres não permitidos
    // Verificar se o texto contém apenas letras minúsculas e espaços
    if (/[^a-z ]/.test(textoCriptografado)) {
        alert("Texto criptografado inválido. Digite apenas letras minúsculas e sem acentos.");
    } else {
        // Se o texto criptografado for válido, prosseguir com a descriptografia
        var textoOriginal = aplicarCriptografia(textoCriptografado, false);

        // Exibir o texto descriptografado no conteúdo do aside
        document.querySelector(".conteudo-aside h2").textContent = "Texto Descriptografado:";
        document.querySelector(".conteudo-aside p").textContent = textoOriginal;
    }
}


function aplicarCriptografia(texto, criptografar) {
    var regrasCriptografia = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    var resultado = '';

    for (var i = 0; i < texto.length; i++) {
        var caractereAtual = texto[i].toLowerCase();

        if (caractereAtual in regrasCriptografia) {
            resultado += criptografar ? regrasCriptografia[caractereAtual] : caractereAtual;
        } else {
            resultado += caractereAtual;
        }
    }

    return resultado;
}


function copiarTexto() {
    var textoParaCopiar = document.querySelector(".conteudo-aside p").textContent;

    // Criar um elemento de área de transferência temporário
    var tempTextarea = document.createElement("textarea");
    tempTextarea.value = textoParaCopiar;

    // Adicionar o elemento à página
    document.body.appendChild(tempTextarea);

    // Selecionar e copiar o texto
    tempTextarea.select();
    document.execCommand("copy");

    // Remover o elemento temporário
    document.body.removeChild(tempTextarea);

    // Exibir uma mensagem de sucesso (opcional)
    alert("Texto copiado para a área de transferência!");
}


