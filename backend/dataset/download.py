import urllib.request

BASE_URL = 'http://openapi.foodsafetykorea.go.kr/api/6d82f3c09e2f4568b124/I0030/xml/'


if __name__ == '__main__':
    for i in range(0, 50000, 1000):
        if i == 0:
            idx = i + 1
        else:
            idx = i
        url = BASE_URL + f'{idx}/{idx+1000}'
        urllib.request.urlretrieve(url, f'./data/{idx}.xml')
