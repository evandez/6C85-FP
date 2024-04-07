import csv
import re
from collections import defaultdict
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
PERMITS_FILE = ROOT / "data/boston_permits.csv"
SALES_FILE = ROOT / "data/boston_residential_sales.csv"

RE_UNIT_NUMBER = re.compile(r"#(\d+)")


BOSTON_ZIP_NEIGHBORHOOD = {
    "02108": "Beacon Hill",
    "02109": "North End",
    "02110": "Financial District",
    "02111": "Chinatown",
    "02113": "North End",
    "02114": "West End",
    "02115": "Fenway/Kenmore",
    "02116": "Back Bay",
    "02118": "South End",
    "02119": "Roxbury",
    "02120": "Mission Hill",
    "02121": "Dorchester",
    "02122": "Dorchester",
    "02124": "Dorchester",
    "02125": "Dorchester",
    "02126": "Mattapan",
    "02127": "South Boston",
    "02128": "East Boston",
    "02129": "Charlestown",
    "02130": "Jamaica Plain",
    "02131": "Roslindale",
    "02132": "West Roxbury",
    "02134": "Allston",
    "02135": "Brighton",
    "02136": "Hyde Park",
    # "02163": "Harvard University",
    "02210": "Seaport District",
    "02215": "Fenway/Kenmore",
}

PERMIT_TYPE_PATTERNS = {
    permit_type: re.compile(pattern, re.IGNORECASE)
    for permit_type, pattern in {
        "renovation": "(renovation|upgrade)",
        "maintenance": "(maint|repair|fix|service)",
    }.items()
}


def get_sales_address(sales_record: dict) -> str:
    components = (
        sales_record["address"],
        # sales_record["city"],
        # sales_record["zip"],
    )
    address = " ".join(components).strip().upper()
    address = RE_UNIT_NUMBER.sub("", address)
    return address


def get_permit_address(permit_record: dict) -> str:
    components = (
        permit_record["address"],
        # permit_record["city"],
        # permit_record["zip"],
    )
    address = " ".join(components).strip().upper()
    address = RE_UNIT_NUMBER.sub("", address)
    return address


def get_permit_type(permit_record: dict) -> str:
    description = permit_record.get("description")
    if description is None:
        return "unknown"

    for permit_type, pattern in PERMIT_TYPE_PATTERNS.items():
        matches = pattern.findall(description)
        if matches:
            return permit_type

    return "unknown"


def is_now_investor_owned(sales_record: dict) -> bool:
    return sales_record["investor_type_purchase"].lower().strip() != "non-investor"


def load_merged_data() -> pd.DataFrame:
    with open(PERMITS_FILE, "r") as permits_file:
        permits_data = list(csv.DictReader(permits_file))
    with open(SALES_FILE, "r") as sales_file:
        sales_data = list(csv.DictReader(sales_file))

    # Index the sales data by address.
    address_to_sales_records = defaultdict(list)
    for sales_record in sales_data:
        address = get_sales_address(sales_record)
        address_to_sales_records[address].append(sales_record)

    # Augment each permit with whether it was investor owned or not, and other parseable
    # details about the permit.
    investor_owned_count = 0
    non_investor_owned_count = 0
    for permit_record in permits_data:
        permit_address = get_permit_address(permit_record)
        permit_date = permit_record["issued_date"].split()[0]

        sales_records = address_to_sales_records.get(permit_address, [])
        sales_records = sorted(sales_records, key=lambda x: x["date"])
        is_investor_owned = False
        for sales_record in sales_records:
            sales_date = sales_record["date"]
            if sales_date > permit_date:
                break
            is_investor_owned = is_now_investor_owned(sales_record)

        permit_record["investor_owned"] = is_investor_owned
        if is_investor_owned:
            investor_owned_count += 1
        else:
            non_investor_owned_count += 1

        permit_type = get_permit_type(permit_record)
        permit_record["permit_type"] = permit_type

        permit_record["declared_valuation"] = float(
            permit_record["declared_valuation"].replace(",", "").replace("$", "")
        )

    print(f"Found {investor_owned_count} investor-owned permits.")
    print(f"Found {non_investor_owned_count} non-investor-owned permits.")

    df = pd.DataFrame(permits_data)
    df["neighborhood"] = df["zip"].map(BOSTON_ZIP_NEIGHBORHOOD)
    return df


if __name__ == "__main__":
    load_merged_data()  # for testing
