/// <reference types="chrome"/>
// const article = document.querySelector("article");

// // `document.querySelector` may return null if the selector doesn't match anything.
// if (article) {
//     const text = article.textContent;
//     const wordMatchRegExp = /[^\s]+/g; // Regular expression
//     if (text != null) {
//         const words = text.matchAll(wordMatchRegExp);

//         // matchAll returns an iterator, convert to array to get word count
//         const wordCount = [...words].length;
//         const readingTime = Math.round(wordCount / 200);
//         const badge = document.createElement("p");
//         // Use the same styling as the publish information in an article's header
//         badge.classList.add("color-secondary-text", "type--caption");
//         badge.textContent = `⏱️ ${readingTime} min read`;
//         // // Support for API reference docs
//         // const heading = article.querySelector("h1");
//         // // Support for article docs with date
//         // const date = article.querySelector("time")?.parentNode;

//         // const pick_one = (date ?? heading);
        
//         // if (pick_one != null) {
//         //     pick_one.insertAdjacentElement("afterend", badge);
//         // }
//         document.body.appendChild(badge);
//     }
// }

const main_div = document.getElementById('docs-title-widget');

// async function getTab() {
//     let tabs = await chrome.tabs.query({active: true, currentWindow: true});
//     return tabs;
// };

// chrome.tabs.onUpdated.addListener(async function () {
//     let url = await getTab();
//     console.log(url);
// });
// async function getCurrentTab() {
//     let queryOptions = { active: true};
//     // `tab` will either be a `tabs.Tab` instance or `undefined`.
//     let tab = await chrome.tabs.query(queryOptions);

//     console.log(tab);
//     return tab;
// }

// async function getCurrentTab() {
//     chrome.tabs.getCurrent(function (tab) {
//         if (tab != null) {
//             console.log(tab.url);
//         }
//     })
// }

if (main_div) {
    const badge = document.createElement("p");

      
    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = "I replaced your title haha";
    // getCurrentTab();
    console.log(location.href);
    main_div.appendChild(badge);
}