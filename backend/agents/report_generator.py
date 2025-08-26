import os
from datetime import datetime
from fpdf import FPDF
from backend.utils.config import settings
from backend.utils.logger import logger

def generate_pdf_summary(summary_text: str) -> str:
    os.makedirs(settings.reports_pdf_dir, exist_ok=True)
    ts = datetime.now().strftime('%Y%m%d_%H%M%S')
    
    out_path = os.path.join(settings.reports_pdf_dir, f"smoke_summary_{ts}.pdf")
    
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=14)
    pdf.cell(0, 10, "Smoke Test Summary", ln=True, align='C')
    pdf.ln(5)
    pdf.set_font("Arial", size=11)
    
    for line in summary_text.splitlines():
        pdf.multi_cell(0, 7, line)
    pdf.output(out_path)
    logger.info("PDF summary written to %s", out_path)
    return out