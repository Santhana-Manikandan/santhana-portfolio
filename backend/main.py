from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://santhana-portfolio.vercel.app",
        "http://127.0.0.1:5500",
        "http://localhost:5500",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

RESEND_API_KEY = os.getenv("RESEND_API_KEY")


@app.post("/send-message")
async def send_message(
    name: str = Form(...),
    email: str = Form(...),
    message: str = Form(...)
):
    if not RESEND_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="RESEND_API_KEY not found"
        )

    headers = {
        "Authorization": f"Bearer {RESEND_API_KEY}",
        "Content-Type": "application/json",
    }

    data = {
        "from": "onboarding@resend.dev",
        "to": ["msanthana2006@gmail.com"],   # <-- your email
        "subject": f"New Portfolio Message from {name}",
        "reply_to": email,
        "html": f"""
        <h2>New Contact Form Message</h2>

        <p><b>Name:</b> {name}</p>
        <p><b>Email:</b> {email}</p>

        <p><b>Message:</b></p>

        <p>{message}</p>
        """
    }

    response = requests.post(
        "https://api.resend.com/emails",
        headers=headers,
        json=data
    )

    if response.status_code in (200, 201):
        return {"message": "Email sent successfully"}

    print(response.text)

    raise HTTPException(
        status_code=500,
        detail=response.text
    )


@app.get("/")
def home():
    return {"message": "Backend is running 🚀"}


@app.get("/ping")
def ping():
    return {"message": "pong"}