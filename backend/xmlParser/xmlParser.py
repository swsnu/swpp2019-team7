import xml.etree.ElementTree as ET
import os
import json
from copy import deepcopy

#parse the xml file -> Format it into json fixture format, but DO NOT include the unnecessary tags
pk = 0
jsonList = []
jsonDictFormat = {  # You ALWAYS have to use this format 
    "pk": pk,
    "model": "xmlParser.pill",
    "fields": {
        "id" : pk,
        "take_method" : "",
        "product_name" : "",
        "expiration_date" : "",
        "functions" : "",
        "store_method" : "",
        "company_name" : "",
        "standards" : "",
        "precautions" : ""
    }
}
#jsonList.append(jsonDictFormat)
#print(json.dumps(jsonList)) #It works! <- Dictionary to string!

def parser(tree):
    root = tree.getroot()
    pillCount = len(root.findall('row'))
    #print(pillCount)
    for i in range(pillCount):
        global pk
        jsonDictFormat["pk"]=pk
        jsonDictFormat["fields"]["id"]=pk
        jsonDictFormat["fields"]["take_method"] = root[2+i][0].text
        jsonDictFormat["fields"]["product_name"] = root[2+i][1].text
        jsonDictFormat["fields"]["expiration_date"] = root[2+i][4].text
        jsonDictFormat["fields"]["functions"] = root[2+i][6].text
        jsonDictFormat["fields"]["store_method"] = root[2+i][8].text
        jsonDictFormat["fields"]["company_name"] = root[2+i][10].text
        jsonDictFormat["fields"]["standards"] = root[2+i][13].text
        jsonDictFormat["fields"]["precautions"] = root[2+i][14].text
        #print(root[2+i][4].text)
        pk += 1
        jsonList.append(deepcopy(jsonDictFormat))
    


path = './data'
j = 0
for filename in os.listdir(path):
    if not filename.endswith('.xml'): continue
    fullname = os.path.join(path, filename)
    tree = ET.parse(fullname)
    parser(tree)
    print(filename)
    break   # 모든 파일 다 하고 싶으면 이거 없애기! 일단 한 파일에 대해서만 테스트해 보았음.
with open('./fixtures/pillData.json', 'w', encoding='utf-8') as f:
    json.dump(jsonList, f, ensure_ascii=False, indent=4)
