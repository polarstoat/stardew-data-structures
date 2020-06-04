const Day = require('./Day');
const Season = require('./Season');

// Represents 10 minutes in-game
const TIME_STEP = 1;

const HOUR_LENGTH = 6;
const DAY_LENGTH = 20;
const WEEK_LENGTH = 7;
const SEASON_LENGTH = 4 * WEEK_LENGTH;
const YEAR_LENGTH = 4;

const HOUR = TIME_STEP * HOUR_LENGTH;
const DAY = HOUR * DAY_LENGTH;
const SEASON = DAY * SEASON_LENGTH;
const YEAR = SEASON * YEAR_LENGTH;

/**
 * Convert a number to a string, and add leading zeros until it is 2 characters long
 *
 * @param  {number} num The number to convert
 * @returns {string}     The converted number, with leading zeros added if necessary
 */
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
    const minutes = Math.floor(this.value / TIME_STEP) % HOUR_LENGTH;

    // Multiplied by 10 because each 10 minutes in-game is represented by 1 here
    return minutes * 10;
  }

  getHours() {
    const hours = Math.floor(this.value / HOUR) % DAY_LENGTH;

    // Add 6 because in-game each day starts at 06:00
    // Then modulo 24 to turn 24:00 and 25:00 into 00:00 and 01:00 respectively
    return (hours + 6) % 24;
  }

  getDay() {
    const day = Math.floor(this.value / DAY) % WEEK_LENGTH;

    return new Day(day);
  }

  getDate() {
    const date = Math.floor(this.value / DAY) % SEASON_LENGTH;

    // Add 1 because humans don't count dates from 0
    return date + 1;
  }

  getSeason() {
    const season = Math.floor(this.value / SEASON) % YEAR_LENGTH;

    return new Season(season);
  }

  getYear() {
    const year = Math.floor(this.value / YEAR);

    // Add 1 because game doesn't count years from 0
    return year + 1;
  }

  toString() {
    return `${this.getDay().getShortName()} ${this.getSeason()} ${this.getDate()} Year ${this.getYear()} ${leadingZeros(this.getHours())}:${leadingZeros(this.getMinutes())}`;
  }

  setMinutes(minutes) {
    if (!Number.isInteger(minutes) || minutes < 0 || minutes >= ((HOUR_LENGTH * TIME_STEP) * 10) || minutes % 10 !== 0) throw new Error(`Invalid minutes: '${minutes}'`);

    this.value -= (this.getMinutes() / 10) * TIME_STEP;
    this.value += (minutes / 10) * TIME_STEP;
  }

  setHours(hours) {
    if (!Number.isInteger(hours) || hours < 0 || hours >= 24 || (hours >= 2 && hours < 6)) throw new Error(`Invalid hours: '${hours}'`);

    this.value -= ((this.getHours() + 18) % 24) * HOUR;
    this.value += ((hours + 18) % 24) * HOUR;
  }

  setDate(date) {
    if (!Number.isInteger(date) || date < 0 || date >= SEASON_LENGTH) throw new Error(`Invalid date: '${date}'`);

    this.value -= (this.getDate() - 1) * DAY;
    this.value += (date - 1) * DAY;
  }

  setSeason(season) {
    // The Season constructor has its own input checks

    this.value -= this.getSeason() * SEASON;
    this.value += new Season(season) * SEASON;
  }

  setYear(year) {
    if (!Number.isInteger(year) || year < 0) throw new Error(`Invalid year: '${year}'`);

    this.value -= (this.getYear() - 1) * YEAR;
    this.value += (year - 1) * YEAR;
  }
}

module.exports = StardewDate;
