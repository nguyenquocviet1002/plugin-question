function getParam(p) {
    var match = RegExp("[?&]" + p + "=([^&]*)").exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

function addToStorage(key, value) {
    var expiryPeriod = 7776e6,
        expiryDate,
        record = {
            value: value,
            expiryDate: new Date().getTime() + 7776e6,
        };
    localStorage.setItem(key, JSON.stringify(record));
}

function storeGclid() {
    var gclidParam = getParam("gclid");
    gclidParam && addToStorage("gclid", gclidParam);
}

export function addGclid() {
    storeGclid();
    var currDate = new Date().getTime(),
        gclsrcParam = getParam("gclsrc"),
        isGclsrcValid = !gclsrcParam || -1 !== gclsrcParam.indexOf("aw"),
        gclid = JSON.parse(localStorage.getItem("gclid")),
        isGclidValid = gclid && currDate < gclid.expiryDate;
    if (isGclidValid && isGclsrcValid) return gclid.value;
    return;
}