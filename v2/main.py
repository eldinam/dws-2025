from fastapi import FastAPI
from blog import get_blog_list

app = FastAPI()


@app.get("/")
def index():
  return {"data": {"name": "Hello", "nesto": "World"}}

@app.get("/about")
def about():
  return {"data": "About FastAPI"}

# Napraviti listu blogova - svaki element bloga ima: name, code i description (lista objekata)
@app.get("/blog-list")
def get_blog_list_():
  blog_list = get_blog_list()

  return blog_list


@app.get("/blog/{id}")
def blog_item(id: int):
  blog_list = get_blog_list()

  if blog_list and len(blog_list) >= 4 and 0 < id < 5:
    blog_item = blog_list[id-1]
    return blog_item
  else:
    return {"status": f"No blog with id {id}"}
  

@app.get("/blog/{id}/description")
def blog_item_description_(id: int):
  blog_list = get_blog_list()

  if blog_list and len(blog_list) >= 4 and 0 < id < 5:
    blog_item = blog_list[id-1]
    return blog_item["description"]
  else:
    return {"status": f"No blog with id {id}"}