# WD-Rechner

Kleiner Arbeitszeitrechner für den Winterdienst als Web-App. Er läuft im Browser, kann auf dem iPhone oder Android-Handy auf den Home-Bildschirm gelegt werden und funktioniert danach auch offline. Alle Eingaben bleiben auf dem jeweiligen Handy.

## Was er rechnet

- Anwesenheit ab Anruf bis Ende, auch über Mitternacht; Uhrzeiten nur in Viertelstunden
  („Jetzt“ rundet den Beginn ab und das Ende auf, ein laufender Einsatz wird bis zur nächsten Viertelstunde gerechnet)
- Mindestpause nach § 4 ArbZG: mehr als 6 Std. → 30 Min., mehr als 9 Std. → 45 Min.; Pausen zählen in Blöcken ab 15 Min.
  Abgezogen wird gleitend, nur so viel, dass die Grenze nicht überschritten wird (z. B. 6:20 anwesend → 20 Min. Pause → 6:00 netto).
- Netto-Arbeitszeit in Std:Min und dezimal, Restzeit bis 10 Std. netto (§ 3 ArbZG)
- Uhrzeiten, zu denen 6 / 8 / 9 / 10 Std. netto erreicht sind
- Werte für den Stundenzettel

## Auf GitHub Pages stellen

1. Auf github.com ein neues Repository anlegen, hier `Stundenzettelrechner`, Sichtbarkeit **Public**.
2. „Add file“ → „Upload files“ → alle Dateien aus diesem Ordner hineinziehen → „Commit changes“.
3. Im Repository „Settings“ → „Pages“ → bei „Branch“ `main` und Ordner `/ (root)` wählen → „Save“.
4. Nach ein bis zwei Minuten ist der Rechner unter `https://mxbng.github.io/Stundenzettelrechner/` erreichbar.
5. Aus dieser Adresse einen QR-Code machen und aushängen.

## Änderungen veröffentlichen

Nach jeder Änderung in `sw.js` die Zeile `const CACHE = 'wd-rechner-v1';` hochzählen (v2, v3 …).
Sonst sehen Handys, auf denen die App schon installiert ist, die neue Version nicht.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | die komplette App (Oberfläche und Rechenlogik) |
| `manifest.webmanifest` | Name und Symbol für „Zum Home-Bildschirm“ |
| `sw.js` | Offline-Speicher |
| `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | App-Symbole |

Privates Hilfsmittel, keine offizielle Anwendung der Stadt. Maßgeblich sind ZMI und der Stundenzettel.
