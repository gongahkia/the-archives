# i suck
# this isn't working right now oops
# come debug this later

import scrapy

class QuotesSpider(scrapy.Spider): 

    name = "singapore_weather"

    start_urls = [
        'https://openweathermap.org/city/1880252',
    ]

    def parse(self, response):

        for day in response.css('ul.day-list'): 

            yield { 

                'day_and_date': day.css('li span::text').get(),
                'temperature': day.css('li span::text').get(),
                'weather': day.css('li span.sub::text').get()
                 
            }
