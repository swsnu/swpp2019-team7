import xml.etree.ElementTree as ET
import os
import json

#parse the xml file -> Format it into json fixture format, but DO NOT include the unnecessary tags
pk = 0
jsonList = []
jsonDictFormat = {  # You ALWAYS have to use this format 
    "pk": pk,
    "model": "xmlParser.pill",
    "fields": {
        "id" : pk,
        "take-method" : "",
        "product-name" : "",
        "expiration-date" : "",
        "functions" : "",
        "store-method" : "",
        "company-name" : "",
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
        jsonDictFormat["fields"]["take-method"] = root[2+i][0].text
        jsonDictFormat["fields"]["product-name"] = root[2+i][1].text
        jsonDictFormat["fields"]["expiration-date"] = root[2+i][4].text
        jsonDictFormat["fields"]["functions"] = root[2+i][6].text
        jsonDictFormat["fields"]["store-method"] = root[2+i][8].text
        jsonDictFormat["fields"]["company-name"] = root[2+i][10].text
        jsonDictFormat["fields"]["standards"] = root[2+i][13].text
        jsonDictFormat["fields"]["precautions"] = root[2+i][14].text
        #print(root[2+i][4].text)
        pk += 1
        jsonList.append(jsonDictFormat.copy())
    


path = './data'
for filename in os.listdir(path):
    if not filename.endswith('.xml'): continue
    fullname = os.path.join(path, filename)
    tree = ET.parse(fullname)
    parser(tree)
#print(len(jsonList))    #correct!
#print(jsonList[0])
print(json.dumps(jsonList, ensure_ascii=False))
