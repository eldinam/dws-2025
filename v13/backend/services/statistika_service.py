from collections import defaultdict
from datetime import datetime

from models.korisnik_model import Korisnik
from models.uplata_model import Uplata
from models.usluga_model import Usluga
from sqlmodel import Session, func, select


def get_statistika(session: Session) -> dict:
    # 1. Bar chart: ukupni iznos po usluzi
    bar_data = session.exec(
        select(Uplata.usluga_id, func.sum(Uplata.ukupno))
        .group_by(Uplata.usluga_id)
    ).all()

    bar_result = []
    for usluga_id, total in bar_data:
        usluga = session.get(Usluga, usluga_id)
        bar_result.append({
            "usluga": usluga.naziv if usluga else f"Usluga {usluga_id}",
            "ukupno": round(total, 2)
        })

    # 2. Pie chart: udio po korisniku
    pie_data = session.exec(
        select(Uplata.korisnik_id, func.sum(Uplata.ukupno))
        .group_by(Uplata.korisnik_id)
    ).all()

    total_all = sum(iznos for _, iznos in pie_data)
    pie_result = []
    for korisnik_id, ukupno in pie_data:
        korisnik = session.get(Korisnik, korisnik_id)
        ime = f"{korisnik.ime} {korisnik.prezime}" if korisnik else f"Korisnik {korisnik_id}"
        procent = round((ukupno / total_all) * 100, 2) if total_all else 0
        pie_result.append({
            "korisnik": ime,
            "procent": procent
        })

    # 3. Line chart: ukupno po sedmici
    line_data = session.exec(select(Uplata.datum_uplate, Uplata.ukupno)).all()
    sedmicni_iznosi = defaultdict(float)

    for datum, iznos in line_data:
        sedmica = datum.isocalendar()[:2]  # (godina, sedmica)
        sedmicni_iznosi[sedmica] += iznos

    line_result = [
        {"period": f"{year}-W{week:02}", "ukupno": round(total, 2)}
        for (year, week), total in sorted(sedmicni_iznosi.items())
    ]

    return {
        "bar": bar_result,
        "pie": pie_result,
        "line": line_result
    }
