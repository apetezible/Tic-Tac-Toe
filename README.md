# Tres en Raya

## Abstract
Espero conozcas el popular juego Tres en Raya. Si no, se te recomienda que lo googlees. Este proyecto trata sobre hacer este juego directamente en el Canvas, hay algunos elementos que tuve que agregar de medios externos (sonidos, imágenes y animación). Para el cerebro del juego, desarrollé un Árbol de Desiciones en JavaScript.
## Introducción
Una libre elección de un Proyecto para uno de los varios finales de mi Programación Básica, me llevó a esta idea: Conteniendo un Árbol de Desiciones un concepto de Diseño y mucho uso de Funciones y Ciclos Lógicos usados para dibujar en el Canvas. Consider esto como un proyecto conveniente.

## El juego
Pienso que la justa elección de un primer jugadir es un problema importante, el primero que va a jugar en el tablero es un importante elemento que merece una copiosa atención. La solución que propongo es lanzar unos dados, el ganador es el primer jugador.

El primer jugador usará la Cruz y el segundo usará el Círculo.

## Métodos
Hay dos métodos principales presentes en este código. Puedes estudiar los otros presentes en el código si quieres.

### - Lanzando el Dado
Hay dos dados y los dos deben tener un número aleatorio diferente. El concepto determinado más cercano a número aleatorio que vino a mi mente fue la función Random predefinida en JavaScript.

### - El Machine Decision Maker
La forma en la que pensé por la máquina fue jugar en una manera defensiva. Si esta tiene que empezar, eligirá una posición "aleatoria". Si el juego ha llegado a una situación que requiere una desición aleatoria, la máquina eligirá una posición "aleatoria".
Si eres un buen jugador, el resultado esperado es un empate.
