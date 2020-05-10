
// Data Source
const url = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72';
let cardValues = [];
// Constants
const c_DivGroupTag = 'divGroup_';

// Constructor
main();
async function main() {
    // Read DataSource
    let response = await fetch(url);
    if (response.ok) {
        cardValues = await response.json();
        console.log(cardValues);
        // Populate cards
        cardValues.forEach((card) => {
            // Verify if group exists or create it
            let card_group = document.getElementById(c_DivGroupTag + card.property_type);
            if (card_group == null) {
                // Group Text
                card_groupDiv = document.createElement('div');
                card_groupDiv.setAttribute('class', 'cls_CardGroupTitle');
                let groupTitle = document.createElement('h2');
                groupTitle.innerHTML = card.property_type;

                card_group = document.createElement('div');
                card_group.setAttribute('class', 'cls_CardGroup');
                card_group.setAttribute('id', c_DivGroupTag + card.property_type);

                card_groupDiv.appendChild(groupTitle);
                card_group.appendChild(card_groupDiv);
                div_Cards.appendChild(card_group);
            }
            // Add new card to group
            card_group.appendChild(fnc_newCard(card));

        });
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

// Mount new card with events
function fnc_newCard(p_Values) {
    // Main Image
    let cardImage = document.createElement('img');
    cardImage.setAttribute('class', 'cls_CardImage');
    cardImage.setAttribute('src', p_Values.photo);
    // cardImage.style.width = "20rem";
    // cardImage.style.margin = "2rem";

    // Texts
    let cardTitle = document.createElement('h3');
    cardTitle.setAttribute('class', 'cls_CardTitle');
    cardTitle.innerHTML = p_Values.name;
    let cardPrice = document.createElement('h4');
    cardPrice.setAttribute('class', 'cls_CardPrice');
    cardPrice.innerHTML = "R$ ";
    cardPrice.innerHTML += p_Values.price;

    // Frame for support card informations
    let cardFrame = document.createElement('div');
    cardFrame.setAttribute('class', 'cls_CardFrame');
    cardFrame.style.width = "20rem";
    cardFrame.style.margin = "2rem";
    cardFrame.appendChild(cardImage);
    cardFrame.appendChild(cardTitle);
    cardFrame.appendChild(cardPrice);

    // Events for each card
    cardFrame.onmouseover = function () {
        // On Evidence Red
        cardFrame.style.boxShadow = "8px 8px 20px #ff5a60";
    }
    cardFrame.onmouseout = function () {
        // Default gray
        cardFrame.style.boxShadow = "5px 5px 15px rgb(150, 150, 150)";
    }
    return cardFrame;
}


