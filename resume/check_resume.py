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
 
# file_directory = f'/media/{doc_name}'

def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)
 
 
if __name__ == '__main__':
    print(extract_text_from_pdf('./resume.pdf'))  # noqa: T001
    

#############################################################
 
 
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


 
 
if __name__ == '__main__':
    text = extract_text_from_pdf('resume.pdf')
    names = extract_names(text)
 
    if names:
        print(names[0])  # noqa: T001
 


 
PHONE_REG = re.compile(r'[\+\(]?[1-9][0-9 .\-\(\)]{8,}[0-9]')
 
 
# def doc_to_text_catdoc(file_path):
#     try:
#         process = subprocess.Popen(  # noqa: S607,S603
#             ['catdoc', '-w', file_path],
#             stdout=subprocess.PIPE,
#             stderr=subprocess.PIPE,
#             universal_newlines=True,
#         )
#     except (
#         FileNotFoundError,
#         ValueError,
#         subprocess.TimeoutExpired,
#         subprocess.SubprocessError,
#     ) as err:
#         return (None, str(err))
#     else:
#         stdout, stderr = process.communicate()
 
#     return (stdout.strip(), stderr.strip())

def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)
 
 
def extract_phone_number(resume_text):
    phone = re.findall(PHONE_REG, resume_text)
 
    if phone:
        number = ''.join(phone[0])
 
        if resume_text.find(number) >= 0 and len(number) <= 16:
            return number
    return None
 
 
if __name__ == '__main__':
    text = extract_text_from_pdf('resume.pdf')
    phone_number = extract_phone_number(text)
 
    print(phone_number)  # noqa: T001
    
    
    
    
    
    
# example_06.py
 

 
EMAIL_REG = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')
 
 
def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)
 
 
def extract_emails(resume_text):
    return re.findall(EMAIL_REG, resume_text)
 
 
if __name__ == '__main__':
    text = extract_text_from_pdf('resume.pdf')
    emails = extract_emails(text)
 
    if emails:
        print(emails[0])  # noqa: T001
        
        
        
        
        
# example_07.py
 

 
# you may read the database from a csv file or some other database

 
 
def extract_text_from_docx(docx_path):
    txt = docx2txt.process(docx_path)
    if txt:
        return txt.replace('\t', ' ')
    return None
 
def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)

DATA_SCIENTISTS_SKILLS =[
        'Python',
        'SQL',
        'R',
        'Statistics', 
        'Data Visualization', 
        'Statistical Analysis', 
        'Machine Learning', 
        'Data Mining', 
        'Data Visualization', 
        'Data Wrangling', 
        'Data Cleaning', 
        'Database Management', 
        'SQL', 
        'Business Intelligence', 
        'Problem-Solving'
    ]

CLOUD_ARCHITECT_SKILLS = [
        'AWS', 
        'Azure', 
        'Cloud Computing', 
        'Infrastructure Design', 
        'Security', 
        'Cloud Infrastructure Design', 
        'Cloud Migration Planning', 
        'Cloud Security Architecture', 
        'Cloud Automation', 
        'Cost Optimization', 
        'Cloud Networking', 
        'Cloud Storage Management', 
        'DevOps Methodology', 
        'Cloud Monitoring and Troubleshooting', 
        'Cloud Provider Management'
    ]

DEVOPS_ENGINEER_SKILLS = [
        'Linux', 
        'AWS', 
        'Azure', 
        'Docker', 
        'Kubernetes', 
        'Ansible', 
        'Linux Administration', 
        'Automation and Scripting', 
        'Cloud Computing', 
        'Continuous Integration/Delivery',
        'Docker',
        'CI/CD Network Security', 
        'Monitoring and Logging', 
        'Database Administration', 
        'Git'
    ]

MOBILE_DEVELOPER_SKILLS = [
        'Swift', 
        'Kotlin', 
        'React Native', 
        'iOS', 
        'Android', 
        'Objective-C', 
        'Swift', 
        'API', 
        'UI Design', 
        'UX Design', 
        'Cross-Platform', 
        'Debugging', 
        'Troubleshooting', 
        'Agile Development', 
        'Android', 
        'CICD'
    ]

ARTIFICIAL_INTELLIGENCE_ENGINEER_SKILLS=[
        'Python', 
        'Machine Learning', 
        'TensorFlow', 
        'Keras', 
        'Natural Language Processing', 
        'Machine Learning', 
        'Natural Language Processing', 
        'Computer Vision', 
        'Robotics', 
        'Neural Networks', 
        'Data Mining', 
        'Deep Learning', 
        'Problem-Solving', 
        'Algorithm Design'
    ]

