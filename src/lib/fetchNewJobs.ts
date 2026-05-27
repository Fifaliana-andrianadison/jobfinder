import type { Job } from "./types"

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTQ73CN6rVeoaEqiFOGDiPMIJFxGSDeTxgZil7MKqx20bp82ylTzeMOqxXY4pxRMlAjTeRL0e0RlM5N/pub?gid=755498553&single=true&output=csv"

export async function fetchNewJobs(): Promise<Job[]> {
  const response = await fetch(CSV_URL)
  const csvText = await response.text()
  const lines = csvText.split("\n")
  const jobs: Job[] = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    const values = parseCSVLine(line)
    if (values.length >= 5) {
      jobs.push({
        jobTitle: values[0]?.replace(/^"|"$/g, "") || "",
        companyName: values[1]?.replace(/^"|"$/g, "") || "",
        salaryRange: values[2]?.replace(/^"|"$/g, "") || "",
        techStack: values[3]?.replace(/^"|"$/g, "") || "",
        location: values[4]?.replace(/^"|"$/g, "") || "",
        jobUrl: values[5]?.replace(/^"|"$/g, "") || "",
        postedDate: values[6]?.replace(/^"|"$/g, "") || "",
        applicationStatus: values[7]?.replace(/^"|"$/g, "") || "",
      })
    }
  }
  return jobs
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === "," && !inQuotes) {
      result.push(current)
      current = ""
    } else {
      current += char
    }
  }
  result.push(current)
  return result
}
