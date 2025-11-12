$(function(){
    var btn = document.querySelector('.btn_contact.flex_ct li a');
    var submit_btn = document.querySelector('.submit-btn');

    btn.addEventListener('click', function(e){
        e.preventDefault();
        var form_error = document.querySelector('.form form .form-error');
        submit_btn.click();
//        if (confirmMultipleCheckbox(form_error) && confirmCheckbox(form_error)) {
//            
//        }
    });

//
//    function confirmCheckbox(form_error) {
//        var checkbox = document.querySelector('.form form .agree input[type="checkbox"]');
//
//        if (checkbox.checked) {
//            form_error.textContent = "";
//        }else {
//            form_error.textContent = "個人情報の取り扱いに同意してください";
//        }
//
//        return checkbox.checked;
//    }
//
//
//    function confirmMultipleCheckbox(form_error) {
//        var checkboxes = document.querySelectorAll('.form form .RePeople');
//
//        for (var i = 0; i < checkboxes.length; i ++) {
//            if (countChecked() > 0) {
//                form_error.textContent = "";
//                return true;
//            }else {
//                form_error.textContent = "参加人数を選択してください"
//                return false;
//            }
//        }
//    }
//
//    function countChecked() {
//        var checkboxes = document.querySelectorAll('.form form .RePeople');
//        var c = 0;
//
//        for (var j = 0; j < checkboxes.length; j++) {
//            if (checkboxes[j].checked) {
//                c += 1;
//            }
//        }
//        return c
//    }
    
    
//    function confirmScheduleCheckbox(form_error) {
//        var checkboxes = document.querySelectorAll(' form .ContactSchedule');
//
//        for (var i = 0; i < checkboxes.length; i ++) {
//            if (ScheduleChecked() > 0) {
//                form_error.textContent = "";
//                return true;
//            }else {
//                form_error.textContent = "日程を選択してください"
//                return false;
//            }
//        }
//    }
//
//    function ScheduleChecked() {
//        var checkboxes = document.querySelectorAll(' form .ContactSchedule');
//        var c = 0;
//
//        for (var j = 0; j < checkboxes.length; j++) {
//            if (checkboxes[j].checked) {
//                c += 1;
//            }
//        }
//        return c
//    }
    
});
