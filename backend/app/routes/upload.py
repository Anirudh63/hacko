from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from datetime import datetime
import os

from app.database import get_db  # Ensure correct import
from app.models.document import Document, DocumentType  # Import Document model and Enum

router = APIRouter()

UPLOAD_DIRECTORY = "uploads/"  # Ensure directory exists
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

def save_uploaded_file(file: UploadFile, allowed_content_type: str, doc_type: DocumentType, db: Session):
    """Handles file saving and database entry."""
    if file.content_type != allowed_content_type:
        raise HTTPException(status_code=400, detail=f"Invalid file type. Expected {allowed_content_type}")

    file_path = os.path.join(UPLOAD_DIRECTORY, file.filename)

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    # Store metadata in database
    document = Document(filename=file.filename, file_path=file_path, type=doc_type, upload_date=datetime.utcnow())
    db.add(document)
    db.commit()
    db.refresh(document)

    return JSONResponse(content={'filename': file.filename, 'type': doc_type.value, 'file_path': file_path})


@router.post('/upload/structured')
async def upload_structured(file: UploadFile = File(...), db: Session = Depends(get_db)):
    return save_uploaded_file(file, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", DocumentType.STRUCTURED, db)


@router.post('/upload/unstructured')
async def upload_unstructured(file: UploadFile = File(...), db: Session = Depends(get_db)):
    return save_uploaded_file(file, "application/pdf", DocumentType.UNSTRUCTURED, db)


@router.post('/upload/compliance')
async def upload_compliance(file: UploadFile = File(...), db: Session = Depends(get_db)):
    return save_uploaded_file(file, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", DocumentType.COMPLIANCE, db)
