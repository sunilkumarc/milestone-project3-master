var get_html_content_for_dishes = function(dishes) {
    html_content = "";
    for(var i = 0; i < dishes.length; ++i) {
        html_content += "<div class=\"card\" style=\"width: 100%; float: left; margin-top: 2rem; margin-left: 2rem; margin-bottom: 2rem;\">";
        html_content += "<div class=\"card-body\">";

        html_content += "<div>";
        html_content += "<h5 class=\"card-title each_name\" style=\"float: left;\">" + dishes[i]["name"] + "</h5>";
        html_content += "<button style=\"float:right; margin-bottom: 10px; margin-left: 10px;\" class=\"btn btn-primary btn-sm delete-dish\" data-dish-type=\"" + dishes[i]["course_type"] + "\" data-dish-id=\"" + dishes[i]["dish_id"] + "\">Delete</button>";
        html_content += "<button style=\"float:right; margin-bottom: 10px;\" class=\"btn btn-primary btn-sm edit-dish\" data-dish-type=\"" + dishes[i]["course_type"] + "\" data-dish-id=\"" + dishes[i]["dish_id"] + "\">Edit</button>";
        html_content += "<p class=\"card-text\"></p>";
        html_content += "</div>";

        html_content += "<table class=\"table table-bordered\">";
        html_content += "<tr>";
        html_content += "<th>Course Type</th>";
        html_content += "<td class='each_course_type'>" + dishes[i]["course_type"] + "</td>";
        html_content += "</tr>";

        html_content += "<tr>";
        html_content += "<th>Prep Time</th>";
        html_content += "<td class='each_prep_time'>" + dishes[i]["prep_time"] + "</td>";
        html_content += "</tr>";

        html_content += "<tr>";
        html_content += "<th>Cooking Time</th>";
        html_content += "<td class='each_cooking_time'>" + dishes[i]["cooking_time"] + "</td>";
        html_content += "</tr>";

        html_content += "<tr>";
        html_content += "<th>Ingredients</th>";
        html_content += "<td class='each_ingredient'>" + dishes[i]["ingredients"] + "</td>";
        html_content += "</tr>";

        html_content += "<tr>";
        html_content += "<th>Makes</th>";
        html_content += "<td class='each_makes'>" + dishes[i]["makes"] + "</td>";
        html_content += "</tr>";

        html_content += "<tr>";
        html_content += "<th>Description</th>";
        html_content += "<td class='each_prep_description'>" + dishes[i]["description"] + "</td>";
        html_content += "</tr>";

        html_content += "<tr>";
        html_content += "<th>Method</th>";
        html_content += "<td class='each_method'>" + dishes[i]["method"] + "</td>";
        html_content += "</tr>";

        html_content += "</table>";
        html_content += "</p>";
        html_content += "</div>";
        html_content += "</div>";
    }
    return html_content
}

var deleteDishModal = function (ev) {
    ev.preventDefault();
    var elem = ev.target;
    var dish_id = $(elem).attr("data-dish-id");
    var dish_type = $(elem).attr("data-dish-type");

    $("#modal-delete-button").attr("dish-id", dish_id);
    $("#modal-delete-button").attr("dish-type", dish_type);
    $("#deleteModal").modal('show');
}

var loadEditForm = function (ev) {
    var clickedCard = $(ev.target).parent().parent();
    var courseId = $(clickedCard).find(".edit-dish").attr("data-dish-id");
    var courseType = $(clickedCard).find(".each_course_type").html();
    var courseName = $(clickedCard).find(".each_name").html();
    var prepTime = $(clickedCard).find(".each_prep_time").html();
    var cookingTime = $(clickedCard).find(".each_cooking_time").html();
    var ingredient = $(clickedCard).find(".each_ingredient").html();
    var prepDescription = $(clickedCard).find(".each_prep_description").html();
    var makes = $(clickedCard).find(".each_makes").html();
    var method = $(clickedCard).find(".each_method").html();

    $("#course_types_edit").val(courseType);
    $("#recipe_name_edit").val(courseName);
    $("#prep_time_edit").val(prepTime);
    $("#cooking_time_edit").val(cookingTime);
    $("#ingredients_edit").val(ingredient);
    $("#description_edit").val(prepDescription);
    $("#makes_edit").val(makes);
    $("#method_edit").val(method);
    $("#dish_id_edit").val(courseId);
}

var editDishModal = function (ev) {
    ev.preventDefault();
    var elem = ev.target;
    var dish_id = $(elem).attr("data-dish-id");
    var dish_type = $(elem).attr("data-dish-type");

    $("#modal-edit-button").attr("dish-id", dish_id);
    $("#modal-edit-button").attr("dish-type", dish_type);

    select_option_content = "";
    for (var i = 0; i < course_types.length; ++i) {
        select_option_content += "<option value=\"" + course_types[i] + "\">" + course_types[i] + "</option>";
    }
    $("#course_types_edit").html(select_option_content);
    loadEditForm(ev);

    $("#editModal").modal('show');
}

var deleteDishButtonClick = function (ev) {
    var elem = ev.target;
    var dish_id = $(elem).attr("dish-id");
    var dish_type = $(elem).attr("dish-type");
    
    deleteDish(dish_id, dish_type);
}

$("#modal-edit-button").click(function (ev) {
    var elem = ev.target;
    var dish_type = $(elem).attr("dish-type");

    var dishId = $("#dish_id_edit").val();
    var dishType = $("#course_types_edit").val();
    var dishName = $("#recipe_name_edit").val();
    var prepTime = $("#prep_time_edit").val();
    var cookingTime = $("#cooking_time_edit").val();
    var ingredient = $("#ingredients_edit").val();
    var prepDescription = $("#description_edit").val();
    var makes = $("#makes_edit").val();
    var method = $("#method_edit").val();

    new_dish = {
        "dish_id": dishId,
        "course_type": dishType,
        "name": dishName,
        "description": prepDescription,
        "prep_time": prepTime,
        "cooking_time": cookingTime,
        "makes": makes,
        "ingredients": ingredient,
        "method": method
    }

    editDish(dishId, new_dish, dish_type);
});

var deleteDish = function(dish_id, dish_type) {
    $.ajax({
        type: "POST",
        url: "delete_recipe",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({"dish_id": dish_id, "dish_type": dish_type}),
        success: function(data, text) {
            location.reload(true);
        },
        error: function(request, status, error){
            console.log("Error");
        }
    });
}

var editDish = function(dish_id, dish, dish_type) {
    $.ajax({
        type: "PUT",
        url: "update_recipe",       
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({"dish_id": dish_id, "dish_type": dish_type, "dish": dish}),
        success: function(data, text) {
            location.reload(true);
        },
        error: function(request, status, error){
            console.log("Error");
        }
    });
}