
SKILLS = {
    "DATA_SCIENTISTS_SKILLS":[
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
    ],

    "SKILLS_DB":[
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
    ],

    "CLOUD_ARCHITECT_SKILLS":[
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
    ],
    "DEVOPS_ENGINEER_SKILLS":[
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
    ],
    "MOBILE_DEVELOPER_SKILLS":[
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
    ],
    "ARTIFICIAL_INTELLIGENCE_ENGINEER_SKILLS":[
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
    ],
    "SECURITY_ENGINEER_SKILLS":[
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
    ],
    "NETWORK_ENGINEER_SKILLS":[
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
    ],
    "FRONT_END_DEVELOPER_SKILLS":[
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
    ],
    "BACKEND_DEVELOPER_SKILLS":[
        'Database Design', 
        'Server-side Scripting', 
        'API Development', 
        'Networking', 
        'Data Structures & Algorithms', 
        'Object-Oriented Programming', 
        'Django',
        'Python3',
        'Security & Authentication', 
        'Cloud Computing', 
        'Testing & Debugging', 
        'GIT'
    ],
    "PRODUCT_MANAGER_SKILLS":[
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
}


def find_skills(skill_name):
    return SKILLS[skill_name]

result = [1,24,4,5]
new_result = set(result)
print (len(new_result))