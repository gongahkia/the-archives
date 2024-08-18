import scrapy

class BallsSpider(scrapy.Spider):

    name = "balls"

    start_urls = [
        "http://books.toscrape.com",
    ]

    def parse(self, response):

        for shit in response.css('ol.row'): 

            yield {
                'balls': shit.css('article.product_pod div.image_container a::attr(href)').get(),
                'squares': shit.css('article.product_pod p.star-rating::attr(class)').get().split()[-1], 
                'triangles': shit.css('article.product_pod div.product_price p.price_color::text').get(),
                'hexagon': shit.css('div.product_price p.instock.availability::text').getall()[-1].strip(),
            }

        next_page = response.css('li.next a::attr(href)').get() 

        if next_page is not None: 
            yield response.follow(next_page, self.parse) 
