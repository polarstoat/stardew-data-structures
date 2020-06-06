const SEASONS = ['Spring', 'Summer', 'Fall', 'Winter'];

class Season {
  constructor(index) {
    if (
      !Number.isInteger(index)
      || index < 0
      || index >= SEASONS.length
    ) throw new Error(`Invalid season index: '${index}'`);

    this.index = index;
  }

  static SEASONS() {
    return SEASONS;
  }

  getName() {
    return SEASONS[this.index];
  }

  toString() {
    return this.getName();
  }
}

module.exports = Season;
