

import os
import time
import google.generativeai as genai
from dotenv import load_dotenv
import json

load_dotenv()
 

genai.configure(api_key=os.getenv("GEMINI_API_KEY") )

def upload_to_gemini(path, mime_type=None):
  """Uploads the given file to Gemini.

  See https://ai.google.dev/gemini-api/docs/prompting_with_media
  """
  file = genai.upload_file(path, mime_type=mime_type)
  print(f"Uploaded file '{file.display_name}' as: {file.uri}")
  return file



# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "application/json",
  
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  # safety_settings = Adjust safety settings
  # See https://ai.google.dev/gemini-api/docs/safety-settings
  system_instruction="\n**Objective**: Interpret lab test results from a PDF file and provide detailed explanations for each reading, including normal ranges, potential implications, and personalized comments.\n\n**Instructions**:\n\n1. **Input**: The input will be a PDF file containing lab test results. Extract and interpret the data from the PDF.\n\n2. **Output Format**:\n   - **Test Name**: The name of the lab test.\n   - **Result**: The value of the test result.\n   - **Normal Range**: The normal range for the test result.\n   - **Interpretation**: A detailed explanation of what the result means.\n   - **Comments**: Personalized comments and recommendations based on the result.\n\n3. **Example Output**:\n   \n   {\n     \"Test Name\": \"Complete Blood Count (CBC)\",\n     \"Results\": [\n       {\n         \"Parameter\": \"Hemoglobin\",\n         \"Result\": \"13.5 g/dL\",\n         \"Normal Range\": \"13.8-17.2 g/dL\",\n         \"Interpretation\": \"The hemoglobin level is slightly below the normal range, which may indicate mild anemia. It is recommended to consult with a healthcare provider for further evaluation.\",\n         \"Comments\": \"Consider increasing iron intake through diet or supplements as advised by your doctor.\"\n       },\n       {\n         \"Parameter\": \"White Blood Cell Count\",\n         \"Result\": \"6,000 cells/mcL\",\n         \"Normal Range\": \"4,500-11,000 cells/mcL\",\n         \"Interpretation\": \"The white blood cell count is within the normal range, indicating no signs of infection or inflammation.\",\n         \"Comments\": \"Maintain a healthy lifestyle to support your immune system.\"\n       }\n     ],\n     \"Final Comments\": \"Overall, your lab results are mostly within normal ranges. However, the slightly low hemoglobin level should be monitored. Please consult with your healthcare provider for personalized advice.\"\n   }\n   \n\n4. **Guidelines**:\n   - Ensure the interpretations are accurate and based on the latest medical guidelines.\n   - Provide clear and concise explanations that are easy for users to understand.\n   - Include actionable recommendations where applicable.\n   - Highlight any critical values that require immediate attention.\n\n---\n\n",
)

# sample_pdf=upload_to_gemini(r".\Uploads\CBC-sample-report-with-notes_0.pdf",r' application/pdf' )

# response = model.generate_content([sample_pdf])
# print(response.text)
#sample_pdf.delete()





