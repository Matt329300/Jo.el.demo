# JOEL Sharing Concept – strona internetowa (demo)

Statyczna strona restauracji JOEL Sharing Concept (kuchnia izraelsko-śródziemnomorska do dzielenia, Warszawa, ul. Koszykowa 1).

- `index.html` – treść strony (hero, menu, miejsca przy kuchni, większe grupy, kontakt)
- `style.css` – style (mobile-first)
- `script.js` – menu mobilne, zakładki menu, obsługa formularza
- `img/` – zdjęcia; źródła w [`img/ZRODLA.md`](img/ZRODLA.md)

Bez frameworka i bez kroku budowania.

## Uruchomienie lokalnie

Otwórz `index.html` w przeglądarce albo uruchom dowolny serwer statyczny w tym folderze, np.:

```bash
npx serve .
```

## Do uzupełnienia

Na stronie oznaczone jako `[DO UZUPEŁNIENIA]` / `[DO POTWIERDZENIA]`, w kodzie jako `TODO`:

- godziny otwarcia,
- czy lokal przyjmuje większe grupy (i od ilu osób),
- adres wysyłki formularza (`FORM_ENDPOINT` w `script.js`) i link do polityki prywatności,
- znaczenie oznaczeń w menu (GF / L / LF / V) i menu dla dzieci,
- domena (`canonical`, `og:url`, `og:image`) oraz dane w JSON-LD (godziny, menu, zdjęcie),
- zgoda na użycie zdjęć i ewentualny podpis fotografa (@pionfotografia).
