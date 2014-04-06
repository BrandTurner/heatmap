(function($) {

var grid,
    columns = [
        {id:"firstName", name:"First Name", field:"firstName", width:70},
        {id:"lastName", name:"Last Name", field:"lastName", width:70},
        {id:"email", name:"Email", field:"email", width:170},
        {id:"percentHealth", name:"% Health", field:"percentHealth", width:90, formatter:GraphicalPercentCompleteCellFormatter},
        {id:"birthday", name:"Birthday", field:"birthday", width:70},
        {id:"married", name:"Married", field:"married", width:50, formatter:BoolCellFormatter}
    ],
    options = {
        editable: true,
        enableAddRow: false,
        enableCellNavigation: true,
        enableCellReorder: true,
        rowCssClasses: function(item) {
            return (item.percentHealth >= 80) ?  "healthy" : "";
        }
    };

$.ajax({
    url: "/Contact/List",
    type: "GET",
    dataType: "json",
    success: function(data, textStatus, xhr) {
        grid = new Slick.Grid("#myGrid",  data.contacts, columns, options);
    },
    error: function(xhr, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }
});


function GraphicalPercentCompleteCellFormatter(row, cell, value, columnDef, dataContext) {
    return (value >>> 0) + "%";
};

function BoolCellFormatter(row, cell, value, columnDef, dataContext) {
    return value ? "X" : "";
};

}(jQuery));
