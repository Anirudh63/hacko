import os
from sqlalchemy.orm import Session
from models.document import Document, DocumentType

UPLOAD_FOLDER = "uploads/"  # Directory where files will be stored

def save_file(file, doc_type: DocumentType, db: Session):
    # Ensure the upload folder exists
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    # Save the file to the uploads directory
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    # Store metadata in the database
    new_document = Document(
        filename=file.filename,
        file_path=file_path,
        type=doc_type
    )
    db.add(new_document)
    db.commit()
    db.refresh(new_document)

    return new_document
