# JOEL Sharing Concept – strona internetowa (demo)

Statyczna strona restauracji JOEL Sharing Concept (kuchnia izraelsko-śródziemnomorska do dzielenia, Warszawa, ul. Koszykowa 1).

- `index.html` – treść strony (hero, menu, miejsca przy kuchni, opinie, kontakt)
- `style.css` – style (mobile-first)
- `script.js` – menu mobilne, zakładki menu, karuzela opinii
- `img/` – zdjęcia; źródła w [`img/ZRODLA.md`](img/ZRODLA.md)
- [`WERYFIKACJA.md`](WERYFIKACJA.md) – źródło każdej informacji na stronie

Bez frameworka i bez kroku budowania.

## Uruchomienie lokalnie

Otwórz `index.html` w przeglądarce albo uruchom dowolny serwer statyczny w tym folderze, np.:

```bash
npx serve .
```

## Do uzupełnienia

Na stronie oznaczone jako `[DO UZUPEŁNIENIA]` / `[DO POTWIERDZENIA]`, w kodzie jako `TODO`:

- godziny otwarcia,
- aktualizacja oceny Google w sekcji „Opinie” (teraz 4,4 / 1223, stan na 20.11.2026),
- znaczenie oznaczeń w menu (GF / L / LF / V) i menu dla dzieci,
- domena (`canonical`, `og:url`, `og:image`) oraz dane w JSON-LD (godziny, menu, zdjęcie),
- zgoda na użycie zdjęć i ewentualny podpis fotografa (@pionfotografia).
