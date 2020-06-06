const DAYS = [
  {
    initial: 'M',
    short: 'Mon',
    name: 'Monday',
  },
  {
    initial: 'T',
    short: 'Tue',
    name: 'Tuesday',
  },
  {
    initial: 'W',
    short: 'Wed',
    name: 'Wednesday',
  },
  {
    initial: 'Th',
    short: 'Thu',
    name: 'Thursday',
  },
  {
    initial: 'F',
    short: 'Fri',
    name: 'Friday',
  },
  {
    initial: 'Sa',
    short: 'Sat',
    name: 'Saturday',
  },
  {
    initial: 'Su',
    short: 'Sun',
    name: 'Sunday',
  },
];

class Day {
  constructor(index) {
    if (
      !Number.isInteger(index)
      || index < 0
      || index >= DAYS.length
    ) throw new Error(`Invalid day index: '${index}'`);

    this.index = index;
  }

  static DAYS() {
    return DAYS;
  }

  getInitial() {
    return DAYS[this.index].initial;
  }

  getShortName() {
    return DAYS[this.index].short;
  }

  getName() {
    return DAYS[this.index].name;
  }

  toString() {
    return this.getName();
  }
}

module.exports = Day;
