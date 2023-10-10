# Use the official Python image as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app
# RUN pwd

# Copy the FastAPI app files to the container
COPY main.py .
COPY auth.py .
COPY db.py .
COPY requirements.txt .

# Copy directory for profile pictures and default profile picture
RUN mkdir -p mussepictures && chmod 755 mussepictures
COPY default_profile_picture.jpeg mussepictures/default_profile_picture.jpeg

# Install dependencies
RUN pip install -r requirements.txt

# Set environment variables
ENV DATABASE_URL sqlite:///./test.db

# Expose the port your FastAPI app will run on (change it as needed)
EXPOSE 42069

# Start the FastAPI application
RUN chmod +x main.py
CMD ["python3", "main.py"]
