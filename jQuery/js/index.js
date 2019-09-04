let endpointGet = 'http://localhost:8000/get.php';
let endpointPut = 'http://localhost:8000/put.php';
let data = [];

let fetchData = () => {
    fetch(endpointGet)
        .then(resp => resp.json())
        .then(res => {
            data = res;
            buildList(data);
        });
};

let storeData = () => {
    fetch(endpointPut, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
        'Content-Type': 'application/json'
        }),
    })
    .then(response => response.json())
    .then(res => {
            data = res;
            buildList(data);
    });                
}

let buildList = (newData) => {

    $("#pendingItems").html('');
    $("#doneItems").html('');

    let pendingItemsHtml = '';
    let doneItemsHtml = '';

    let itemIdx = 0;
    let pendingCount = 0;
    let doneCount = 0;

    newData.forEach(item => {
        if (!item.done) {
            pendingItemsHtml += `<li class="list-group-item">${item.text} <a data-complete-id="${itemIdx}" href="#">(Complete)</a></li>`;
            pendingCount++;
        } else {
            doneItemsHtml += `<li class="list-group-item">${item.text} <a data-complete-id="${itemIdx}" href="#">(Re-open)</a></li>`;
            doneCount++;
        }

        itemIdx++;
    }); 

    $("#pendingItems").html(pendingItemsHtml);
    $("#doneItems").html(doneItemsHtml);
    $("#pendingBadge").text(pendingCount);
    $("#doneBadge").text(doneCount);

};

$(document).ready(() => {

    $("#pendingItems, #doneItems").on('click', 'a[data-complete-id]', (e) => {

        let elem = $(e.target);
        let id = elem.attr('data-complete-id');
        let pendingItem = data[id];

        pendingItem.done = !pendingItem.done;

        storeData();

    });

    $("#newForm").on("submit", () => {

        let newItemValue = $("#newItem").val();
        data.push({"text": newItemValue, "done": false});
        storeData();
        $("#newItem").val('');
        return false;
    });

    fetchData();
});