import xml.etree.ElementTree as ElementTree
import os
import json
from copy import deepcopy
from tqdm import tqdm
from pykospacing import spacing
import ipdb

"""
Parses the xml file, and saves into json fixture format (for Django Model), excluding unnecessary tags
"""

idx = 0
jsonDictFormat = {  # Django Model enforces this json format!
    "pk": idx,
    "model": "APPNAME.pill",  # TODO change APPNAME to real app name containing pill model
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
    json_list = []  # list of json objects each representing one pill commodity in dataset
    product_name_set = set()  # set of all product names
    company_name_set = set()  # set of all company names

    @staticmethod
    def get_instance(data_path):
        if PillDataset._instance is None:
            PillDataset(data_path)
        return PillDataset._instance

    def __init__(self, data_path):
        assert PillDataset._instance is None, \
            "PillDataset class is singleton. Call PillDataset.get_instance() instead."

        PillDataset._instance = self

        for fname in os.listdir(data_path):
            if not fname.endswith('.xml'):
                continue
            else:
                print(f"Processing {fname}")
                tree = ElementTree.parse(os.path.join(data_path, fname))
                self.parse_file(tree)

    def parse_file(self, tree):
        root = tree.getroot()
        pill_count = len(root.findall('row'))

        for i in tqdm(range(pill_count)):
            global idx
            jsonDictFormat["pk"] = idx
            jsonDictFormat["fields"]["id"] = idx
            jsonDictFormat["fields"]["take_method"] = root[2 + i][0].text
            jsonDictFormat["fields"]["product_name"] = root[2 + i][1].text
            jsonDictFormat["fields"]["expiration_date"] = root[2 + i][4].text
            jsonDictFormat["fields"]["functions"] = root[2 + i][6].text
            jsonDictFormat["fields"]["store_method"] = root[2 + i][8].text
            jsonDictFormat["fields"]["company_name"] = root[2 + i][10].text
            jsonDictFormat["fields"]["standards"] = root[2 + i][13].text
            jsonDictFormat["fields"]["precautions"] = root[2 + i][14].text
            idx += 1
            self.json_list.append(deepcopy(jsonDictFormat))

            self.product_name_set.add(root[2 + i][1].text)
            self.company_name_set.add(root[2 + i][10].text)

    def match_product(self, text):
        """
        :param text: body of the string fetched from Vision API
        :return: dictionary of the matched commodity / null if not found
        """
        print(spacing("마이더블유피아이에이치쉐이크"))


if __name__ == '__main__':

    pillDataset = PillDataset.get_instance("./data")
    ipdb.set_trace()

    with open('./fixtures/pill_data.json', 'w', encoding='utf-8') as f:
        json.dump(pillDataset.json_list, f, ensure_ascii=False, indent=4)
