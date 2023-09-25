# Use the official Python image as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the FastAPI app files to the container
COPY main.py .
COPY auth.py .
COPY db.py .
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Expose the port your FastAPI app will run on (change it as needed)
EXPOSE 8000

# Start the FastAPI application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
