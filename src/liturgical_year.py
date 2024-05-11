from datetime import date, timedelta

from src.errors import (
    enforce_friday,
    enforce_monday,
    enforce_sunday,
    enforce_thursday,
    enforce_wednesday,
)


def calculate_easter(year: int) -> date:
    # Computus algorithm to find the date of Easter Sunday
    a = year % 19
    b = year // 100
    c = year % 100
    d = b // 4
    e = b % 4
    f = (b + 8) // 25
    g = (b - f + 1) // 3
    h = (19 * a + b - d - g + 15) % 30
    i = c // 4
    k = c % 4
    l = (32 + 2 * e + 2 * i - h - k) % 7
    m = (a + 11 * h + 22 * l) // 451
    month = (h + l - 7 * m + 114) // 31
    day = ((h + l - 7 * m + 114) % 31) + 1

    return date(year, month, day)


def calculate_first_ordinary_time(year: int) -> date:
    # Find the Sunday nearest to January 6 (Feast of the Epiphany)
    epiphany_date = date(year, 1, 6)
    day_of_week = epiphany_date.weekday()

    # Calculate the difference to the next Sunday
    days_to_next_sunday = (6 - day_of_week) % 7

    # First Sunday after January 6
    first_sunday_after_epiphany = epiphany_date + timedelta(days=days_to_next_sunday)

    # Ordinary Time begins on the Monday after the First Sunday after January 6
    first_ordinary_time_date = first_sunday_after_epiphany + timedelta(days=1)

    return first_ordinary_time_date


def calculate_first_advent(year: int) -> date:
    # Find the Sunday nearest to the feast of St. Andrew (November 30)
    st_andrew_date = date(year, 11, 30)
    day_of_week = st_andrew_date.weekday()

    # Calculate the difference to the next Sunday
    days_to_next_sunday = (6 - day_of_week) % 7

    # First Sunday of Advent
    first_advent_date = st_andrew_date + timedelta(days=days_to_next_sunday)

    return first_advent_date


class LiturgicalYear:
    def __init__(self, today: date) -> None:
        self.today = today
        self.year = self.today.year

        self.first_advent = calculate_first_advent(self.year)
        enforce_sunday(self.first_advent)

        self.first_ordinary_time_start = calculate_first_ordinary_time(self.year)
        enforce_monday(self.first_ordinary_time_start)

        self.easter_sunday = calculate_easter(self.year)
        enforce_sunday(self.easter_sunday)

        self.assumption_of_mary = date(year=self.year, month=8, day=15)

        self.all_saints = date(year=self.year, month=11, day=1)

        self.st_andrew = date(year=self.year, month=11, day=30)

        self.third_advent = self.first_advent + timedelta(days=14)
        enforce_sunday(self.third_advent)

    @property
    def ash_wednesday(self):
        ash_wednesday = self.easter_sunday - timedelta(days=46)
        enforce_wednesday(ash_wednesday)
        return ash_wednesday

    @property
    def forth_sunday_of_lent(self):
        forth_sunday_of_lent = self.easter_sunday - timedelta(days=21)
        enforce_sunday(forth_sunday_of_lent)
        return forth_sunday_of_lent

    @property
    def palm_sunday(self):
        palm_sunday = self.easter_sunday - timedelta(days=7)
        enforce_sunday(palm_sunday)
        return palm_sunday

    @property
    def maundy_thursday(self):
        maundy_thursday = self.easter_sunday - timedelta(days=3)
        enforce_thursday(maundy_thursday)
        return maundy_thursday

    @property
    def good_friday(self):
        good_friday = self.easter_sunday - timedelta(days=2)
        enforce_friday(good_friday)
        return good_friday

    @property
    def pentecost(self):
        pentecost = self.easter_sunday + timedelta(days=49)
        enforce_sunday(pentecost)
        return pentecost

    @property
    def rose_days(self):
        return [self.third_advent, self.forth_sunday_of_lent]

    @property
    def red_days(self):
        return [
            self.palm_sunday,
            self.good_friday,
            self.pentecost,
            self.st_andrew,
        ]

    @property
    def white_days(self):
        return [self.assumption_of_mary, self.all_saints]

    def date_is_in_advent(self, value):
        year = value.year
        christmas = date(year=year, month=12, day=25)

        return self.first_advent <= value < christmas

    @staticmethod
    def date_is_in_christmas_time(value: date):
        year = value.year
        christmas = date(year=year, month=12, day=25)
        new_years_eve = date(year=year, month=12, day=31)

        return christmas <= value <= new_years_eve

    def date_is_in_ordinary_time(self, value):
        return (
            self.first_ordinary_time_start <= value < self.ash_wednesday
            or self.pentecost < value < self.first_advent
        )

    def date_is_in_lent(self, value: date):
        return self.ash_wednesday <= value < self.maundy_thursday

    def date_is_in_easter_time(self, value):
        return self.maundy_thursday <= value < self.pentecost

    def get_todays_colour(self):
        if self.today in self.rose_days:
            return "rose"

        if self.today in self.red_days:
            return "red"

        if (
            self.today in self.white_days
            or self.date_is_in_christmas_time(self.today)
            or self.date_is_in_easter_time(self.today)
        ):
            return "white"

        if self.date_is_in_lent(self.today) or self.date_is_in_advent(self.today):
            return "purple"

        if self.date_is_in_ordinary_time(self.today):
            return "green"

        return "white"
