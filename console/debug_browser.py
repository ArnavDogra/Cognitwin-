import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        # Listen for console events
        page.on("console", lambda msg: print(f"Browser Console: {msg.type} {msg.text}"))
        page.on("pageerror", lambda err: print(f"Browser Error: {err}"))
        
        print("Navigating to http://localhost:5173 ...")
        try:
            await page.goto("http://localhost:5173", wait_until="networkidle", timeout=10000)
            print("Navigation finished.")
        except Exception as e:
            print("Error navigating:", e)
            
        await asyncio.sleep(2)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
