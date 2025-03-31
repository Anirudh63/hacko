from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.document import Document, ValidationResult
from datetime import datetime
from app.database import get_db


router = APIRouter()

@router.post('/validate/{document_id}')
async def validate_document(document_id: str, db: Session = Depends(get_db)):
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail='Document not found')

    # Simulate sending document to ML model and getting results
    validation_errors = {}  # Replace with actual ML model call

    # Store validation results
    validation_result = ValidationResult(
        document_id=document.id,
        errors=validation_errors,
        validated_at=datetime.utcnow()
    )
    db.add(validation_result)
    db.commit()

    return {'document_id': document_id, 'validation_errors': validation_errors} 