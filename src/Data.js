const D = x => new Decimal(x)
//create all the variables in a data object for saving
function getDefaultObject() {
    return {
        //oddities
        oddities: D(2),
        oddityGain: D(0),
        //derivatives
        derivs: [{b:D(0),amt:D(0),c:D(2),u:true}, {b:D(0),amt:D(0),c:D(2),u:false}, {b:D(0),amt:D(0),c:D(2),u:false}, {b:D(0),amt:D(0),c:D(2),u:false}],
        exponentsDeriv: [{b:D(0),amt:D(0),c:D(1e4),u:true}, {b:D(0),amt:D(0),c:D(2),u:false}, {b:D(0),amt:D(0),c:D(2),u:false}],
        //upgrades
        upgrades: [{amt:D(0),c:D(2e18)},{amt:D(0),c:D(5e19)},{amt:D(0),c:D(5e20)},{amt:D(0),c:D(6e21)},{amt:D(0),c:D(22)}],
        //theories
        hasTheory: [false, false, false, false, false, false, false, false],
        //misc
        autoToggled: false,
        hasLegend: [false],
        hasTab: [false, false],
        time: Date.now(),
        currentTab: 1,
        currentUpdate: 'getReset',
    }
}
let data = getDefaultObject()
//saving and loading
function save(){
    window.localStorage.setItem('ucRemakeSave', JSON.stringify(data))
}
function load() {
    let savedata = JSON.parse(window.localStorage.getItem('ucRemakeSave'))
    if (savedata !== undefined) fixSave(data, savedata)
}
//fix saves
function fixSave(main=getDefaultObject(), data) {
    if (typeof data === "object") {
        Object.keys(data).forEach(i => {
            if (main[i] instanceof Decimal) {
                main[i] = D(data[i]!==null?data[i]:main[i])
            } else if (typeof main[i]  == "object") {
                fixSave(main[i], data[i])
            } else {
                main[i] = data[i]
            }
        })
        return main
    }
    else return getDefaultObject()
}
function fixOldSaves(){
    //fix important things from old versions
}
function exportSave(){
    save()
    let exportedData = btoa(JSON.stringify(data));
    const exportedDataText = document.createElement("textarea");
    exportedDataText.value = exportedData;
    document.body.appendChild(exportedDataText);
    exportedDataText.select();
    exportedDataText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(exportedDataText);
}
function importSave(){
    let importedData = prompt("Paste your save data here!")
    data = Object.assign(getDefaultObject(), JSON.parse(atob(importedData)))
    save()
    location.reload()
}
window.setInterval(function(){
    save()
}, 10000);
window.onload = function (){
    load()
    fixOldSaves()
}
//full reset
function fullReset(){
    exportSave()
    window.localStorage.removeItem('ucRemakeSave')
    location.reload()
}
function deleteSave(){
    window.localStorage.removeItem('ucRemakeSave')
    location.reload()
}

