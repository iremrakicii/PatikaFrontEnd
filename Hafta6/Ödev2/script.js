const menu = [
    {
        id: 1,
        title: "Tteokbokki",
        category: "Korean",
        price: 10.99,
        img: "https://media.istockphoto.com/id/1253629795/tr/foto%C4%9Fraf/beton-masa-%C3%BCst%C3%BCnde-gri-kase-yumurta-ile-tteokbokki-tteok-bokki-pirin%C3%A7-kek-ile-kore.jpg?s=612x612&w=0&k=20&c=RvxL1fRABsfOvuVgqtTupwLxtqn12AgkaF3mzmXN3vE=",
        desc: "Spicy rice cakes, serving with fish cake."
    },
    {
        id: 2,
        title: "Chicken Ramen",
        category: "Japanese",
        price: 7.99,
        img: "https://media.istockphoto.com/id/511793034/tr/foto%C4%9Fraf/japanese-ramen-soup-with-chicken-egg-chives-and-sprout.jpg?s=612x612&w=0&k=20&c=yS5_gHrf6s0ktR5_gizUG772MnXx-L_d7GldGVqy8ss=",
        desc: "Chicken noodle soup, serving with vegetables."
    },
    {
        id: 3,
        title: "Bibimbap",
        category: "Korean",
        price: 8.99,
        img: "https://media.istockphoto.com/id/183752521/tr/foto%C4%9Fraf/bi-bim-bap.jpg?s=612x612&w=0&k=20&c=0X5IzKCxbeuvvWwVTgIPI56Dnq78ItDH4_XPt4TYNyw=",
        desc: "Boiling vegetables, serving with special hot sauce."
    },
    {
        id: 4,
        title: "Dan Dan Mian",
        category: "Chinese",
        price: 5.99,
        img: "https://media.istockphoto.com/id/1284089569/tr/foto%C4%9Fraf/tantan-men-japon-tarz%C4%B1-ve-eri%C5%9Fte-ramen.jpg?s=612x612&w=0&k=20&c=qf55dMgOZb0B-_lmSZMnCInqmFQA-rPwOL0KhoTvCu8=",
        desc: "Dan dan noodle, serving with green onion."
    },
    {
        id: 5,
        title: "Yangzhou Fried Rice",
        category: "Chinese",
        price: 12.99,
        img: "https://media.istockphoto.com/id/517503635/tr/foto%C4%9Fraf/yangzhou-fried-rice.jpg?s=612x612&w=0&k=20&c=MvZ-48vYdwOganinMsD63ZFLITagM-FdLlgg6fQzwwM=",
        desc: "Yangzhou style fried rice, serving with bean and pickles."
    },
    {
        id: 6,
        title: "Ma Yi Shang Shu",
        category: "Chinese",
        price: 12.99,
        img: "data:image/jpeg;base64,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",
        desc: "Hot pepper sauce noodle, serving with soy bean and onion."
    },
    {
        id: 7,
        title: "Bulgogi",
        category: "Korean",
        price: 14.99,
        img: "https://media.istockphoto.com/id/1460479014/tr/foto%C4%9Fraf/korean-beef-bulgogi-bbq-with-sesame-seeds-and-spring-onion.jpg?s=612x612&w=0&k=20&c=2j2mMQFej68JnknEkKcRgBu7xTtM9FNhLl0M3vyuWAY=",
        desc: "Marinated beef grilled with garlic and onions."
    },
    {
        id: 8,
        title: "Mandu",
        category: "Korean",
        price: 6.99,
        img: "https://media.istockphoto.com/id/1449519071/tr/foto%C4%9Fraf/homemade-uzbek-dish-boiled-manti-or-manty-chuchvara-dumpling-typical-of-central-asian.jpg?s=612x612&w=0&k=20&c=KfjoTaZBNg76nJl72RW0aO7y2e1PlakyHMAxn0Oedt0=",
        desc: "Korean-style dumplings with various fillings."
    },
    {
        id: 9,
        title: "Kimbap",
        category: "Korean",
        price: 9.99,
        img: "https://media.istockphoto.com/id/1482842407/tr/foto%C4%9Fraf/gimbap.jpg?s=612x612&w=0&k=20&c=nHfaeDNxnyvVjT8D84JFOga-l1HoPcT4xV5dIaagdnw=",
        desc: "Korean sushi rolls filled with vegetables and meat."
    },
    {
        id: 10,
        title: "Bingsu",
        category: "Korean",
        price: 7.99,
        img: "https://media.istockphoto.com/id/918728292/tr/foto%C4%9Fraf/kakigori-starberry-veya-starberry-korece-t%C4%B1ra%C5%9F-buz-patbingsu-veya-bingsu-dondurulmu%C5%9F-tatl%C4%B1.jpg?s=612x612&w=0&k=20&c=OD8LhNCTN8oOmncfZO5_F_sE2CeiYXP733Z3kRlelms=",
        desc: "Korean shaved ice dessert with sweet toppings."
    }
];

const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

const categories = ["All", ...new Set(menu.map(item => item.category))];

const displayButtons = () => {
    btnContainer.innerHTML = categories.map(category => {
        return `<button class="filter-btn" data-category="${category}">${category}</button>`;
    }).join("");
    
    document.querySelectorAll(".filter-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const category = e.target.dataset.category;
            const menuCategory = category === "All" ? menu : menu.filter(item => item.category === category);
            displayMenuItems(menuCategory);
        });
    });
};

const displayMenuItems = (menuItems) => {
    sectionCenter.innerHTML = menuItems.map(item => {
        return `
            <article class="menu-item">
                <img src="${item.img}" alt="${item.title}" class="photo" />
                <div class="item-info">
                    <header>
                        <h4>${item.title}</h4>
                        <h4 class="price">$${item.price}</h4>
                    </header>
                    <p class="item-text">${item.desc}</p>
                </div>
            </article>
        `;
    }).join("");
};

document.addEventListener("DOMContentLoaded", () => {
    displayButtons();
    displayMenuItems(menu);
});