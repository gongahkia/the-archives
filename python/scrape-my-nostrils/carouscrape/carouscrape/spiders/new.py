import scrapy

class CarousellSpider(scrapy.Spider): 

    name = "carousell"

    start_urls = [
        "https://www.carousell.sg/search/bouldering/?addRecent=true&canChangeKeyword=true&includeSuggestions=true&searchId=Pnw8dg&t-search_query_source=direct_search"
    ]

    def parse(self, response):

        for quote in response.css('div.D_uR.D_ot'):

            yield {
                'text': quote.css('div[data-testid="listing-card-text-seller-name"]').get(),
            }

        next_page = response.css('button.D_kb.D_jT.D_kp.D_kk.D_jX.D_GN::attr(onclick)').get()

        if next_page is not None: # break condition for recursive function call
            yield response.follow(next_page, self.parse)
