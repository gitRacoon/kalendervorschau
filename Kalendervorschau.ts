export interface ClassList {
  currentMonthsDay?: string;
  currentMonthsWrapper?: string;
  mainWrapper?: string;
  nextMonthsDay?: string;
  nextMonthsWrapper?: string;
  previewMonthsDay?: string;
  previewMonthsWrapper?: string;
  weekday?: string;
  weekdayWrapper?: string;
}

export interface Params {
  classList?: ClassList;
  firstWeekday?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  weekdayList?: string[];
}

export const shortWeekdayListEn = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default class Kalendervorschau {
  readonly mainWrapper: HTMLDivElement;

  protected classList: ClassList;
  protected firstWeekDay: number;
  protected gridOfDays: HTMLSpanElement[];
  protected weekdayList: string[];

  constructor(protected element: HTMLElement, protected params: Params) {
    // Initialization of the required parameters.
    this.classList = params?.classList ?? {};
    this.firstWeekDay = params?.firstWeekday ?? 0;
    this.weekdayList = params?.weekdayList ?? shortWeekdayListEn;

    // Wrapper for content.
    this.mainWrapper = document.createElement("div");
    this.mainWrapper.className = this.classList.mainWrapper ?? "";
    this.mainWrapper.dataset.role = "main-wrap";

    // Primary output of the calendar.
    this.gridOfDays = this.generateMonthGrid(
      new Date().getFullYear(),
      new Date().getMonth()
    );
    this.render();
  }

  /**
   * Clear all changes to the element's primary state.
   */
  public refresh() {
    this.element.replaceChildren(this.mainWrapper.cloneNode(true));
  }

  /**
   * Specify the period (year and month) to display in the calendar.
   */
  public changePeriod(year: number, month: number) {
    this.gridOfDays = this.generateMonthGrid(year, month);
    this.render();
  }

  private generateWeekdaysList() {
    // Permutation of the list of day of the week, taking into account the first day.
    const weekdayList = [
      ...this.weekdayList.slice(this.firstWeekDay),
      ...this.weekdayList.slice(0, this.firstWeekDay),
    ];

    // Create items based on a list of weekdays.
    return weekdayList.map((dayName) => {
      const weekday = document.createElement("span");
      weekday.className = this.classList.weekday ?? "";
      weekday.dataset.role = "weekday";
      weekday.textContent = dayName;
      return weekday;
    });
  }

  private generateMonthGrid(year: number, month: number) {
    const gridOfDays = [];

    // Days of the previous month. The period depends on the first day of the week.
    const previewMonthsLength = new Date(year, month, 0).getDate();
    let previewMonthsWeekday =
      new Date(year, month, 0).getDay() + 1 - this.firstWeekDay;
    if (previewMonthsWeekday < 0)
      previewMonthsWeekday = 7 - Math.abs(previewMonthsWeekday);
    for (let count = 0; count < previewMonthsWeekday; count++) {
      const numberOfDay = previewMonthsLength - count;
      const day = document.createElement("span");

      day.className = this.classList.previewMonthsDay ?? "";
      day.dataset.monthSequence = "preview";
      day.dataset.role = "day";
      day.dataset.date = new Date(year, month - 1, numberOfDay).toDateString();
      day.textContent = String(numberOfDay);

      gridOfDays.unshift(day);
    }

    // Days of the current month.
    const currentMonthLength = new Date(year, month + 1, 0).getDate();
    for (let count = 1; count <= currentMonthLength; count++) {
      const day = document.createElement("span");

      day.className = this.classList.currentMonthsDay ?? "";
      day.dataset.monthSequence = "current";
      day.dataset.role = "day";
      day.dataset.date = new Date(year, month, count).toDateString();
      day.textContent = String(count);

      gridOfDays.push(day);
    }

    // Days of next month. Calculated from the remaining free cells.
    const filledPartsLength = 42 - gridOfDays.length;
    for (let count = 1; count <= filledPartsLength; count++) {
      const day = document.createElement("span");

      day.className = this.classList.nextMonthsDay ?? "";
      day.dataset.monthSequence = "next";
      day.dataset.role = "day";
      day.dataset.date = new Date(year, month + 1, count).toDateString();
      day.textContent = String(count);

      gridOfDays.push(day);
    }

    return gridOfDays;
  }

  private render() {
    // Wrapper for the days of the week.
    const weekdayWrapper = document.createElement("div");
    weekdayWrapper.className = this.classList.weekdayWrapper ?? "";
    weekdayWrapper.dataset.wrapper = "weekday";
    weekdayWrapper.dataset.role = "weekday-wrap";
    weekdayWrapper.innerHTML = "";
    weekdayWrapper.append(...this.generateWeekdaysList());

    // Wrapper for a grid of days.
    const gridWrapper = document.createElement("div");
    gridWrapper.className = this.classList.currentMonthsWrapper ?? "";
    gridWrapper.dataset.wrapper = "day";
    gridWrapper.dataset.role = "day-wrap";
    gridWrapper.innerHTML = "";
    gridWrapper.append(...this.gridOfDays);

    // Adding elements to the page.
    this.mainWrapper.innerHTML = "";
    this.mainWrapper.append(weekdayWrapper, gridWrapper);
    this.element.replaceChildren(this.mainWrapper.cloneNode(true));
  }
}
