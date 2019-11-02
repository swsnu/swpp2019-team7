# pylint: skip-file
# Imports the Google Cloud client library
from google.cloud import vision
from google.cloud.vision import types


# Instantiates a client
def call_ocr_api(file):
    client = vision.ImageAnnotatorClient()

    with file.open('rb') as img:
        content = img.read()

    image = types.Image(content=content)

    # Performs label detection on the vision file
    response = client.text_detection(image=image)
    texts = response.text_annotations

    return texts
