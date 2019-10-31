import io
import os

# Imports the Google Cloud client library
from google.cloud import vision
from google.cloud.vision import types

# Instantiates a client
def getImage(file):
    client = vision.ImageAnnotatorClient()

    # # The name of the vision file to annotate
    # file_name = os.path.join(
    #     os.path.dirname(__file__),
    #     filepath)
    #
    # # Loads the vision into memory
    # with io.open(file_name, 'rb') as image_file:
    #     content = image_file.read()

    with file.open('rb') as img:
        content = img.read()

    image = types.Image(content=content)

    # Performs label detection on the vision file
    response = client.text_detection(image=image)
    texts = response.text_annotations

    return texts
