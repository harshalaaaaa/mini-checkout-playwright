# SwiftCart - Mini Checkout and Browser Test Suite

SwiftCart is a lightweight React-based checkout application developed for the FyndHacks SDET Intern challenge.

It demonstrates shopping cart management, accurate price calculations, customer validation, order confirmation, and automated browser testing.

## Features

- Two synthetic products with fixed prices.
- Add and remove products.
- Increase and decrease product quantities.
- Automatic line-item and order-total calculations.
- Required customer name validation.
- Empty cart validation.
- Order confirmation with a unique reference.
- Protection against duplicate order submissions.
- Automated browser tests using Playwright.

## Technology Stack

- React
- Vite
- JavaScript
- CSS
- Playwright
- Chromium

## Requirements

- Node.js and npm
- Visual Studio Code or another code editor
- Chromium browser (installed through Playwright)

## Installation

Clone the repository:

```bash
git clone https://github.com/harshalaaaaa/mini-checkout-playwright.git
```

Navigate into the project:

```bash
cd mini-checkout
```

Install dependencies:

```bash
npm install
```

Install Playwright Chromium:

```bash
npx playwright install chromium
```

## Run the Application

```bash
npm run dev
```

Open the local URL:

http://localhost:5173/

## Run Automated Browser Tests

```bash
npx playwright test
```

The Playwright suite verifies:

1. Successful checkout and order confirmation.
2. Missing customer name validation.
3. Exact order total after quantity changes.

Each test starts from a fresh page.

## View Test Report

```bash
npx playwright show-report
```

The HTML report provides test execution details.

## Manual Testing

The following additional scenarios were manually tested:

- Attempt checkout with an empty cart.
- Rapidly double-click the Place Order button.

Both scenarios behaved as expected during testing.

## Test Data

| Product | Price |
|---|---:|
| Classic Notebook | ₹299 |
| Wireless Mouse | ₹799 |

Example:
2 Notebooks + 1 Wireless Mouse = ₹1,397.

## Limitations and Assumptions

- All product data is synthetic.
- No backend or database is used.
- No real payment processing is implemented.
- Orders are stored only in frontend application state.
- Order references are generated locally.
- Automated browser testing targets Chromium.

## Project Structure

```text
mini-checkout/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── tests/
│   └── checkout.spec.js
├── playwright.config.js
├── TEST_PLAN.md
├── TEST_RESULTS.md
├── package.json
└── README.md
```

## Author

Developed as an individual solution for the FyndHacks Mini Checkout and Browser Test Suite challenge.