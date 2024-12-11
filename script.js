document.getElementById('numero-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let numeros = document.getElementById('numeros').value.trim().split(' ');

    try {
        let lista_inteiros = numeros.map(numero => parseInt(numero));
        if (lista_inteiros.some(isNaN)) throw 'Entrada inválida. Certifique-se de digitar apenas números inteiros.';

        document.getElementById('resultados').innerHTML = `
            <p>Lista válida: ${lista_inteiros.join(', ')}</p>
        `;

        let lista_ordenada = lista_inteiros.sort((a, b) => a - b);
        let tupla_numeros = `(${lista_ordenada.join(', ')})`;
        document.getElementById('resultados').innerHTML += `
            <p>Lista ordenada como tupla: ${tupla_numeros}</p>
        `;

        localStorage.setItem('numeros', tupla_numeros);
        document.getElementById('resultados').innerHTML += `
            <p>Tupla armazenada no armazenamento local.</p>
        `;

        let numeros_recuperados = JSON.parse('[' + localStorage.getItem('numeros').slice(1, -1) + ']');
        let maior_numero = Math.max(...numeros_recuperados);
        let menor_numero = Math.min(...numeros_recuperados);
        let media_numeros = (numeros_recuperados.reduce((a, b) => a + b, 0) / numeros_recuperados.length).toFixed(2);

        document.getElementById('resultados').innerHTML += `
            <p>Números recuperados do armazenamento: ${numeros_recuperados.join(', ')}</p>
            <p>Maior número: ${maior_numero}</p>
            <p>Menor número: ${menor_numero}</p>
            <p>Média dos números: ${media_numeros}</p>
        `;
    } catch (error) {
        document.getElementById('resultados').innerHTML = `<p style="color: red;">${error}</p>`;
    }
});
