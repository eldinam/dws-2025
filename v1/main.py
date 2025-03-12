from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def index():
  return {"data": {"name": "Hello", "nesto": "World"}}

@app.get("/about")
def about():
  return {"data": "About FastAPI"}

# Napraviti listu blogova - svaki element bloga ima: name, code i description (listao bjekata)
@app.get("/blog-list")
def get_blog_list():
  blog_list = ["test 1", "test 2", "test 3"]

  return blog_list


@app.get("/blog/{id}")
def blog_item(id: int):

  return id