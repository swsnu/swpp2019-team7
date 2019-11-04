# pylint: skip-file
import xml.etree.ElementTree as ElementTree
import os
import json
from copy import deepcopy
from tqdm import tqdm


"""
Parses the xml file, and saves into json fixture format (for Django Model), excluding unnecessary tags
"""

data_path = "dataset/data"  # Directory where original xml files are saved
preprocessed_path = "dataset"  # Directory where take_method.preprocessed is saved
product_template = {  # Django Model enforces this json format!
    "pk": 0,
    "model": "pill.pill",
    "fields": {
        "id": 0,
        "take_method": "",
        "product_name": "",
        "expiration_date": "",
        "functions": "",
        "store_method": "",
        "company_name": "",
        "standards": "",
        "precautions": "",
        "take_method_preprocessed": "",
    }
}


class PillDataset:
    """
    Singleton Class that holds all pill commodities in the dataset
    Provides methods for matching a commodity from given text
    """
    _instance = None
    product_list = []  # list of json objects each representing one pill commodity in dataset
    date_list = []  # list of preprocessed date times / e.g. "1일 1회", "1일 1정"
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

        # Date Parsing (e.g. 1일 1회)
        with open(os.path.join(preprocessed_path, 'take_method.preprocessed'), 'r') as f:
            method_pos_list = list(map(eval, f.read().split('\n')))

        for idx in range(len(self.product_list)):
            product = self.product_list[idx]
            method_pos = method_pos_list[idx]

            date = "1일 1회"  # Default take_method
            for i in range(len(method_pos) - 1):
                token = method_pos[i]
                next_token = method_pos[i + 1]

                if token[1] == 'NR' and next_token[0] == '일' and \
                        method_pos[i + 2][1] == 'NR' and 'NN' in method_pos[i + 3][1]:
                    date = token[0] + next_token[0] + " " + method_pos[i + 2][0] + method_pos[i + 3][0]
                    break
            self.date_list.append(date)
            product["fields"]["take_method_preprocessed"] = date

    def parse_file(self, tree):
        root = tree.getroot()
        pill_count = len(root.findall('row'))

        for i in tqdm(range(pill_count)):
            idx = len(self.product_list)

            product = deepcopy(product_template)
            product["pk"] = idx
            product["fields"]["id"] = idx
            product["fields"]["take_method"] = root[2 + i][0].text if root[2 + i][0].text else "-"
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
    preprocessed_path = "."
    pillDataset = PillDataset.get_instance()

    with open('./fixtures/pill_data.json', 'w', encoding='utf-8') as f:
        json.dump(pillDataset.product_list, f, ensure_ascii=False, indent=4)
