from flask import Flask, request, jsonify
from fpdf import FPDF
import os

app = Flask(_name_)

@app.route('/')
def home():
    return open("index.html").read()  # Serve the HTML file

@app.route('/save_to_pdf', methods=['POST'])
def save_to_pdf():
    try:
        data = request.get_json()
        exam_text = data.get("text", "")

        if not exam_text:
            return jsonify({"error": "No text received"}), 400  # Return error if no text is received

        # Log the received text for debugging
        print("Received text:", exam_text)

        # Generate PDF
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        pdf.cell(200, 10, txt="Exam Responses", ln=True, align="C")
        pdf.ln(10)  # Line break
        pdf.multi_cell(0, 10, exam_text)  # Add the user's text

        # Save the PDF
        pdf_output = "exam_responses.pdf"
        pdf.output(pdf_output)

        # Return success response
        return jsonify({"message": "PDF saved successfully."})

    except Exception as e:
        print(f"Error generating PDF: {e}")
        return jsonify({"error": "An error occurred while generating the PDF."}), 500

if _name_ == 'main':
    app.run(debug=True)