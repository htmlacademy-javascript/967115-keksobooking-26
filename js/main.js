// Генерирует случайное целое число между min и max.
// Если минимальное значение больше максимального, их нужно поменять местами.
// Это позволит включить в диапазон нижнюю границу и исключить верхнюю.
// При равных значениях min и max, сгенерированное число будет равно им. Специально не обрабатывается
// Описание Math.random() — https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Описание Math.round() – https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/round
// Число округляется по правилам математики
function generateIntegerNumberBetween(min, max) {
  if (min > max) {
    const swap = max;
    max = min;
    min = swap;
  }
  if (max < 0) {
    // значит, весь диапазон отрицательный
    return 'sorry, can\'t do that';
  } else if (min < 0) {
    // значит, левая граница меньше нуля, правая — больше или равна 0. С этим можно работать
    min = 0; //
  }

  // дальше работаем с «неотрицательным диапазоном»
  return Math.round(Math.random() * (max - min) + min);
}

generateIntegerNumberBetween(-20, 10);

// Генерирует число с плавающей точкой в диапазоне от min до max
// Число знаков после запятой передаётся как параметр
function generateNumberBetweenFixed (min, max, digits) {
  if (min > max) {
    const swap = max;
    max = min;
    min = swap;
  }
  if (max < 0) {
    // значит, весь диапазон отрицательный
    return 'sorry, can\'t do that';
  } else if (min < 0) {
    // значит, левая граница меньше нуля, правая — больше или равна 0. С этим можно работать
    min = 0; //
  }
  return (Math.random() * (max - min) + min).toFixed(digits);
}

generateNumberBetweenFixed(1.1, 1.2, 4);

// Обдумать решение в лоб:
// При обрезании сгенерированного числа «в лоб» оно округляется в большую сторону.
// Чтобы округлить в меньшую, можно умножить число на 10 в степени digits (Math.pow),
// округлить число вниз (Math.floor) и поделить на 10 в степени digits
