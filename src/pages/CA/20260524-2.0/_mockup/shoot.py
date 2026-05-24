#!/usr/bin/env python3
"""Screenshot the account.html mockup at exactly 1600x900 and save to images/."""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
HTML = HERE / "account.html"
OUT = HERE.parent / "images" / "account-screenshot.png"

def main() -> int:
    if not HTML.exists():
        print(f"missing {HTML}", file=sys.stderr)
        return 1
    OUT.parent.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(
            viewport={"width": 1600, "height": 900},
            device_scale_factor=2,
        )
        page = ctx.new_page()
        page.goto(HTML.as_uri(), wait_until="networkidle")
        page.wait_for_timeout(800)
        page.screenshot(
            path=str(OUT),
            clip={"x": 0, "y": 0, "width": 1600, "height": 900},
            omit_background=False,
        )
        browser.close()

    size_kb = OUT.stat().st_size / 1024
    print(f"wrote {OUT} ({size_kb:.1f} KB)")
    return 0

if __name__ == "__main__":
    sys.exit(main())
