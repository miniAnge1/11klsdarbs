import json

# load data
def load_data():
    try:
        with open("vielas.json", "r", encoding="utf-8") as f:
            vielas = json.load(f)

        with open("inventars.json", "r", encoding="utf-8") as f:
            inventars = json.load(f)

        for v in vielas:
            v["kategorija"] = "viela"

        for i in inventars:
            i["kategorija"] = "Aprīkojums"

        return vielas + inventars

    except Exception as e:
        print("Kļūda ielādējot:", e)
        return []


# show table
def show_data(data):
    print("\n--- DATI ---")
    for item in data:
        print(f"""
ID: {item.get("id", "")}
Nosaukums: {item.get("nosaukums", "")}
Tips: {item.get("tips", "")}
Apakstips: {item.get("apakstips", "")}
Skaits: {item.get("skaits", "")}
------------------------
""")


# filter
def filter_data(data, kategorija):
    if kategorija == "visi":
        return data
    return [x for x in data if x.get("kategorija") == kategorija]


# search
def search_data(data, query):
    query = query.lower()
    return [
        x for x in data
        if query in str(x.get("id", "")).lower()
        or query in str(x.get("nosaukums", "")).lower()
        or query in str(x.get("tips", "")).lower()
        or query in str(x.get("apakstips", "")).lower()
    ]


def main():
    data = load_data()

    while True:
        print("""
1 - Parādīt visus
2 - Tikai vielas
3 - Tikai aprīkojumu
4 - Meklēt
0 - Iziet
""")

        choice = input("Izvēle: ")

        if choice == "1":
            show_data(data)

        elif choice == "2":
            show_data(filter_data(data, "viela"))

        elif choice == "3":
            show_data(filter_data(data, "Aprīkojums"))

        elif choice == "4":
            q = input("Meklēt: ")
            show_data(search_data(data, q))

        elif choice == "0":
            break

        else:
            print("Nepareiza izvēle!")


if __name__ == "__main__":
    main()
