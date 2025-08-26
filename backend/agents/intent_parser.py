from typing import List
# Minimal rule-based intent parser (replace with LLM later if desired)
KEYWORD_MAP = {
    "login": ["login"],
    "checkout": ["checkout", "payment"],
    "homepage": ["home", "homepage"],
    "navigation": ["nav", "navigation"],
}
SPEC_MAP = {
    "login": "tests/specs/test_login.spec.ts",
    "checkout": "tests/specs/test_checkout.spec.ts",
    "homepage": "tests/smoke_suite/test_homepage.spec.ts",
    "navigation": "tests/smoke_suite/test_navigation.spec.ts",
}
DEFAULT_SMOKE = [
    "tests/specs/test_login.spec.ts",
    "tests/smoke_suite/test_homepage.spec.ts",
]
def parse_tests_from_message(message: str) -> List[str]:
    msg = message.lower()
    selected = []
    for key, kws in KEYWORD_MAP.items():
        if any(kw in msg for kw in kws):
            spec = SPEC_MAP.get(key)
    if spec:
        selected.append(spec)
    if not selected:
        return DEFAULT_SMOKE
    return list(dict.fromkeys(selected)) # dedupe, preserve order