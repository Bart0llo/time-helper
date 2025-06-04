# TimeHelper

A simple, TypeScript-ready utility for working with timezones, UNIX epochs, and human-readable time using `moment-timezone`.

---

## ✨ Features

- 🌍 Support for timezones (including custom offsets like `UTC+2`)
- ⏱️ Current time in epoch (UNIX) format
- 📅 Convert between Date, epoch, and ISO strings
- 🕓 Human-readable "time ago"
- 📐 Compare two timestamps
- 🎯 Format epochs with custom format validation

---

## 📦 Installation

```bash
npm install time-helper
```

---

## 🚀 Quick Start

```ts
import { TimeHelper } from 'time-helper'

const time = new TimeHelper('UTC+2')

console.log(time.epochNow()) // current time in seconds
```

---

## 🧰 API Reference

### `constructor(timezone?: string)`

Initialize the helper with a timezone. Accepts strings like `'UTC+2'`. For more on UTC offsets and timezones, see [kintone docs](https://get.kintone.help/general/en/id/020116.html) or [Wikipedia - UTC](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

```ts
const time = new TimeHelper('UTC+1')
```

---

### `epochNow(): number`

Get the current time as a UNIX timestamp in seconds.

```ts
const now = time.epochNow()
```

---

### `epochAdd(amount: number, unit: moment.unitOfTime.DurationConstructor): number`

Add time to now, returning an updated UNIX timestamp.

```ts
const future = time.epochAdd(1, 'day')
```

---

### `toEpoch(date: Date): number`

Convert a JavaScript `Date` object to epoch in the configured timezone.

```ts
const epoch = time.toEpoch(new Date())
```

---

### `toDate(epoch: number): Date`

Convert an epoch timestamp back to a JavaScript `Date`.

```ts
const date = time.toDate(1717500000)
```

---

### `toISOString(epoch: number): string`

Get an ISO 8601 string for a given epoch in the current timezone.

```ts
const iso = time.toISOString(1717500000)
```

---

### `toLocalISOString(epoch: number): string`

Get a localized ISO string (e.g. `2025-06-04T21:00:00+02:00`) from an epoch.

```ts
const local = time.toLocalISOString(1717500000)
```

---

### `isBefore(epoch1: number, epoch2: number): boolean`

Check if the first timestamp is before the second.

```ts
const result = time.isBefore(1717400000, 1717500000)
```

---

### `isAfter(epoch1: number, epoch2: number): boolean`

Check if the first timestamp is after the second.

```ts
const result = time.isAfter(1717500000, 1717400000)
```

---

### `timeAgo(epoch: number): string`

Return a human-readable string like "5 minutes ago".

```ts
const ago = time.timeAgo(1717400000)
```

---

### `formatDate(epoch: number, format: string): string`

Format the epoch using a valid `moment` format string.

```ts
const formatted = time.formatDate(1717500000, 'YYYY-MM-DD HH:mm:ss')
```

---

## 🧾 Supported Format Tokens

You can use the following tokens in `formatDate`:

- `YYYY`, `YY`
- `M`, `MM`, `MMM`, `MMMM`
- `D`, `DD`, `Do`
- `H`, `HH`, `h`, `hh`
- `m`, `mm`
- `s`, `ss`
- `a`, `A`
- `Z`, `ZZ`
- `ddd`, `dddd`

> Any unsupported format string will throw an error.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to open an issue or submit a pull request.
