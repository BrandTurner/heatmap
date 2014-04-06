(function($) {
    function GraphicalPercentCompleteCellFormatter(row, cell, value, columnDef, dataContext) {
        return (value >>> 0) + "%";
    };

    function BoolCellFormatter(row, cell, value, columnDef, dataContext) {
        return value ? "X" : "";
    };

    $.mockJSON.random = false;

    (function(){
        function buildMock(name) {
            $.mockjax({
                url: '/Contact/List/' + name,
                responseTime: 750,
                responseText: $.mockJSON.generateFromTemplate({
                    "contacts|10-10": [{
                        "married|0-1": true,
                        "email" : "@EMAIL",
                        "firstName": "@MALE_FIRST_NAME",
                        "lastName": "@LAST_NAME",
                        "birthday": "@DATE_MM/@DATE_DD/@DATE_YYYY",
                        "percentHealth|0-100": 0 
                    }]
                })
            });
        }

        buildMock('Alpha');
        buildMock('Bravo');
        buildMock('Charlie');

    }());

    var grid,
        columns = [
            {id:"firstName", name:"First Name", field:"firstName"},
            {id:"lastName", name:"Last Name", field:"lastName"},
            {id:"email", name:"Email", field:"email"},
            {id:"percentHealth", name:"% Health", field:"percentHealth", formatter:GraphicalPercentCompleteCellFormatter},
            {id:"birthday", name:"Birthday", field:"birthday"},
            {id:"married", name:"Married", field:"married", formatter:BoolCellFormatter}
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

    function loadList(name) {        
        $.ajax({
            url: "/Contact/List/"+name,
            type: "GET",
            dataType: "json",
            success: function(data, textStatus, xhr) {
                grid = new Slick.Grid("#myGrid",  data.contacts, columns, options);
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log("Error: " + textStatus);
            }
        });
    }

    loadList('Alpha');

    $('.btn-data-choice').on('click',function(){
        var name = $(this).data('choice') || 'Alpha';
        loadList(name);
    });


}(jQuery));
