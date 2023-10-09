#!/usr/bin/env python3
import sys
import os
import shutil
from datetime import date
from bs4 import BeautifulSoup

if len(sys.argv) > 1:
    current_date = sys.argv[1]
else:
    current_date = date.today().strftime("%Y-%m-%d")

new_dir = os.path.join(".", current_date)

if not os.path.exists(new_dir):
    os.makedirs(new_dir)
    shutil.copy(os.path.join(".", "template", "index.html"), new_dir)

dirs = [dir for dir in os.listdir(".") if os.path.isdir(dir) and dir != "template"]
dirs = [dir for dir in dirs if os.path.isfile(os.path.join(".", dir, "index.html"))]
dirs.sort(reverse=True)

posts = []
for dir in dirs:
    with open(os.path.join(".", dir, "index.html"), "r", encoding="utf-8") as file:
        soup = BeautifulSoup(file, "html.parser")
        h1 = soup.find("h1")
        if h1:
            posts.append({"dir": dir, "title": h1.get_text(strip=True)})

with open(os.path.join(".", "index.html"), "r+", encoding="utf-8") as file:
    soup = BeautifulSoup(file, "html.parser")
    ul = soup.find("ul")
    while ul.li:
        ul.li.decompose()
    for post in posts:
        new_entry = soup.new_tag("li")
        new_entry.string = f"{post['dir']}: "
        new_link = soup.new_tag("a", href=f"./{post['dir']}/")
        new_link.string = post["title"]
        new_entry.append(new_link)
        ul.append(new_entry)
    file.seek(0)
    file.truncate()
    file.write(str(soup.prettify()))
