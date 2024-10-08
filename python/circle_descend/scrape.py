from selenium import webdriver
from selenium.webdriver.common.by import By
import time

def get_clues_and_input_boxes(driver, url):
    driver.get(url)
    time.sleep(3)
    clues = driver.find_elements(By.CLASS_NAME, "crossclimb__clue-section")
    clues_text = [clue.text for clue in clues]
    input_boxes = driver.find_elements(By.CLASS_NAME, "crossclimb__guess__inner")
    return clues_text, input_boxes

if __name__ == "__main__":
    url = "https://www.linkedin.com/games/crossclimb"
    driver = webdriver.Chrome()
    clues, input_boxes = get_clues_and_input_boxes(driver, url)
    print("Clues:", clues)
    print("Input boxes found:", len(input_boxes))
    driver.quit()