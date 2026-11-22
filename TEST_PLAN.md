# SwiftCart - Checkout Test Plan

## 1. Objective
Validate the checkout journey, cart calculations, input validation, and duplicate order prevention.

## 2. Scope
- Product addition and removal
- Quantity updates
- Line-item calculations
- Order total calculation
- Required customer name validation
- Empty cart validation
- Successful order confirmation
- Duplicate submission prevention

## 3. Test Environment
- Application: SwiftCart
- Frontend: React + Vite
- Browser automation: Playwright
- Browser: Chromium
- Test data: Synthetic products only

## 4. Prioritized Test Cases

| ID | Priority | Scenario | Expected Result |
|---|---|---|---|
| TC01 | High | Successful checkout | Confirmation and reference displayed |
| TC02 | High | Missing customer name | Checkout blocked with validation |
| TC03 | High | Change product quantity | Exact order total updated |
| TC04 | High | Checkout with empty cart | Checkout blocked with clear message |
| TC05 | High | Rapid double-click | Only one order confirmation |
| TC06 | Medium | Remove a product | Cart and total updated |
| TC07 | Medium | Add same product repeatedly | Quantity and total updated |

## 5. Testing Approach
- Automated browser testing using Playwright.
- Assertions based on visible customer-facing behavior.
- Each automated test starts from a fresh browser page.
- Manual testing for empty cart and rapid double-click.
- No fixed waits used in automated tests.

## 6. Test Data

| Product | Unit Price |
|---|---:|
| Classic Notebook | ₹299 |
| Wireless Mouse | ₹799 |

Example calculation:
(2 × ₹299) + (1 × ₹799) = ₹1,397.

## 7. Known Limitations
- No backend or database.
- No real payment processing.
- Order information is maintained in frontend application state.
- Order references are generated locally.
- Browser testing currently targets Chromium.