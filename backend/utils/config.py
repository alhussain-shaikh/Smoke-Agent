from pydantic import BaseModel

class Settings(BaseModel):
    reports_html: str = "reports/html/index.html"
    reports_pdf_dir: str = "reports/pdf"
    reports_json_dir: str = "reports/json"
settings = Settings()