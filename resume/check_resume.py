# pip install pdfminer.six
# pip install nltk

import docx2txt
import nltk
import re
import subprocess  # noqa: S404
import requests
 
from .skills import find_skills
from pdfminer.high_level import extract_text

nltk.download('stopwords')
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('maxent_ne_chunker')
nltk.download('words')
 

def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)
 
 
def extract_text_from_docx(docx_path):
    txt = docx2txt.process(docx_path)
    if txt:
        return txt.replace('\t', ' ')
    return None


def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)

 
def extract_names(txt):
    person_names = []
 
    for sent in nltk.sent_tokenize(txt):
        for chunk in nltk.ne_chunk(nltk.pos_tag(nltk.word_tokenize(sent))):
            if hasattr(chunk, 'label') and chunk.label() == 'PERSON':
                person_names.append(
                    ' '.join(chunk_leave[0] for chunk_leave in chunk.leaves())
                )
 
    return person_names

@staticmethod
def get_names(file_path):
    text = extract_text_from_pdf(file_path)
    names = extract_names(text)
    
    return names[0]


 
PHONE_REG = re.compile(r'[\+\(]?[1-9][0-9 .\-\(\)]{8,}[0-9]')
 
 
def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)
 

def extract_phone_number(resume_text):
    phone = re.findall(PHONE_REG, resume_text)
 
    if phone:
        number = ''.join(phone[0])
 
        if resume_text.find(number) >= 0 and len(number) <= 16:
            return number
    return None
 
@staticmethod
def get_phonenumber(file_name):
    text = extract_text_from_pdf(file_name)
    phone_number = extract_phone_number(text)
    
    return phone_number

 

 
EMAIL_REG = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')
 
 
def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)
 
 
def extract_emails(resume_text):
    return re.findall(EMAIL_REG, resume_text)
 
@staticmethod
def get_emails(file_path):
    text = extract_text_from_pdf(file_path)
    emails = extract_emails(text)
    
    return emails[0]
 

 
 
 
def extract_text_from_docx(docx_path):
    txt = docx2txt.process(docx_path)
    if txt:
        return txt.replace('\t', ' ')
    return None
 
def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)

 
def extract_skills(input_text, role):
    stop_words = set(nltk.corpus.stopwords.words('english'))
    word_tokens = nltk.tokenize.word_tokenize(input_text)
 
    # remove the stop words
    filtered_tokens = [w for w in word_tokens if w not in stop_words]
 
    # remove the punctuation
    filtered_tokens = [w for w in word_tokens if w.isalpha()]
 
    # generate bigrams and trigrams (such as artificial intelligence)
    bigrams_trigrams = list(map(' '.join, nltk.everygrams(filtered_tokens, 2, 3)))
 
    # we create a set to keep the results in.
    found_skills = set()
    
    returned_skills = find_skills(role)

    # we search for each token in our skills database
    for token in filtered_tokens:
        if token.lower() in returned_skills:
            found_skills.add(token)

    # we search for each bigram and trigram in our skills database
    for ngram in bigrams_trigrams:
        if ngram.lower() in returned_skills:
            found_skills.add(ngram)

    return found_skills, returned_skills
 
@staticmethod
def get_result(file_path, role):
    text = extract_text_from_pdf(file_path)
    skills = extract_skills(text, role)
    return skills
 
RESERVED_WORDS = [
    'school',
    'college',
    'univers',
    'academy',
    'faculty',
    'institute',
    'faculdades',
    'Schola',
    'schule',
    'lise',
    'lyceum',
    'lycee',
    'polytechnic',
    'kolej',
    'ünivers',
    'okul',
]
 
 
def extract_text_from_docx(docx_path):
    txt = docx2txt.process(docx_path)
    if txt:
        return txt.replace('\t', ' ')
    return None

def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)
 
def extract_education(input_text):
    organizations = []
 
    # first get all the organization names using nltk
    for sent in nltk.sent_tokenize(input_text):
        for chunk in nltk.ne_chunk(nltk.pos_tag(nltk.word_tokenize(sent))):
            if hasattr(chunk, 'label') and chunk.label() == 'ORGANIZATION':
                organizations.append(' '.join(c[0] for c in chunk.leaves()))
 
    # we search for each bigram and trigram for reserved words
    # (college, university etc...)
    education = set()
    for org in organizations:
        for word in RESERVED_WORDS:
            if org.lower().find(word) >= 0:
                education.add(org)
 
    return education
 
 
# if __name__ == '__main__':
#     text = extract_text_from_pdf('resume.pdf')
#     education_information = extract_education(text)
 
#     print(education_information)  # noqa: T001
    
    
    
    
    
# example_09.py
 
 
 
RESERVED_WORDS = [
    'school',
    'college',
    'univers',
    'academy',
    'faculty',
    'institute',
    'faculdades',
    'Schola',
    'schule',
    'lise',
    'lyceum',
    'lycee',
    'polytechnic',
    'kolej',
    'ünivers',
    'okul',
]
 
 
def extract_text_from_docx(docx_path):
    txt = docx2txt.process(docx_path)
    if txt:
        return txt.replace('\t', ' ')
    return None

def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)
 
def extract_education(input_text):
    organizations = []
 
    # first get all the organization names using nltk
    for sent in nltk.sent_tokenize(input_text):
        for chunk in nltk.ne_chunk(nltk.pos_tag(nltk.word_tokenize(sent))):
            if hasattr(chunk, 'label') and chunk.label() == 'ORGANIZATION':
                organizations.append(' '.join(c[0] for c in chunk.leaves()))
 
    # we search for each bigram and trigram for reserved words
    # (college, university etc...)
    education = set()
    for org in organizations:
        for word in RESERVED_WORDS:
            if org.lower().find(word) >= 0:
                education.add(org)
 
    return education
 
 
# if __name__ == '__main__':
#     text = extract_text_from_pdf('resume.pdf')
#     education_information = extract_education(text)
 
#     print(education_information)  # noqa: T001
 
 