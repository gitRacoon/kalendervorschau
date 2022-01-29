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
