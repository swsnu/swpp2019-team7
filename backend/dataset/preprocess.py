import xml.etree.ElementTree as ElementTree
import os
import json
from copy import deepcopy
from tqdm import tqdm

"""
Parses the xml file, and saves into json fixture format (for Django Model), excluding unnecessary tags
"""

idx = 0
jsonList = []
jsonDictFormat = {  # Django Model enforces this json format!
    "pk": idx,
    "model": "xmlParser.pill",
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


def parser(tree):
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
        jsonList.append(deepcopy(jsonDictFormat))


if __name__ == '__main__':
    path = './data'

    for filename in os.listdir(path):
        if not filename.endswith('.xml'):
            continue
        else:
            fullname = os.path.join(path, filename)
            tree = ElementTree.parse(fullname)
            parser(tree)
            print(filename)
        break  # 모든 파일 다 하고 싶으면 이거 없애기! 일단 한 파일에 대해서만 테스트해 보았음.
    with open('./fixtures/pill_data.json', 'w', encoding='utf-8') as f:
        json.dump(jsonList, f, ensure_ascii=False, indent=4)
