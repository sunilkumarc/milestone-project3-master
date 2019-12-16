import os
from flask import Flask, render_template
from flask_pymongo import PyMongo
from flask import request, redirect, url_for

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://daradona10:maradona1986@myfirstcluster-agrgt.mongodb.net/Milestone-Project3?retryWrites=true&w=majority"
mongo = PyMongo(app)

@app.route("/")
def get_meals():
    return render_template("meals.html")

@app.route("/get_mains")
def get_mains():
    return render_template("maincourses.html")    

@app.route("/get_starters")
def get_starters():
    starters_dishes = mongo.db.recipes.find({"course_type": "starters"})
    starters = []
    for s in starters_dishes:
        starters.append({
            "name": s["name"],
            "description": s["description"],
            "prep_time": s["prep_time"],
            "cooking_time": s["cooking_time"],
            "makes": s["makes"],
            "ingredients": s["ingredients"],
            "method": s["method"],
            "course_type": s["course_type"]
        })
    return render_template("starters.html", starters=starters)

@app.route("/get_desserts")
def get_desserts():
    desserts_dishes = mongo.db.recipes.find({"course_type": "desserts"})
    desserts = []
    for s in desserts_dishes:
        desserts.append({
            "name": s["name"],
            "description": s["description"],
            "prep_time": s["prep_time"],
            "cooking_time": s["cooking_time"],
            "makes": s["makes"],
            "ingredients": s["ingredients"],
            "method": s["method"],
            "course_type": s["course_type"]
        })
        
    return render_template("desserts.html", desserts=desserts)  

@app.route("/get_sides")
def get_sides():
    sides_dishes = mongo.db.recipes.find({"course_type": "sides"})
    sides = []
    for s in sides_dishes:
        sides.append({
            "name": s["name"],
            "description": s["description"],
            "prep_time": s["prep_time"],
            "cooking_time": s["cooking_time"],
            "makes": s["makes"],
            "ingredients": s["ingredients"],
            "method": s["method"],
            "course_type": s["course_type"]
        })
        
    return render_template("sides.html", sides=sides)  

@app.route("/add_meal")
def add_meal():
    course_types = mongo.db.recipes.find().distinct('course_type')
    return render_template("add_meal.html", course_types=course_types)

@app.route("/add_new_recipe", methods=['GET', 'POST'])
def add_new_recipe():
    name = request.form.get('recipe_name')
    description = request.form.get('description')
    prep_time = request.form.get('prep_time')
    cooking_time = request.form.get('cooking_time')
    makes = request.form.get('makes')
    ingredients = request.form.get('ingredients')
    method = request.form.get('method')
    course_type = request.form.get('course_type')
    
    mongo.db.recipes.insert_one({
        'name': name,
        'description': description,
        'prep_time': prep_time,
        'cooking_time': cooking_time,
        'makes': makes,
        'ingredients': ingredients,
        'method': method,
        'course_type': course_type
    })

    return redirect(url_for('add_meal'))

if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=8000,
            debug=True) 
