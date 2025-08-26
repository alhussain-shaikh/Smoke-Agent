import subprocess
import shutil
from typing import List, Tuple
from backend.utils.logger import logger

PLAYWRIGHT_BIN = shutil.which("playwright") or "npx playwright"

def run_playwright_specs(spec_paths: List[str]) -> Tuple[bool, str, str]:
    """
    Run Playwright specs and return (success, stdout, html_index_path)
    """
    if not spec_paths:
        spec_paths = ["tests/smoke_suite"]
    
    cmd = ["npx", "playwright", "test", *spec_paths, "--reporter=html"]
    logger.info("Running: %s", " ".join(cmd))
    
    proc = subprocess.run(cmd, capture_output=True, text=True)
    stdout = proc.stdout + "\n" + proc.stderr
    success = proc.returncode == 0
    html_index = "reports/html/index.html"
    return success, stdout, html_index