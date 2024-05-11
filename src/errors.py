from datetime import date


class WeekdayError(Exception):
    pass


def enforce_monday(value: date) -> None:
    if value.weekday() != 0:
        raise WeekdayError(f"{value} is not a Monday.")


def enforce_wednesday(value: date) -> None:
    if value.weekday() != 2:
        raise WeekdayError(f"{value} is not a Wednesday.")


def enforce_thursday(value: date) -> None:
    if value.weekday() != 3:
        raise WeekdayError(f"{value} is not a Thursday.")


def enforce_friday(value: date) -> None:
    if value.weekday() != 4:
        raise WeekdayError(f"{value} is not a Friday.")


def enforce_sunday(value: date) -> None:
    if value.weekday() != 6:
        raise WeekdayError(f"{value} is not a Sunday.")
