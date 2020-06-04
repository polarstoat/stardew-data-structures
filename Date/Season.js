const SEASONS = ['Spring', 'Summer', 'Fall', 'Winter'];

class Season {
  constructor(param) {
    // If param is a string, then look up its index in SEASONS
    if (typeof param === 'string') {
      const index = SEASONS.findIndex((season) => param.toLowerCase() === season.toLowerCase());

      if (index === -1) throw new Error(`Invalid season: '${param}'`);

      this.index = index;
    // If param is not a string, assume it is a number
    } else {
      if (!Number.isInteger(param) || param < 0 || param >= SEASONS.length) throw new Error(`Invalid season index: '${param}'`);

      this.index = param;
    }
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
