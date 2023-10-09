from typing import Tuple
from PIL import Image
from fastapi import UploadFile




# Constants:

PROFILE_PIC_WIDTH = 300
PROFILE_PIC_HEIGHT = 300




def resize_image(image: Image, size: Tuple[int, int], save_path: str | None = None):
    """Resizes an image to the specified size and saves it to the specified path."""
    if image.mode != "RGB":
        image = image.convert("RGB")

    # Resize the image to the specified size
    image = image.resize(size)

    # Save the resized image to the specified path
    if save_path:
        image.save(save_path, "JPEG")

def convert_to_jpeg(image: Image, save_path: str | None = None):
    """ Function to convert image to jpeg. `save_path` is optional and decides where to save the converted file. """

    # Convert the image to JPEG format
    image = image.convert("JPEG")

    # Save the converted image to a file
    if save_path:
        with open(save_path, "wb") as buffer:
            image.save(buffer)
    
    return image

def is_jpeg(file: UploadFile):
    """ Function to check if file is jpeg. Deals with jpg/jpeg. """
    return file.content_type == "image/jpeg" or file.content_type == "image/jpg"

async def process_mussepicture(file: UploadFile, save_path: str | None = None):
    """ Function to process mussepicture. """
    file_contents = await file.read()
    image = Image.open(file_contents)

    if not is_jpeg(file):
        file = convert_to_jpeg(image)
    
    resize_image(file, save_path=save_path, size=(PROFILE_PIC_WIDTH, PROFILE_PIC_HEIGHT))
