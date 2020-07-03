from selenium import webdriver

chrome_browser = webdriver.Chrome('./chromedriver')

chrome_browser.get('https://www.seleniumeasy.com/test/basic-first-form-demo.html')

show_message_button = chrome_browser.find_element_by_class_name('btn-default')
print(show_message_button.get_attribute('innerHTML'))

assert 'Show Message' in chrome_browser.page_source

text_box = chrome_browser.find_element_by_id('user-message')
text_box.clear()
text_box.send_keys('TESTING SELENIUM')

show_message_button.click()

output_message = chrome_browser.find_element_by_id('display')

assert 'TESTING SELENIUM' in output_message.text

chrome_browser.quit()
