from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import smtplib
from email.mime.text import MIMEText
import os

app = FastAPI()

# ✅ CORS (allow your frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://santhana-portfolio.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/send-message")
async def send_message(
    name: str = Form(...),
    email: str = Form(...),
    message: str = Form(...)
):
    sender_email = os.getenv("EMAIL_USER")
    app_password = os.getenv("EMAIL_PASS")

    # 👉 You receive the email
    receiver_email = sender_email

    # 🔍 Debug (check in Render logs)
    print("EMAIL:", sender_email)
    print("PASS:", app_password)

    # ❌ Check if env variables missing
    if not sender_email or not app_password:
        raise HTTPException(status_code=500, detail="Email credentials not set")

    # Create email
    msg = MIMEText(
        f"""
New Contact Form Message 🚀

Name: {name}
Email: {email}

Message:
{message}
""",
        "plain"
    )

    msg["Subject"] = f"Message from {name}"
    msg["From"] = sender_email
    msg["To"] = receiver_email
    msg["Reply-To"] = email  # so you can reply to user

    try:
        print("Connecting to SMTP...")
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()

        print("Logging in...")
        server.login(sender_email, app_password)

        print("Sending email...")
        server.sendmail(sender_email, receiver_email, msg.as_string())

        server.quit()
        print("✅ Email sent successfully!")

        return {"message": "Email sent successfully"}

    except Exception as e:
        print("❌ ERROR:", str(e))
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/")
def home():
    return {"message": "Backend is running 🚀"}


@app.get("/ping")
def ping():
    return {"message": "pong"}