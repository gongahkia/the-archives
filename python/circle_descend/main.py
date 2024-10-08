import scrape as sc
import guesser as g
import sorter as so
from selenium import webdriver

def solve_crossclimb(url, dictionary_file):
    driver = webdriver.Chrome()
    clues, input_boxes = get_clues_and_input_boxes(driver, url)
    words = load_words(dictionary_file)
    possible_words = filter_words_by_clues(clues, words)
    sorted_words = sort_words_by_letter_difference(possible_words)
    for word, input_box in zip(sorted_words, input_boxes):
        input_box.send_keys(word)
    print("Solved words entered!")
    driver.quit()

if __name__ == "__main__":
    url = "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt"
    temp_file = "words.txt"
    temp_file_2 = "4_letter_words.txt"
    g.download_word_list(url, temp_file)
    four_letter_words = g.extract_four_letter_words(temp_file)
    g.download_4_letter_words(four_letter_words, temp_file_2)
    print(f"4-letter words have been extracted to {temp_file_2}.")