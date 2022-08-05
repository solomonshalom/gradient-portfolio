import type { NextApiRequest, NextApiResponse } from "next"
import chrome from "chrome-aws-lambda"

interface IQuery {
  url?: string
  colorScheme?: "light" | "dark"
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url, colorScheme } = req.query as IQuery
  const startTime = Date.now()

  if (url) {
    const browser = await chrome.puppeteer.launch(
      process.env.NODE_ENV === "production"
        ? {
            args: chrome.args,
            executablePath: await chrome.executablePath,
            headless: chrome.headless,
          }
        : {}
    )

    const page = await browser.newPage()

    const viewportOptions = {
      width: 1280,
      height: 764,
      deviceScaleFactor: 1,
    }

    await page.setViewport(viewportOptions)
    await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: colorScheme || "light" }])

    // Max execution time for serverless function is 10 seconds
    // Therefore, we limit page load for up to 8 seconds to avoid timeout
    const elapsedTime = Date.now() - startTime
    const executionTimeout = new Promise(resolve => setTimeout(resolve, 8000 - elapsedTime))
    const waitForPageLoad = page.goto(url, { waitUntil: "networkidle2" })
    await Promise.race([waitForPageLoad, executionTimeout])

    const imageBuffer = await page.screenshot()

    await browser.close()
    res.setHeader("Content-Type", "image/webp")
    res.setHeader("Cache-Control", "s-maxage=1440000")
    res.status(200).end(imageBuffer)
  } else {
    res.status(404)
  }
}
