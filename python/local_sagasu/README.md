# [`Sagasu`](https://github.com/gongahkia/sagasu) minus the [telegram bot](https://github.com/gongahkia/sagasu/tree/main/bot)

* locally scheduled using [anacron](https://en.wikipedia.org/wiki/Anacron)
* requires `.env` file specifying user credentials and scraping configuration as below
* leave field empty if no specification

```env
USERNAME=
PASSWORD=
DATE_RAW=
DURATION_HRS=
START_TIME=
ROOM_CAPACITY_RAW=
BUILDING_ARRAY=
FLOOR_ARRAY=
FACILITY_TYPE_ARRAY=
EQUIPMENT_ARRAY=
```