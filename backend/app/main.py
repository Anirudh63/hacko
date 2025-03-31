from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import upload, validate, auth  # Import your route modules

app = FastAPI()

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8081"],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers from other modules
app.include_router(upload.router, prefix="/upload", tags=["upload"])
app.include_router(validate.router, prefix="/validate", tags=["validate"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])

@app.get("/")
async def root():
    return {"message": "Welcome to the TermSheet Validation API"}
