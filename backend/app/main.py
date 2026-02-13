from fastapi import FastAPI, Request, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from PyPDF2 import PdfReader
import io

from app.limiter import limiter
from app.agent import Cardiologist, Psychologist, Pulmonologist, MultidisciplinaryTeam

# ── App Setup ──────────────────────────────────────────────
app = FastAPI(
    title="Medi Analyser API",
    description="AI-powered medical report analysis with specialist consultations",
    version="0.1.0",
)

# Rate limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS – allow all origins during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Allowed file types
ALLOWED_EXTENSIONS = {".txt", ".pdf"}


# ── Pydantic Models ───────────────────────────────────────
class AnalysisResponse(BaseModel):
    cardiologist_report: str
    psychologist_report: str
    pulmonologist_report: str
    multidisciplinary_summary: str


# ── Helper Functions ──────────────────────────────────────
async def extract_text_from_file(file: UploadFile) -> str:
    """Extract text content from an uploaded .txt or .pdf file."""
    filename = file.filename.lower()

    if filename.endswith(".txt"):
        content = await file.read()
        return content.decode("utf-8")

    elif filename.endswith(".pdf"):
        content = await file.read()
        pdf_reader = PdfReader(io.BytesIO(content))
        text = ""
        for page in pdf_reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
        return text.strip()

    else:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type. Please upload a .txt or .pdf file.",
        )


# ── Endpoints ─────────────────────────────────────────────
@app.get("/")
async def root():
    return {"message": "Medi Analyser server is running"}


@app.post("/analyze", response_model=AnalysisResponse)
@limiter.limit("5/day")
async def analyze_report(request: Request, file: UploadFile = File(...)):
    """
    Upload a medical report file (.txt or .pdf) and receive specialist
    analyses from a Cardiologist, Psychologist, and Pulmonologist,
    followed by a multidisciplinary team summary.
    """

    # Validate file type
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded.")

    ext = "." + file.filename.rsplit(".", 1)[-1].lower() if "." in file.filename else ""
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type '{ext}'. Allowed: {', '.join(ALLOWED_EXTENSIONS)}",
        )

    # Extract text from file
    medical_report = await extract_text_from_file(file)

    if not medical_report.strip():
        raise HTTPException(status_code=400, detail="The uploaded file is empty or contains no readable text.")

    # Step 1 – Run individual specialist agents
    cardiologist = Cardiologist(medical_report)
    psychologist = Psychologist(medical_report)
    pulmonologist = Pulmonologist(medical_report)

    cardio_report = cardiologist.run()
    psycho_report = psychologist.run()
    pulmo_report = pulmonologist.run()

    # Step 2 – Feed specialist reports into the multidisciplinary team
    team = MultidisciplinaryTeam(
        cardiologist_report=cardio_report,
        psychologist_report=psycho_report,
        pulmonologist_report=pulmo_report,
    )
    team_summary = team.run()

    return AnalysisResponse(
        cardiologist_report=cardio_report,
        psychologist_report=psycho_report,
        pulmonologist_report=pulmo_report,
        multidisciplinary_summary=team_summary,
    )
