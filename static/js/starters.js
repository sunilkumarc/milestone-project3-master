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