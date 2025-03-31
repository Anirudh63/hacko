# backend/app/models/document.py

from sqlalchemy import Column, String, Enum, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
import enum
import uuid
from datetime import datetime

Base = declarative_base()

class DocumentType(enum.Enum):
    STRUCTURED = 'structured'
    UNSTRUCTURED = 'unstructured'
    COMPLIANCE = 'compliance'

class Document(Base):
    __tablename__ = 'documents'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    filename = Column(String, nullable=False)
    file_path = Column(String, nullable=False)  # Stores the file location
    type = Column(Enum(DocumentType), nullable=False)
    upload_date = Column(DateTime, default=datetime.utcnow)

class ValidationResult(Base):
    __tablename__ = 'validation_results'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id = Column(UUID(as_uuid=True), ForeignKey('documents.id'), nullable=False)
    errors = Column(String, nullable=True)  # JSON was used earlier, but String is simpler for errors
    validated_at = Column(DateTime, default=datetime.utcnow)
