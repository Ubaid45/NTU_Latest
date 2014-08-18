

function resetCssOfFields(requiredElements) {
    for (var a = 0; a < requiredElements.length; a++) {
        $("#" + requiredElements[a]).parents().removeClass("success");
        $("#" + requiredElements[a]).parents().removeClass("error");
        $(".field-validation-error").children(0).remove();
        $("#" + requiredElements[a]).val("");
    }
}

