# Beyond Bid Tool

A bid calculator built for Beyond Group's foam estimation workflow. Takes a client request — volume, distance from Calgary, crew details, and timeline — and produces a complete bid breakdown including material calculations, cost build, mobilization, and contingency pricing.

Built as part of the Beyond Group candidate challenge (72-hour brief).

## Live Demo

```bash
https://beyond-bid-tool.vercel.app/
```

## The Problem

When a contractor emails Beyond asking for a foam quote, an estimator has to manually work through unit conversions, material ordering (drum sets), waste factors, crew costs, travel logistics, and escalation pricing. That process is slow, error-prone, and lives in someone's head or a spreadsheet.

## The Solution

A web-based calculator where a Beyond team member inputs the job parameters and instantly gets a full bid with:

- **Material calculation** — m³ to cubic yards to raw lbs, waste factor, drum sets needed
- **Cost build** — labour (burdened), hotel, per diem, fuel, consumables, overhead
- **Mobilization** — flat mob charge + actual travel cost breakdown
- **Foam revenue** — S&I price × required lbs (before waste)
- **Margin** — revenue minus total cost
- **Contingency pricing** — escalated price for deferred timelines (4% compounded annually)

## Lethbridge Job Output

The tool is pre-loaded with the Lethbridge bridge abutment scenario from the challenge brief:
- 18 m³ void fill
- HMI 2.5 lb closed-cell polyurethane foam
- 2-day job, ~212 km from Calgary
- One-year contingency option

[Screenshot or summary of the output here]

## Assumptions Made

These are judgment calls not specified in the brief. All are adjustable in the tool:

| Parameter | Default | Reasoning |
|---|---|---|
| Crew size | 3 people | Standard spray foam crew for a mid-size injection job |
| Hours per day | 10 hours | Typical long day on a remote site |
| Hotel nights | 2 nights | Arrive night before, stay after day 1, drive home after day 2 |
| Hotel rooms | 2 rooms | 3-person crew, double up + 1 |
| Fuel cost | ~$0.50/km | Based on ~30L/100km diesel truck + trailer at ~$1.60/L Calgary avg |
| Per Diem Days | Same as job days | Crew eats on work days, drives same-day for nearby jobs |
| Contingency period | 1 year | As requested by client |

## Tech Stack

- **React + TypeScript** — all calculation logic runs client-side, no backend needed
- **Tailwind CSS** — fast, clean styling
- **Vite** — dev server and build tool
- **Vercel** — deployment

## What I'd Build Next (With More Time)

1. **Email parsing with AI** — paste a raw client email, an LLM extracts volume, location, timeline, and auto-fills the form
2. **PDF export** — generate a professional quote document that Beyond can email directly to the client
3. **Quote history** — save past bids with a lightweight database so estimators can reference previous jobs
4. **Multi-product support** — extend beyond HMI 2.5 lb foam to cover other products in Beyond's lineup
5. **Batch quoting** — handle multi-scope jobs (e.g., foam + firestopping on the same project)

## Local Setup


## Project Structure

```
src/
├── components/
│   ├── Header.tsx            # Top navbar with branding and location search
│   ├── BidForm.tsx           # Input form for job parameters
│   ├── BidSummary.tsx        # Output display with bid breakdown
│   ├── LocationSearch.tsx    # Google Maps autocomplete + distance calculation
│   └── NumberInput.tsx       # Custom number input with clean focus/blur behavior
├── utils/
│   ├── calculations.ts       # All bid math — pure functions
│   └── constants.ts          # Fixed rates and reference data
├── types/
│   └── bid.ts                # TypeScript interfaces for inputs and results
└── App.tsx                   # Main app — state management and layout
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps API key for location search and distance calculation |


```bash
git clone https://github.com/[your-username]/beyond-bid-tool.git
cd beyond-bid-tool
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Author

Shourav Rakshit Ivan
Portfolio: https://shouravrakshitivan.vercel.app/
