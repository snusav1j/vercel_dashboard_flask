// скрипты для страницы case (/case.html) */

function passData() {
    case_value_input = $('#case-value-input')
    case_value_data = case_value_input.val()
    if (case_value_data != ''){
        
        $.ajax({
            type: "POST",
            url: "/get_data",
            data: {"case_value": case_value_data}
        });
        case_value_input.val('');
    }
}
   
