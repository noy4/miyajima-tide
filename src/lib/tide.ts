/**
 * [気象庁 | 潮汐・海面水位のデータ 潮位表　広島（HIROSHIMA）](https://www.data.jma.go.jp/kaiyou/db/tide/suisan/suisan.php?stn=Q8)
 * ex. 'https://www.data.jma.go.jp/kaiyou/data/db/tide/suisan/txt/2025/Q8.txt'
 */
export async function getTideData() {
  const currentYear = new Date().getFullYear()
  const locationCode = 'Q8' // 広島
  const url = `https://www.data.jma.go.jp/kaiyou/data/db/tide/suisan/txt/${currentYear}/${locationCode}.txt`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const text = await response.text()
  const tideData = parseTideFile(text)
  return tideData
}

export interface Tide {
  date: string
  location: string
  hourlyTide: number[]
  highTides: { time: string | null, tide: number | null }[]
  lowTides: { time: string | null, tide: number | null }[]
}

/**
 * [気象庁 | 潮汐・海面水位のデータ 潮汐観測資料 テキストファイルフォーマット](https://www.data.jma.go.jp/kaiyou/db/tide/genbo/format.html)
 */
function parseTideLine(line: string): Tide {
  const hourlyTide = []
  for (let i = 0; i < 72; i += 3) {
    hourlyTide.push(Number.parseInt(line.slice(i, i + 3), 10))
  }

  const year = 2000 + Number.parseInt(line.slice(72, 74), 10)
  const month = Number.parseInt(line.slice(74, 76), 10)
  const day = Number.parseInt(line.slice(76, 78), 10)
  const date = `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`

  const location = line.slice(78, 80).trim()

  const highTides = []
  for (let i = 80; i < 108; i += 7) {
    const timeStr = line.slice(i, i + 4)
    const tideStr = line.slice(i + 4, i + 7)
    highTides.push(
      timeStr === '9999'
        ? { time: null, tide: null }
        : {
            time: `${timeStr.slice(0, 2).trim().padStart(2, '0')}:${timeStr.slice(2).trim().padStart(2, '0')}`,
            tide: Number.parseInt(tideStr, 10),
          },
    )
  }

  const lowTides = []
  for (let i = 108; i < 136; i += 7) {
    const timeStr = line.slice(i, i + 4)
    const tideStr = line.slice(i + 4, i + 7)
    lowTides.push(
      timeStr === '9999'
        ? { time: null, tide: null }
        : {
            time: `${timeStr.slice(0, 2).trim().padStart(2, '0')}:${timeStr.slice(2).trim().padStart(2, '0')}`,
            tide: Number.parseInt(tideStr, 10),
          },
    )
  }

  return {
    date,
    location,
    hourlyTide,
    highTides,
    lowTides,
  }
}

function parseTideFile(text: string) {
  return text
    .split('\n')
    .map(parseTideLine)
}
