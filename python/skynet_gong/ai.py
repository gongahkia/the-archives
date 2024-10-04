# !NOTE
    # gpt4.o implementation of nlp powered entity recognition, enabling text processing and sentence parsing
    # nlp is the baby brother of langchain-powered LLMs

import spacy

nlp = spacy.load('en_core_web_sm')

# FUA 
# change this so it reads the body paragraph instead but cleaned up
# just fhand.open() or something

text = """
Dr. Intan Azura Mokhtar asked the Minister for Education about the SkillsFuture initiative. Mr. Ong Ye Kung responded by detailing employment outcomes for graduates.
"""

doc = nlp(text)

document_sentences_array = []
for sent in doc.sents:
    # print(sent.text)
    document_sentences_array.append(sent.text)

def show_all_entities(doc):
    print("entities identified within the text")
    for ent in doc.ents:
        print(f'{ent.text}: {ent.label_}')
    return

def collect_entities(doc):
    entities_map = {}
    for ent in doc.ents:
        entities_map[ent.label_] = ent.text
    return entities_map

def identify_speakers(doc):
    speakers = []
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            speakers.append(ent.text)
    return speakers

# ----- execution code -----

print(f"speakers identified: {identify_speakers(doc)}")