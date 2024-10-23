# Тетрис на JavaScript

Добро пожаловать в проект **Тетрис на JavaScript**! Этот проект представляет собой классическую игру Тетрис, реализованную с использованием HTML, CSS и JavaScript. Вы можете играть в игру прямо в браузере, управляя падающими фигурами и стараясь набрать как можно больше очков.

## Оглавление

- [Особенности](#особенности)
- [Демо](#демо)
- [Установка](#установка)
- [Использование](#использование)
- [Управление](#управление)
- [Структура проекта](#структура-проекта)
- [Планы по развитию](#планы-по-развитию)
- [Содействие](#содействие)
- [Лицензия](#лицензия)

## Особенности

- **Классический геймплей**: Реализованы все основные механики классического Тетриса.
- **Управление с клавиатуры**: Поддерживаются стрелки для перемещения фигур, пробел для паузы и другие горячие клавиши.
- **Функция "Холд"**: Возможность удерживать фигуру для использования в дальнейшем.
- **Отображение следующей фигуры**: Предварительный просмотр следующей падающей фигуры.
- **Система очков и уровней**: Набирайте очки за удаление линий и повышайте уровень сложности.
- **Сохранение рекорда**: Рекордный счет сохраняется между сеансами игры с использованием `localStorage`.
- **Адаптивный дизайн**: Игра корректно отображается на различных разрешениях экрана.

## Демо

Вы можете ознакомиться с демо-версией игры по [этой ссылке](#https://hs2ys.github.io/My-tetris/). 

## Установка

1. **Клонируйте репозиторий:**

   ```bash
   git clone https://github.com/HS2YS/My-tetris.git
   ```

2. **Перейдите в папку проекта:**

   ```bash
   cd My-tetris
   ```

3. **Откройте файл `index.html` в вашем браузере:**

   - Либо просто дважды кликните по файлу `index.html`.
   - Либо запустите локальный сервер и откройте страницу в браузере.

## Использование

Просто откройте игру в браузере и нажмите кнопку "Старт", чтобы начать новую игру. Управляйте падающими фигурами с помощью клавиатуры, создавайте полные горизонтальные линии и набирайте очки!

## Управление

- **←** (левая стрелка): перемещение фигуры влево.
- **→** (правая стрелка): перемещение фигуры вправо.
- **↑** (верхняя стрелка): поворот фигуры.
- **↓** (нижняя стрелка): ускоренное падение фигуры.
- **Пробел**: пауза/продолжение игры.
- **NumPad 0**: удержание текущей фигуры (функция "Холд").

## Структура проекта

- `index.html` — основной HTML-файл, содержащий структуру страницы и элементы игры.
- `css/style.css` — стилизация игры с использованием CSS.
- `js/app.js` — основной JavaScript-код игры, реализующий логику и взаимодействие.
- `README.md` — документация проекта.

## Планы по развитию (ЗАКРЫТ)

- **Добавление звуковых эффектов**: звуки для поворота фигур, удаления линий и т.д.
- **Улучшение графики**: добавление анимаций и улучшение визуальных эффектов.
- **Мобильная версия**: оптимизация управления и интерфейса для мобильных устройств.
- **Онлайн-таблица лидеров**: возможность соревноваться с другими игроками.
- **Режимы игры**: добавление новых режимов, таких как "Марафон", "Спидран" и т.д.

## Содействие

Будем рады вашему вкладу в развитие проекта! Если у вас есть идеи или вы нашли ошибки, пожалуйста, открывайте [Issue](https://github.com/HS2YS/My-tetris.git/issues) или отправляйте [Pull Request](https://github.com/HS2YS/My-tetris.git/pulls).

### Как внести вклад

1. **Форкните репозиторий.**
2. **Создайте ветку с новой функцией или исправлением:**

   ```bash
   git checkout -b feature/название-функции
   ```

3. **Внесите изменения и сделайте коммит:**

   ```bash
   git commit -m "Добавлена новая функция"
   ```

4. **Отправьте изменения в свой форк:**

   ```bash
   git push origin feature/название-функции
   ```

5. **Создайте Pull Request в основной репозиторий.**

## Лицензия

Этот проект распространяется под лицензией [MIT](LICENSE).

---

Спасибо за интерес к проекту! Наслаждайтесь игрой и не забудьте поставить звезду на GitHub 🌟
