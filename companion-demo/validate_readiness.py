"""Public synthetic example. Not Oracle code, an LLM app, or statutory advice.

Run: python validate_readiness.py [path/to/synthetic_input.json]
All rules below are invented teaching rules, not production payroll rules.
"""
import json
from pathlib import Path
import sys


def evaluate(payload):
    required = {"request_id", "expected_records", "observed_records", "missing_inputs"}
    if not isinstance(payload, dict):
        raise ValueError("Input must be a JSON object")
    if set(payload) != required:
        raise ValueError("Input must contain exactly: " + ", ".join(sorted(required)))
    if not isinstance(payload["request_id"], str) or not payload["request_id"].strip():
        raise ValueError("request_id must be a non-empty string")
    for field in ("expected_records", "observed_records"):
        # Missing counts are never inferred. bool is not an accepted integer here.
        if type(payload[field]) is not int or payload[field] < 0:
            raise ValueError(field + " must be a non-negative integer")
    missing = payload["missing_inputs"]
    if not isinstance(missing, list) or any(not isinstance(v, str) or not v.strip() for v in missing):
        raise ValueError("missing_inputs must be a list of non-empty strings")
    if len(missing) != len(set(missing)):
        raise ValueError("missing_inputs must not contain duplicate references")
    reasons = []
    if missing:
        reasons.append("missing_inputs")
    if payload["observed_records"] != payload["expected_records"]:
        reasons.append("record_count_mismatch")
    return {
        "request_id": payload["request_id"],
        "data_classification": "synthetic_example_only",
        "readiness": "warning" if reasons else "ready",
        "next_action": "request_review" if reasons else "continue_demo",
        "reasons": reasons,
    }


def main():
    source = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).with_name("synthetic_input.json")
    try:
        result = evaluate(json.loads(source.read_text(encoding="utf-8")))
    except (OSError, UnicodeError, ValueError) as exc:
        print(json.dumps({"readiness": "not_evaluated", "error": str(exc)}))
        return 1
    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
