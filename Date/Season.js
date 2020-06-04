const SEASONS = ['Spring', 'Summer', 'Fall', 'Winter'];

class Season {
  /**
   * Create a new instance of Season
   *
   * @param  {(string|number)} param A string representation of the season, or a zero-indexed
   *                                   integer of the season (e.g. 0=Spring, 1=Summer, etc.)
   * @returns {Season}                An instance of Season
   * @borrows Season#getName as Season#toString
   */
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

  /**
   * Get an array of the seasons, in order
   *
   * @returns {Array} An array of the seasons, in order
   * @static
   */
  static SEASONS() {
    return SEASONS;
  }

  /**
   * Get the name of the season
   *
   * @returns {string} The name of the season
   */
  getName() {
    return SEASONS[this.index];
  }

  valueOf() {
    return this.index;
  }

  toString() {
    return this.getName();
  }
}

module.exports = Season;
