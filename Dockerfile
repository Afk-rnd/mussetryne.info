# Use the official Python image as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app
RUN pwd

# Copy the FastAPI app files to the container
COPY main.py .
COPY auth.py .
COPY db.py .
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

ENV DATABASE_URL sqlite:///./test.db

# Expose the port your FastAPI app will run on (change it as needed)
EXPOSE 42069

# Start the FastAPI application
RUN chmod +x main.py
CMD ["python3", "main.py"]
