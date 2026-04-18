from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import smtplib
from email.mime.text import MIMEText
import os

app = FastAPI()

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

    # 👉 YOU will receive the email
    receiver_email = "msanthana2006@gmail.com"

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
    msg["Reply-To"] = email   # 👈 important

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, app_password)
        server.sendmail(sender_email, receiver_email, msg.as_string())
        server.quit()

        return {"message": "Email sent successfully"}

    except Exception as e:
        print("ERROR:", str(e))  # 👈 helpful for logs
        return {"error": str(e)}

@app.get("/ping")
def ping():
    return {"message": "pong"}