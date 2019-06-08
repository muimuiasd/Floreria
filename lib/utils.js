ValidateEmail = function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

var validatorTimer;
DesvanecerErrores = function () {
    clearTimeout(validatorTimer);
    validatorTimer = setTimeout(function () {
        $(".list-errors").fadeOut(1000, function () {
            Session.set("MensajesError", false);
        });
    }, 4000);
};

Handlebars.registerHelper("flowerImg", function (id) {
    return FlowerImage(id);
});

FlowerImage = function (id) {
    if (!id) id = -1;
    let reg = Flowers.findOne({
        _id: id
    });
    if (!reg) return "/img/img.png";
    let image = Images.findOne({
        "userId": id,
        "meta.flowerId": {$exists: false}
    });
    return image ? image.link() : "/img/flower.png";
}