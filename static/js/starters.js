$(document).ready(function() {
    loadDishes();

    $(".delete-dish").click(function(ev) {
        deleteDishModal(ev);
    });

    $(".edit-dish").click(function(ev) {
        editDishModal(ev);
    });
    
    $("#modal-delete-button").click(function (ev) {
        deleteDishButtonClick(ev);
    });
});

var loadDishes = function() {
    html_content = get_html_content_for_dishes(dishes);
    $("#starters-items-list").html(html_content);
}