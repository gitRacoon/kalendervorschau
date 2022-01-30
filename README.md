# Kalendervorschau
Генератор календаря базового вида.

## Базовое использование
Для инициализации необходимо создать экземпляр класса.
```javascript
const kalender = new Kalendervorschau(element [, params]);
```
>Поиграть с кодом можно здесь: stackblitz.

## Передаваемые параметры
### element
Обязательный параметр, тип `HTMLElemnt`. Внутри этого элемента будет выведен календарь.

### params
Необязательный параметр, кастомный тип `Params`.

## Кастомные типы
### Params
```
classList?: ClassList;
firstWeekday?: number;
weekdayList?: string[];
```

### ClassList
```
currentMonthsDay?: string;
currentMonthsWrapper?: string;
mainWrapper?: string;
nextMonthsDay?: string;
nextMonthsWrapper?: string;
previewMonthsDay?: string;
previewMonthsWrapper?: string;
weekday?: string;
weekdayWrapper?: string;
```

## Настраиваемые параметры
### classList
Список кастомных классов, которые будут присвоены указанным элементам календаря.

### firstWeekday
Первый день в неделе. Параметр принимает число от 0 до 6 (где 0 - это воскресенье).

### weekdayList
Список дней недели, который будет выведен в соответсвующем элементе на странице. Первым элементом должно быть воскресенье.

## Методы
### refresh
>(): void

Заменяет календарь на последний сгенерированный (включая последнюю выбранную дату).

### changePeriod
>(year: number, month: number): void

Генерирует календарь на основе указанного периода. Месяц должен быть указан от 0 до 11 (где 0 - это январь).

## Структура HTML
Дата-атрибут `date` содержит дату выбранного дня в формате [DateString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toDateString).
```html
<div data-role="main-wrap">
  <div data-wrapper="weekday" data-role="weekday-wrap">
    <span data-role="weekday">
      <!-- weekday name -->
    </span>
    <!-- more weekdays -->
  </div>
  <div data-wrapper="day" data-role="day-wrap">
    <span data-month-sequence="preview" data-role="day" data-date="Mon Dec 27 2021">
      <!-- number of day -->
    </span>
    <!-- more days in preview month -->
    <span data-month-sequence="current" data-role="day" data-date="Sat Jan 01 2022">
      <!-- number of day -->
    </span>
    <!-- more days in current month -->
    <span data-month-sequence="next" data-role="day" data-date="Tue Feb 01 2022">
      <!-- number of day -->
    </span>
    <!-- more days in next month -->
  </div>
</div>
```
