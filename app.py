from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    entrada = request.form['numeros']
    numeros = entrada.split()

    try:
        lista_inteiros = [int(numero) for numero in numeros]
        lista_ordenada = sorted(lista_inteiros)
        tupla_numeros = tuple(lista_ordenada)

        with open("numeros.txt", "w") as arquivo:
            arquivo.write(str(tupla_numeros))

        numeros_recuperados = tuple(map(int, str(tupla_numeros).strip('()').split(', ')))
        maior_numero = max(numeros_recuperados)
        menor_numero = min(numeros_recuperados)
        media_numeros = sum(numeros_recuperados) / len(numeros_recuperados)

        resultados = {
            'lista': lista_inteiros,
            'tupla': tupla_numeros,
            'maior': maior_numero,
            'menor': menor_numero,
            'media': media_numeros
        }

        return render_template('index.html', resultados=resultados)
    except ValueError:
        return render_template('index.html', error="Entrada inválida. Certifique-se de digitar apenas números inteiros.")

if __name__ == '__main__':
    app.run(debug=True)