SECURITY_ENGINEER_SKILLS = [
    'Network Security', 
    'Firewalls', 
    'Encryption', 
    'Identity Management', 
    'System Administration', 
    'Risk Analysis', 
    'Firewall Configuration', 
    'Security Protocols', 
    'Intrusion Detection', 
    'Application Security', 
    'Security Auditing', 
    'Data Encryption', 
    'Cybercrime Investigation'
]

NETWORK_ENGINEER_SKILLS =[
    'Network Protocols', 
    'Routers', 
    'Switching', 
    'Firewalls', 
    'TCP/IP', 
    'Network Design and Configuration', 
    'Troubleshooting and Problem-Solving', 
    'Knowledge of Networking Protocols and Standards', 
    'Firewall Administration,' 
    'Virtualization', 
    'Network Security', 
    'Cloud Computing', 
    'System and Network Monitoring', 
    'Scripting and Automation', 
    'Network Optimization'
]

FRONT_END_DEVELOPER_SKILLS = [
    'HTML/CSS', 
    'JavaScript', 
    'Responsive Design', 
    'Browser Developer Tools', 
    'UI/UX Design', 
    'AJAX/JSON', 
    'React/Angular/Vue.js', 
    'Cross-Browser Compatibility', 
    'SEO Optimization', 
    'Accessibility/Usability'
]

BACKEND_DEVELOPER_SKILLS = [
    'Database Design', 
    'Server-side Scripting', 
    'API Development', 
    'Networking', 
    'Data Structures & Algorithms', 
    'Object-Oriented Programming', 
    'Security & Authentication', 
    'Cloud Computing', 
    'Testing & Debugging', 
    'GIT'
]

PRODUCT_MANAGER_SKILLS = [
    'Agile', 
    'Scrum', 
    'User Experience', 
    'Business Analysis', 
    'Project Management', 
    'Strategic Planning', 
    'Cross-Functional Collaboration', 
    'Market Research', 
    'Product Development', 
    'Project Management', 
    'UX/UI Design', 
    'Business Analysis', 
    'Data Analysis', 
    'Problem-Solving', 
    'Communication'
]

SKILLS_DB = [
    'machine learning',
    'data science',
    'python',
    'word',
    'excel',
    'english',
    'next',
    'git',
    'node',
    'typescript',
    'react',
    'javascript',
    'java',
    'php'
]
 
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

# if __name__ == '__main__':
#     text = extract_text_from_pdf('resume.pdf')
#     skills = extract_skills(text)
 
#     print("these are the skils", skills)  # noqa: T001
    
    

# example_08.py
 
 #######################3 commented out because of api call failing
 
# def extract_text_from_docx(docx_path):
#     txt = docx2txt.process(docx_path)
#     if txt:
#         return txt.replace('\t', ' ')
#     return None
 
# def extract_text_from_pdf(pdf_path):
#     return extract_text(pdf_path)


# def skill_exists(skill):
#     url = f'https://api.apilayer.com/skills?q={skill}&amp;count=1'
#     headers = {'apikey': 'YOUR API KEY'}
#     response = requests.request('GET', url, headers=headers)
#     result = response.json()
 
#     if response.status_code == 200:
#         return len(result) &gt; 0 and result[0].lower() == skill.lower()
#     raise Exception(result.get('message'))
 
 
# def extract_skills(input_text):
#     stop_words = set(nltk.corpus.stopwords.words('english'))
#     word_tokens = nltk.tokenize.word_tokenize(input_text)
 
#     # remove the stop words
#     filtered_tokens = [w for w in word_tokens if w not in stop_words]
 
#     # remove the punctuation
#     filtered_tokens = [w for w in word_tokens if w.isalpha()]
 
#     # generate bigrams and trigrams (such as artificial intelligence)
#     bigrams_trigrams = list(map(' '.join, nltk.everygrams(filtered_tokens, 2, 3)))
 
#     # we create a set to keep the results in.
#     found_skills = set()
 
#     # we search for each token in our skills database
#     for token in filtered_tokens:
#         if skill_exists(token.lower()):
#             found_skills.add(token)
 
#     # we search for each bigram and trigram in our skills database
#     for ngram in bigrams_trigrams:
#         if skill_exists(ngram.lower()):
#             found_skills.add(ngram)
 
#     return found_skills
 
 
# if __name__ == '__main__':
#     text = extract_text_from_pdf('resume.pdf')
#     skills = extract_skills(text)
 
#     print(skills)  # noqa: T001
    
    
    
    
    
    
    
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
 
 
if __name__ == '__main__':
    text = extract_text_from_pdf('resume.pdf')
    education_information = extract_education(text)
 
    print(education_information)  # noqa: T001
    
    
    
    
    
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
 
 
if __name__ == '__main__':
    text = extract_text_from_pdf('resume.pdf')
    education_information = extract_education(text)
 
    print(education_information)  # noqa: T001
 
 