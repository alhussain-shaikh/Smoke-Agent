from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # or ["*"] for all origins (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Smoke Automation Agent Backend is running 🚀"}


@app.post("/run-smoke-tests")
def run_smoke_tests():
    try:
        result = subprocess.run(
            ["npx", "playwright", "test", "../tests/specs/test_login.spec.ts", "--quiet"],
            capture_output=True,
            text=True,
            cwd=os.path.abspath("..")  # project root
        )
        return {
            "status": "completed",
            "stdout": result.stdout,
            "stderr": result.stderr
        }
    except Exception as e:
        return {"status": "error", "details": str(e)}

@app.post("/api/chat")
async def chat_endpoint(request: Request):
    data = await request.json()
    user_message = data.get("message", "").lower()

    # Simple intent detection
    if "run smoke" in user_message or "smoke test" in user_message:
        result = run_smoke_tests()
        print(result)
        return {
            "reply": "✅ Smoke tests executed!",
            "details": result
        }
    else:
        return {"reply": f"🤖 I don't understand '{user_message}' yet. Try saying 'run smoke tests'."}
