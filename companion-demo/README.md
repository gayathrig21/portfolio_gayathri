# Synthetic readiness contract demo

A newly created public reference that demonstrates input contracts, deterministic checks, and an explicit review path. It uses fictional record counts and generic identifiers.

This is **not Oracle source code**, an LLM integration, a payroll implementation, a production forecasting engine, or a statutory compliance validator. The two teaching rules (record counts must match; required inputs must be present) are intentionally generic and do not represent employer business logic.

## Run locally

Python 3.9+; no third-party packages or API key required.

```text
git clone https://github.com/gayathrig21/portfolio_gayathri.git
cd portfolio_gayathri/companion-demo
python validate_readiness.py
```

The repository will contain this folder once the portfolio update is pushed.

To run the standalone download, also download [synthetic_input.json](synthetic_input.json) into the same folder as [validate_readiness.py](validate_readiness.py).

## Sample result

```json
{
  "request_id": "synthetic-demo-001",
  "data_classification": "synthetic_example_only",
  "readiness": "warning",
  "next_action": "request_review",
  "reasons": ["missing_inputs", "record_count_mismatch"]
}
```

The input contains 3 expected records, 2 observed records, and one missing source reference. These are invented fixture values, **not business impact metrics**.

Set observed_records to 3 and missing_inputs to [] to exercise the ready path. Remove a required key or use a negative count to exercise the not_evaluated/error path. No values are repaired or inferred.

## Boundaries

- JSON parsing and explicit field/type checks run before evaluation.
- Additional keys, missing keys, booleans as counts, negative counts, and duplicate missing-source references are rejected.
- No model is called, no email is sent, no personal data is required, and no external system is changed.
- A successful result means only that the two synthetic checks passed; it is not proof that a real payroll is ready.
