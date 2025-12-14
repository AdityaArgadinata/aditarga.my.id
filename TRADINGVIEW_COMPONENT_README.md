# TradingViewChart Component

Komponen React untuk embed chart TradingView yang dapat dikustomisasi di artikel berita MDX.

## Penggunaan Dasar

```jsx
<TradingViewChart symbol='IDX:BRMS' theme='dark' height={500} />
```

## Props Lengkap

| Prop                | Type                | Default                    | Deskripsi                                        |
| ------------------- | ------------------- | -------------------------- | ------------------------------------------------ |
| `symbol`            | `string`            | `"IDX:BRMS"`               | Symbol saham (contoh: "IDX:BRMS", "NASDAQ:AAPL") |
| `theme`             | `"light" \| "dark"` | `"dark"`                   | Tema chart                                       |
| `interval`          | `string`            | `"D"`                      | Interval chart (D=daily, W=weekly, M=monthly)    |
| `width`             | `string \| number`  | `"100%"`                   | Lebar chart                                      |
| `height`            | `string \| number`  | `400`                      | Tinggi chart                                     |
| `allowSymbolChange` | `boolean`           | `true`                     | Izinkan user mengubah symbol                     |
| `hideSideToolbar`   | `boolean`           | `true`                     | Sembunyikan toolbar samping                      |
| `hideTopToolbar`    | `boolean`           | `false`                    | Sembunyikan toolbar atas                         |
| `hideLegend`        | `boolean`           | `false`                    | Sembunyikan legend                               |
| `hideVolume`        | `boolean`           | `false`                    | Sembunyikan volume indicator                     |
| `backgroundColor`   | `string`            | Otomatis berdasarkan theme | Warna background                                 |
| `gridColor`         | `string`            | Otomatis berdasarkan theme | Warna grid                                       |
| `locale`            | `string`            | `"en"`                     | Bahasa interface                                 |
| `timezone`          | `string`            | `"Etc/UTC"`                | Timezone                                         |
| `style`             | `string`            | `"1"`                      | Style chart (1=candlestick, 2=bar, etc.)         |
| `saveImage`         | `boolean`           | `true`                     | Izinkan save image                               |
| `calendar`          | `boolean`           | `false`                    | Tampilkan calendar                               |
| `details`           | `boolean`           | `false`                    | Tampilkan detail                                 |
| `hotlist`           | `boolean`           | `false`                    | Tampilkan hotlist                                |
| `withdateranges`    | `boolean`           | `false`                    | Tampilkan date ranges                            |
| `autosize`          | `boolean`           | `true`                     | Autosize chart                                   |
| `studies`           | `string[]`          | `[]`                       | Technical studies                                |
| `compareSymbols`    | `string[]`          | `[]`                       | Symbols untuk comparison                         |
| `watchlist`         | `string[]`          | `[]`                       | Watchlist symbols                                |

## Contoh Penggunaan

### Chart Saham Indonesia (BRMS)

```jsx
<TradingViewChart symbol='IDX:BRMS' theme='dark' interval='D' height={500} />
```

### Chart Saham Amerika (Apple)

```jsx
<TradingViewChart
  symbol='NASDAQ:AAPL'
  theme='light'
  interval='W'
  height={400}
  allowSymbolChange={false}
/>
```

### Chart dengan Technical Analysis

```jsx
<TradingViewChart
  symbol='CRYPTO:BTCUSD'
  theme='dark'
  interval='H'
  height={600}
  studies={['MASimple@tv-basicstudies', 'RSI@tv-basicstudies']}
  compareSymbols={['CRYPTO:ETHUSD']}
/>
```

### Chart Minimalis

```jsx
<TradingViewChart
  symbol='FOREX:EURUSD'
  theme='dark'
  height={300}
  hideSideToolbar={true}
  hideTopToolbar={true}
  hideLegend={true}
  hideVolume={true}
/>
```

## Catatan

- Komponen ini menggunakan TradingView Advanced Chart Widget
- Chart akan ter-load secara asynchronous
- Membutuhkan koneksi internet untuk data real-time
- Otomatis responsive dengan `autosize={true}`
- Copyright TradingView akan selalu ditampilkan
