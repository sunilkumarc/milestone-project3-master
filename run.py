import os
from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo
from flask import request, redirect, url_for
from bson.objectid import ObjectId

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://daradona10:maradona1986@myfirstcluster-agrgt.mongodb.net/Milestone-Project3?retryWrites=true&w=majority"
mongo = PyMongo(app)

@app.route("/")
def get_meals():
    return render_template("meals.html")

@app.route("/get_mains")
def get_mains():
    return render_template("maincourses.html")    

def get_course_types():
    return mongo.db.recipes.find().distinct('course_type')

def get_recipes_by_type(recipe_type):
    recipes_in_db = mongo.db.recipes.find({"course_type": recipe_type})
    recipes = []
    for s in recipes_in_db:
        recipes.append({
            "dish_id": str(s["_id"]),
            "name": s["name"],
            "description": s["description"],
            "prep_time": s["prep_time"],
            "cooking_time": s["cooking_time"],
            "makes": s["makes"],
            "ingredients": s["ingredients"],
            "method": s["method"],
            "course_type": s["course_type"]
        })
    
    return recipes

@app.route("/get_starters")
def get_starters():
    starters = get_recipes_by_type('starters')
    course_types = get_course_types()
    return render_template("starters.html", dishes=starters, course_types=course_types)

@app.route("/get_desserts")
def get_desserts():
    desserts = get_recipes_by_type('desserts')
    course_types = get_course_types()
    return render_template("desserts.html", dishes=desserts, course_types=course_types)  

@app.route("/get_sides")
def get_sides():
    sides = get_recipes_by_type('sides')
    course_types = get_course_types()
    return render_template("sides.html", dishes=sides, course_types=course_types)

@app.route("/add_meal")
def add_meal():
    course_types = get_course_types()
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

@app.route("/delete_recipe", methods=['POST'])
def delete_recipe():
    json_body = request.get_json()
    dish_id = json_body["dish_id"]
    dish_type = json_body["dish_type"]

    print("Deleting dish with id: ", dish_id)
    mongo.db.recipes.delete_one({
        '_id': ObjectId(dish_id)
    })

    dishes = get_recipes_by_type(dish_type)
    course_types = get_course_types()
    return jsonify(dishes = dishes, course_types=course_types)

@app.route("/update_recipe", methods=['PUT'])
def update_recipe():
    json_body = request.get_json()
    dish_id = json_body["dish_id"]
    dish_type = json_body["dish_type"]
    dish = json_body["dish"]

    myquery = { '_id': ObjectId(dish_id) }
    newvalues = { "$set": dish }
    mongo.db.recipes.update_one(myquery, newvalues)

    dishes = get_recipes_by_type(dish_type)
    course_types = get_course_types()
    return jsonify(dishes = dishes, course_types=course_types)

if __name__ == "__main__":
    app.run(host=os.environ.get("IP"), port=8000, debug=True) 
