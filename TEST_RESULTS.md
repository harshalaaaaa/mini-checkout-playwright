# SwiftCart - Test Execution Results

## 1. Execution Summary

| Test Category | Total | Passed | Failed |
|---|---:|---:|---:|
| Automated Playwright tests | 3 | 3 | 0 |
| Manual edge-case tests | 2 | 2 | 0 |
| Total | 5 | 5 | 0 |

## 2. Automated Test Results

| Test ID | Test Scenario | Actual Result | Status |
|---|---|---|---|
| TC01 | Successful checkout | Confirmation and order reference displayed | PASS |
| TC02 | Missing customer name | Validation message displayed; checkout blocked | PASS |
| TC03 | Quantity calculation | Exact total ₹1,397.00 verified | PASS |

## 3. Manual Test Results

| Test ID | Test Scenario | Actual Result | Status |
|---|---|---|---|
| TC04 | Empty cart checkout | Checkout blocked with validation message | PASS |
| TC05 | Rapid double-click | Only one order confirmation generated | PASS |

## 4. Defect Summary

No defects were observed during the executed automated and manual tests.

## 5. Execution Notes

- Automated tests executed using Playwright and Chromium.
- All three automated test cases passed.
- Both required manual edge cases passed.
- The application displayed the expected validation and confirmation behavior.
- No real payments, external services, or customer data were used.

## 6. Evidence

Playwright HTML report and execution screenshots should accompany the final submission.