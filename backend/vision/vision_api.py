# pylint: skip-file
# Imports the Google Cloud client library
from google.cloud import vision
from google.cloud.vision import types
from dataset.preprocess import PillDataset


def call_ocr_api(file):
    with file.open('rb') as img:
        content = img.read()

    image = types.Image(content=content)

    # Performs label detection on the vision file
    client = vision.ImageAnnotatorClient()
    response = client.text_detection(image=image)
    text_list = response.text_annotations
    text_list = text_list[0].description.split("\n")

    return PillDataset.get_instance().match_product(text_list)
