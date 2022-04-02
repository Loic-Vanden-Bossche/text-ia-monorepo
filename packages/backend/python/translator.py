import sys
from deep_translator import GoogleTranslator

if __name__ == '__main__':
    toTranslate = sys.argv[1:][0]
    if toTranslate:
        print(GoogleTranslator(source='en', target='fr').translate(toTranslate))
    else:
        print('error')
