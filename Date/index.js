const Day = require('./Day');
const Season = require('./Season');

/**
 * Represents 10 minutes in-game
 * @type {Number}
 */
const TIME_STEP = 1;

const HOUR_LENGTH = 6;
const DAY_LENGTH = 20;
const WEEK_LENGTH = 7;
const SEASON_LENGTH = 4;
const YEAR_LENGTH = 4;

const HOUR = TIME_STEP * HOUR_LENGTH;
const DAY = HOUR * DAY_LENGTH;
const WEEK = DAY * WEEK_LENGTH;
const SEASON = WEEK * SEASON_LENGTH;
const YEAR = SEASON * YEAR_LENGTH;

function leadingZeros(num) {
  return num.toString().padStart(2, '0');
}

class StardewDate {
  constructor(value) {
    if (typeof value === 'undefined') this.value = 0;
    else if (value < 0 || !Number.isInteger(value)) throw new Error('Invalid time value');
    else this.value = value;
  }

  valueOf() {
    return this.value;
  }

  getMinutes() {
    return (Math.floor(this.value / TIME_STEP) % HOUR_LENGTH) * 10;
  }

  getHours() {
    return ((Math.floor(this.value / HOUR) % DAY_LENGTH) + 6) % 24;
  }

  getDay() {
    return new Day(Math.floor(this.value / DAY) % WEEK_LENGTH);
  }

  getDate() {
    return (Math.floor(this.value / DAY) % (WEEK_LENGTH * SEASON_LENGTH)) + 1;
  }

  getSeason() {
    return new Season(Math.floor(this.value / SEASON) % YEAR_LENGTH);
  }

  getYear() {
    return Math.floor(this.value / YEAR) + 1;
  }

  toString() {
    return `${this.getDay().getShortName()} ${this.getSeason()} ${this.getDate()} Year ${this.getYear()} ${leadingZeros(this.getHours())}:${leadingZeros(this.getMinutes())}`;
  }
}

module.exports = StardewDate;
