from __future__ import annotations

import json
import re
from typing import Any, Dict, List, Tuple


def check_required_keys(obj: Any, keys: List[str]) -> Tuple[bool, str]:
    if not isinstance(obj, dict):
        return False, f"Expected JSON object/dict, got {type(obj).__name__}"
    missing = [k for k in keys if k not in obj]
    if missing:
        return False, f"Missing keys: {missing}"
    return True, "ok"


def check_regex(text: str, pattern: str) -> Tuple[bool, str]:
    if re.search(pattern, text, flags=re.MULTILINE) is None:
        return False, f"Pattern not found: {pattern}"
    return True, "ok"


def check_json_schema(obj: Any, schema: Dict[str, Any]) -> Tuple[bool, str]:
    """Very small subset schema check.

    Avoid heavy deps for v1. For v2, consider `jsonschema`.
    Supported (v1):
    - type: object
    - required: [..]
    - properties: {k: {type: ...}}
    """
    if schema.get("type") == "object":
        if not isinstance(obj, dict):
            return False, "Schema requires object"

        required = schema.get("required") or []
        ok, msg = check_required_keys(obj, required)
        if not ok:
            return ok, msg

        props = schema.get("properties") or {}
        for k, spec in props.items():
            if k not in obj:
                continue
            expected = spec.get("type")
            if expected is None:
                continue
            pytype = {
                "string": str,
                "number": (int, float),
                "integer": int,
                "boolean": bool,
                "object": dict,
                "array": list,
                "null": type(None),
            }.get(expected)
            if pytype and not isinstance(obj[k], pytype):
                return False, f"Key '{k}' expected {expected}, got {type(obj[k]).__name__}"

        return True, "ok"

    return False, "Unsupported schema (v1 supports only type=object)"


def try_parse_json(text: str) -> Tuple[bool, Any, str]:
    try:
        return True, json.loads(text), "ok"
    except Exception as e:
        return False, None, f"Invalid JSON: {e}"
