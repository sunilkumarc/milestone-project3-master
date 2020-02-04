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