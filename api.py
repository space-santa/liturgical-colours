from datetime import date

from fastapi import FastAPI

from src.liturgical_year import LiturgicalYear

app = FastAPI()


@app.get("/api/colour-of-the-day")
def hello():
    ly = LiturgicalYear(date.today())
    return {"colour": ly.get_todays_colour()}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8000)
