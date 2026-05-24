#!/usr/bin/env python3
"""Screenshot v4 mockups (hero 1920x1080, account 1600x900) → images/."""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
IMG = HERE.parent / "images"

TARGETS = [
    ("hero.html",    "hero-mockup.png",          1920, 1080),
    ("account.html", "account-screenshot-v4.png", 1600,  900),
]

def shoot(p, src: Path, out: Path, w: int, h: int) -> None:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": w, "height": h}, device_scale_factor=2)
    page = ctx.new_page()
    page.goto(src.as_uri(), wait_until="networkidle")
    page.wait_for_timeout(800)
    page.screenshot(path=str(out), clip={"x": 0, "y": 0, "width": w, "height": h}, omit_background=False)
    browser.close()
    print(f"wrote {out} ({out.stat().st_size // 1024} KB)")

def main() -> int:
    IMG.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        for html, png, w, h in TARGETS:
            src = HERE / html
            if not src.exists():
                print(f"skip {html} (not found)", file=sys.stderr)
                continue
            shoot(p, src, IMG / png, w, h)
    return 0

if __name__ == "__main__":
    sys.exit(main())
