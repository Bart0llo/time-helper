import moment from "moment-timezone";

export class TimeHelper {
  private timezone: string;

  constructor(timezone: string = "UTC+1") {
    this.timezone = TimeHelper.normalizeTimezone(timezone);
  }

  static allowedTokens = [
    "YYYY",
    "YY",
    "M",
    "MM",
    "MMM",
    "MMMM",
    "D",
    "DD",
    "Do",
    "H",
    "HH",
    "h",
    "hh",
    "m",
    "mm",
    "s",
    "ss",
    "a",
    "A",
    "Z",
    "ZZ",
    "ddd",
    "dddd",
  ];

  static normalizeTimezone(input: string): string {
    const match = input.match(/^UTC([+-]\d{1,2})$/);
    if (match) {
      const offset = parseInt(match[1], 10);
      const etcZone = `Etc/GMT${offset > 0 ? `-${offset}` : `+${Math.abs(offset)}`}`;
      return etcZone;
    }
    return input;
  }

  static isValidFormat(format: string): boolean {
    const tokens = format.match(/([A-Za-z]+)/g);
    if (!tokens) return true;
    return tokens.every((token) => TimeHelper.allowedTokens.includes(token));
  }

  /**
   * Returns the current time as a Unix timestamp (in seconds)
   * based on the configured timezone.
   *
   * @returns The current Unix timestamp.
   */
  epochNow(): number {
    return moment.tz(this.timezone).unix();
  }

  /**
   * Adds a specified duration to the current time in the configured timezone
   * and returns the resulting Unix timestamp (in seconds).
   *
   * @param {number} amount - The number of time units to add. Must be positive.
   * @param {moment.unitOfTime.DurationConstructor} unit - The unit of time to add (e.g., 'days', 'hours').
   * @returns {number} The resulting Unix timestamp after addition.
   * @throws {Error} If the amount is not a positive number.
   */
  epochAdd(
    amount: number,
    unit: moment.unitOfTime.DurationConstructor
  ): number {
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }
    return moment.tz(this.timezone).add(amount, unit).unix();
  }

  /**
   * Converts the given date to a Unix timestamp (in seconds)
   * based on the configured timezone.
   *
   * @param {Date} date - The date to convert.
   * @returns {number} The Unix timestamp corresponding to the given date.
   */
  toEpoch(date: Date): number {
    return moment.tz(date, this.timezone).unix();
  }

  /**
   * Converts a Unix timestamp (in seconds) to a JavaScript Date object
   * using the configured timezone.
   *
   * @param {number} epoch - The Unix timestamp to convert.
   * @returns {Date} The corresponding Date object in the configured timezone.
   */
  toDate(epoch: number): Date {
    return moment.unix(epoch).tz(this.timezone).toDate();
  }

  /**
   * Converts a Unix timestamp (in seconds) to an ISO 8601 string
   * using the configured timezone.
   *
   * @param {number} epoch - The Unix timestamp to convert.
   * @returns {string} The ISO 8601 formatted string in the configured timezone.
   */
  toISOString(epoch: number): string {
    return moment.unix(epoch).tz(this.timezone).toISOString();
  }

  /**
   * Converts a Unix timestamp (in seconds) to a timezone-aware ISO 8601 string
   * using the configured timezone.
   *
   * @param {number} epoch - The Unix timestamp to convert.
   * @returns {string} The ISO 8601 formatted string in the configured timezone (e.g., "2025-06-15T14:30:00+02:00").
   */
  toLocalISOString(epoch: number): string {
    return moment.unix(epoch).tz(this.timezone).format("YYYY-MM-DDTHH:mm:ssZ");
  }

  /**
   * Compares two Unix timestamps (in seconds) and checks if the first
   * occurs before the second, using the configured timezone.
   *
   * @param {number} epoch1 - The first Unix timestamp.
   * @param {number} epoch2 - The second Unix timestamp to compare against.
   * @returns {boolean} `true` if epoch1 is before epoch2; otherwise, `false`.
   */
  isBefore(epoch1: number, epoch2: number): boolean {
    return moment
      .unix(epoch1)
      .tz(this.timezone)
      .isBefore(moment.unix(epoch2).tz(this.timezone));
  }

  /**
   * Compares two Unix timestamps (in seconds) and checks if the first
   * occurs after the second, using the configured timezone.
   *
   * @param {number} epoch1 - The first Unix timestamp.
   * @param {number} epoch2 - The second Unix timestamp to compare against.
   * @returns {boolean} `true` if epoch1 is after epoch2; otherwise, `false`.
   */
  isAfter(epoch1: number, epoch2: number): boolean {
    return moment
      .unix(epoch1)
      .tz(this.timezone)
      .isAfter(moment.unix(epoch2).tz(this.timezone));
  }
  /**
   * Returns a human-readable relative time string (e.g., "3 hours ago")
   * for the given Unix timestamp, based on the configured timezone.
   *
   * @param {number} epoch - The Unix timestamp to convert.
   * @returns {string} A relative time string from the current moment.
   */
  timeAgo(epoch: number): string {
    const time = moment.unix(epoch).tz(this.timezone);
    return time.fromNow();
  }

  /**
   * Formats a Unix timestamp (in seconds) into a string
   * according to the specified date/time format and configured timezone.
   *
   * @param {number} epoch - The Unix timestamp to format.
   * @param {string} format - The Moment.js date/time format string.
   *                         Must be valid according to `TimeHelper.isValidFormat`.
   * @returns {string} The formatted date/time string.
   * @throws {Error} Throws if the format string is invalid.
   */
  formatDate(epoch: number, format: string): string {
    if (!TimeHelper.isValidFormat(format)) {
      throw new Error("Invalid date format");
    }
    return moment.unix(epoch).tz(this.timezone).format(format);
  }
}
