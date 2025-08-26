from fastapi import APIRouter
from pydantic import BaseModel
from backend.agent.intent_parser import parse_tests_from_message
from backend.agent.test_executor import run_playwright_specs
from backend.agent.report_generator import generate_pdf_summary

router = APIRouter()

class ChatIn(BaseModel):
    message: str

class ChatOut(BaseModel):
    ok: bool
    summary: str
    html_report: str
    pdf_report: str
    raw_log: str

@router.post("/chat", response_model=ChatOut)
async def chat_endpoint(data: ChatIn):
    specs = parse_tests_from_message(data.message)
    success, stdout, html_index = run_playwright_specs(specs)
    status = " All smoke tests passed" if success else " Some tests failed"
    details = "\n".join([
        f"Specs: {', '.join(specs)}",
        f"HTML Report: {html_index}"
    ])
    summary_text = f"{status}\n{details}"
    pdf_path = generate_pdf_summary(summary_text)
    
    return ChatOut(
        ok=success,
        summary=summary_text,
        html_report=html_index,
        pdf_report=pdf_path,
        raw_log=stdout[-4000:] # limit size
    )