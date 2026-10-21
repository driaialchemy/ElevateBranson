"""Dump a 3-column PDF (Area Resources sheet) as column-ordered text for scripts/parse-area-resources.ts.

Usage: python -I scripts/extract_pdf_columns.py sheet.pdf > scripts/fixtures/area-resources-columns.txt
Blank lines mark vertical gaps between entries. Needs pypdf (dev-time only; not an app dependency).
"""
import sys

import pypdf

GAP = 15.5
LINE = 6  # fragments within this many points share a line (superscripts, split runs)


def fragments(page):
    out = []

    def visit(text, cm, tm, _font, _size):
        x = tm[4] * cm[0] + cm[4]
        y = tm[5] * cm[3] + cm[5]
        if text.strip() and x > 1:
            out.append((x, y, text))

    page.extract_text(visitor_text=visit)
    return out


def column_of(x):
    return 0 if x < 150 else 1 if x < 330 else 2


def main(path):
    sys.stdout.reconfigure(encoding="utf-8")
    reader = pypdf.PdfReader(path)
    for number, page in enumerate(reader.pages, start=1):
        frags = fragments(page)
        for col in range(3):
            items = sorted((f for f in frags if column_of(f[0]) == col), key=lambda f: -f[1])
            if not items:
                continue
            lines = []
            for x, y, value in items:
                if lines and lines[-1]['y'] - y <= LINE:
                    lines[-1]['parts'].append((x, value))
                else:
                    lines.append({'y': y, 'parts': [(x, value)]})
            print(f'## page {number} col {col + 1}')
            last_y = None
            for line in lines:
                if last_y is not None and last_y - line['y'] > GAP:
                    print()
                print(''.join(v for _x, v in sorted(line['parts'])).strip())
                last_y = line['y']
            print()


if __name__ == '__main__':
    main(sys.argv[1])
