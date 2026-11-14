# Beyond LEO Fire Audit

A web dashboard for the 2026 NASA Space Apps Challenge, *Flame in Freefall*.

The ISS runs on a set of fire-safety rules of thumb: stop the airflow and the flame dies, the smoke detector will catch it, a material that passes the 1 g flame test is safe. This project checks ten of those rules against five crewed environments (ISS, an Orion-class capsule, a lunar lander or habitat, a pressurized rover and a Mars surface habitat) and marks each one as **holds**, **weakens**, **breaks** or **unknown**, with the NASA experiment behind every verdict.

## Run it

Open `index.html` in a browser. There is nothing to install and no server. The whole page is one file.

## What is on the page

- **Audit table.** Ten rules against five preset cabins and one cabin you configure yourself (gravity, pressure, oxygen, volume, dust). Every cell opens its evidence.
- **Evidence records.** Each record gives the finding, the test conditions, the investigation and the place in the source document.
- **Ranked investigations.** For the selected cabin, which experiments decide the most rules.
- **Ranked open questions.** For the selected cabin, which verdicts are furthest from a measurement in matching conditions.
- **Three calculators.** CO2 extinguisher discharge, oxygen released by masks, and carbon monoxide after a fire with scrubbing time.
- **Search.** Runs in the browser and returns only verdicts and records from the audit.

`evidence.json` holds the same rules, verdicts, evidence records and sources in machine-readable form.

## How a verdict is made

No language model decides a cell. Each rule has a written decision rule (shown on the page under "How the verdicts are made"), applied to the cabin conditions and the evidence records. Three rows are calculated:

- **CO2 extinguisher:** partial pressure of CO2 after one 2.7 kg discharge, compared with the 3 mmHg one-hour limit and the NIOSH immediate-danger value.
- **Oxygen masks:** cabin volume compared with Orion (where NASA ruled the ISS masks out) and the ISS (where they are used).
- **Air after the fire:** the largest gas release measured on Saffire VI, rescaled to the cabin volume and pressure, compared with the CO and CO2 limits cited in the Saffire VI paper.

All calculations assume an ideal gas at 23 °C mixed evenly through the cabin.

## NASA data

NASA Physical Sciences Informatics (PSI) investigations: BASS (PSI-26), BASS-II (PSI-25), SAME (PSI-102), SAME-R (PSI-101), DAFT and DAFT-2 (PSI-47), FLEX (PSI-69) and the ACME Burning Rate Emulator. Saffire IV to VI, SoFIE-MIST and partial-gravity results come from NASA technical reports and the investigators' publications. The full reference list, with links, is at the bottom of the page.

## Challenge resources

All ten resources listed on the challenge page are used or cited: the PSI Data Repository and the NASA Combustion Science pages for the experiments, the Mir fire, Apollo 1 and Apollo 13 accounts as context for the respond and recover rows, and the three NASA Spinoff articles (fire detector, firefighter air tanks, fire attire) for use on Earth. The page lists where each one appears.

## Space agency partner data

The pressurized rover volume (13 m3 of living space) comes from the JAXA and Toyota pressurized rover concept, press release of 12 March 2019.

## Use of AI

The evidence records, the wording and the code were drafted with an AI model (Claude by Anthropic) reading the cited documents. Every record links to its source so it can be checked. Verdicts are computed by fixed rules, not by a language model. No AI-generated images, audio or video are used, and no NASA logos or mission insignia appear.

## Limits

- Screening estimates for discussion. Not a safety certification of any vehicle.
- Values marked as assumed (the lander and Mars habitat volumes, the Mars atmosphere, sea-level air in the capsule) are assumptions of this audit and can be changed in the cabin builder.
- Partial-gravity verdicts rest on short ground tests, models and NASA assessments. No long burn has yet been recorded in true lunar or Martian gravity.
- The air verdict rescales one Saffire VI fire and treats its far-field sensor reading as the cabin average.

An independent project. Not a NASA product and not endorsed by NASA.
