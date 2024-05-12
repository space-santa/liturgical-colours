from datetime import date, datetime
from typing import Optional

from fastapi import FastAPI

from src.liturgical_year import LiturgicalYear

app = FastAPI()


@app.get("/api/colour-of-the-day/")
def hello(date_str: Optional[str] = None):
    if date_str is not None:
        date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()
    else:
        date_obj = date.today()

    ly = LiturgicalYear(date_obj)
    return {"colour": ly.get_todays_colour()}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8000)
