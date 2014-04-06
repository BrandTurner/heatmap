(function($) {
    function GraphicalPercentCompleteCellFormatter(row, cell, value, columnDef, dataContext) {
        return (value >>> 0) + "%";
    };

    function BoolCellFormatter(row, cell, value, columnDef, dataContext) {
        return value ? "X" : "";
    };

    $.mockJSON.random = false;
    $.mockJSON.data['STATE_NAME'] = [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
    ];

    (function(){
        function buildMock(name) {
            $.mockjax({
                url: '/Contact/List/' + name,
                responseTime: 100,
                responseText: $.mockJSON.generateFromTemplate({
                    "contacts|10-10": [{
                        "active|0-1": true,
                        "stateName": "@STATE_NAME",
                        "addedDate": "@DATE_MM/@DATE_DD/@DATE_YYYY",
                        "percentVoted|0-100": 0 
                    }]
                })
            });
        }

        $('.btn-data-choice').each(function(){
            var name = $(this).data('choice') || 'global';
            buildMock(name);
        });

    }());

    var grid,
        columns = [
            {id:"stateName", name:"First Name", field:"stateName"},
            {id:"percentVoted", name:"% Voted", field:"percentVoted", formatter:GraphicalPercentCompleteCellFormatter},
            {id:"addedDate", name:"Date", field:"addedDate"},
            {id:"active", name:"Active", field:"active", formatter:BoolCellFormatter}
        ],
        options = {
            editable: true,
            enableAddRow: false,
            enableCellNavigation: true,
            multiColumnSort: true,
            enableCellReorder: true,
            rowCssClasses: function(item) {
                return (item.percentVoted >= 80) ?  "healthy" : "";
            }
        };

    function fillColorForContact(contact) {
        var goal = {
            red: 10,
            green: 15,
            blue: 200
        };

        function channel (top,bottom,percent) {
            return (((top - bottom) * percent) + bottom) >>> 0;
        }

        var percent = contact.percentVoted / 100.0;
        var red = channel(goal.red, 255, percent);
        var green = channel(goal.green, 255, percent);
        var blue = channel(goal.blue, 255, percent);

        var channelRed = ("00" + red.toString(16)).slice(-2);
        var channelGreen = ("00" + green.toString(16)).slice(-2);
        var channelBlue = ("00" + blue.toString(16)).slice(-2);

        var fill = "#"+channelRed+channelGreen+channelBlue;

        console.log('color: (%o, %o, %o) - %o',red,green,blue,fill);

        return fill;
    }

    function renderContacts(contacts, listName) {
        grid = new Slick.Grid("#myGrid",  contacts, columns, options);
        var svg = $('#data-map').svg('get'),
            g, i, contact, fill;

        for(i = 0; i < 10; i++) {
            g = svg.getElementById('Layer_' + (i+1));
            contact = contacts[i];
            fill = fillColorForContact(contact) ;
            $(g).children().attr('fill',fill);
        }
    }

    function loadList(name) {        
        $.ajax({
            url: "/Contact/List/"+name,
            type: "GET",
            dataType: "json",
            success: function(data, textStatus, xhr) {
                renderContacts(data.contacts, name);
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log("Error: " + textStatus);
            }
        });
    }

    (function(){
        var svg = $('#data-map')
            .svg()
            .svg('get');
        
        svg.load('map.svg',{
            addTo: true,
            changeSize: false,
            onLoad: function(svg, error) {
            }
        })
    }())


    loadList('global');

    $('.btn-data-choice').on('click',function(){
        var name = $(this).data('choice') || 'global';
        loadList(name);
    });


}(jQuery));
