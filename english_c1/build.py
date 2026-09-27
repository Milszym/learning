#!/usr/bin/env python3
"""Build self-contained, single-file HTML pages.

Inlines every local stylesheet (<link rel="stylesheet" href="../assets/...">)
and script (<script src="../assets/..."></script>) so each page in dist/
works on its own: copy one file anywhere and it still renders.

Usage: python3 build.py   ->  dist/lessons/*.html, dist/reference/*.html
"""
import re
from pathlib import Path

ROOT = Path(__file__).parent
DIST = ROOT / "dist"
LINK = re.compile(r'<link rel="stylesheet" href="(?!https?:)([^"]+)">')
SCRIPT = re.compile(r'<script src="(?!https?:)([^"]+)"></script>')


def build(page: Path) -> str:
    html = page.read_text(encoding="utf-8")
    read = lambda href: (page.parent / href).resolve().read_text(encoding="utf-8")
    html = LINK.sub(lambda m: f"<style>\n{read(m.group(1))}</style>", html)
    # Escape "</script" inside inlined code so it can't end the tag early.
    html = SCRIPT.sub(lambda m: "<script>\n" + read(m.group(1)).replace("</script", "<\\/script") + "</script>", html)
    return html


for folder in ("lessons", "reference"):
    for page in sorted((ROOT / folder).glob("*.html")):
        out = DIST / folder / page.name
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(build(page), encoding="utf-8")
        print(f"built {out.relative_to(ROOT)}")
