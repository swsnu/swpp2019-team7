import xml.etree.ElementTree as ElementTree
import os
import json
from copy import deepcopy
from tqdm import tqdm


"""
Parses the xml file, and saves into json fixture format (for Django Model), excluding unnecessary tags
"""

data_path = "dataset/data"  # Directory where original xml files are saved
idx = 0
product_template = {  # Django Model enforces this json format!
    "pk": idx,
    "model": "pill.pill",
    "fields": {
        "id": idx,
        "take_method": "",
        "product_name": "",
        "expiration_date": "",
        "functions": "",
        "store_method": "",
        "company_name": "",
        "standards": "",
        "precautions": ""
    }
}


class PillDataset:
    """
    Singleton Class that holds all pill commodities in the dataset
    Provides methods for matching a commodity from given text
    """
    _instance = None
    product_list = []  # list of json objects each representing one pill commodity in dataset
    product_name_dict = {}  # dictionary of products with product_name as key
    company_name_set = set()  # set of all company names

    @staticmethod
    def get_instance():
        if PillDataset._instance is None:
            PillDataset()
        return PillDataset._instance

    def __init__(self):
        assert PillDataset._instance is None, \
            "PillDataset class is singleton. Call PillDataset.get_instance() instead."

        PillDataset._instance = self

        for filename in os.listdir(data_path):
            if not filename.endswith('.xml'):
                continue
            else:
                print(f"Processing {filename}")
                tree = ElementTree.parse(os.path.join(data_path, filename))
                self.parse_file(tree)

    def parse_file(self, tree):
        root = tree.getroot()
        pill_count = len(root.findall('row'))

        for i in tqdm(range(pill_count)):
            global idx  # TODO change global idx to class variable

            product = deepcopy(product_template)
            product["pk"] = idx
            product["fields"]["id"] = idx
            product["fields"]["take_method"] = root[2 + i][0].text if root[2+i][0].text else "-"
            product["fields"]["product_name"] = root[2 + i][1].text
            product["fields"]["expiration_date"] = root[2 + i][4].text
            product["fields"]["functions"] = root[2 + i][6].text
            product["fields"]["store_method"] = root[2 + i][8].text
            product["fields"]["company_name"] = root[2 + i][10].text
            product["fields"]["standards"] = root[2 + i][13].text
            product["fields"]["precautions"] = root[2 + i][14].text

            self.product_list.append(product)
            self.product_name_dict[product["fields"]["product_name"]] = product
            self.company_name_set.add(root[2 + i][10].text)

            idx += 1

    def find_product_with_name(self, product_name):
        """
        :param product_name: name of the product to look for
        :return: product having given name as product_name / None if no product with given product_name
        """
        return self.product_name_dict.get(product_name)

    def match_product(self, text_list):
        """
        :param text_list: list of strings fetched from Vision API
        :return: dictionary of the matched commodity / None if not found
        """
        for text in text_list:
            if text in self.product_name_dict.keys():
                return self.find_product_with_name(text)

        return None


if __name__ == '__main__':
    data_path = "./data"
    pillDataset = PillDataset.get_instance()

    with open('./fixtures/pill_data.json', 'w', encoding='utf-8') as f:
        json.dump(pillDataset.json_list, f, ensure_ascii=False, indent=4)
