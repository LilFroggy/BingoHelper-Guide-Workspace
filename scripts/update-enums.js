import { getDataFromURL, to_snake_case, updateSchemaDefinitionEnum, toRoman, toTitleCase } from "./util.js";

const ITEMS_URL = "https://api.hypixel.net/v2/resources/skyblock/items";
const SKILLS_URL = "https://api.hypixel.net/v2/resources/skyblock/skills";
const COLLECTIONS_URL = "https://api.hypixel.net/v2/resources/skyblock/collections";
const BAZAAR_URL = "https://api.hypixel.net/v2/skyblock/bazaar";

const updateFuncs = [
    async () => {
        // ItemIds
        const data = await getDataFromURL(ITEMS_URL);
        const itemIds = data.items.map(item => item.id);
        updateSchemaDefinitionEnum("ItemIds", itemIds);
        // MinionIds
        const minionIds = [
            ...new Set(
                data.items
                    .map(item => item.generator)
                    .filter(Boolean)
            )
        ];
        updateSchemaDefinitionEnum("MinionIds", minionIds);
    },
    // Skills
    async () => {
        const data = await getDataFromURL(SKILLS_URL);
        const skills = Object.keys(data.skills).map(skill => to_snake_case(skill));
        updateSchemaDefinitionEnum("Skills", skills);
    },
    // Collections
    async () => {
        const data = await getDataFromURL(COLLECTIONS_URL);
        let collections = [];
        Object.values(data.collections).forEach(category => 
            Object.values(category.items).forEach(collection =>
                collections.push(to_snake_case(collection.name))));
        updateSchemaDefinitionEnum("Collections", collections);
    },
    // Enchants
    /*async () => {
        const data = await getDataFromURL(BAZAAR_URL);
        const enchants = Object.keys(data.products)
            .filter(id =>
                id.startsWith("ENCHANTMENT_") &&
                !id.startsWith("ENCHANTMENT_ULTIMATE_")
            )
            .map(id => {
                // Remove ENCHANTMENT_
                const raw = id.replace("ENCHANTMENT_", "");

                // Split name and level
                const match = raw.match(/^(.*)_(\d+)$/);
                if (!match) return null;

                const namePart = match[1];      // TURBO_ROSE
                const level = Number(match[2]); // 1

                return `${toTitleCase(namePart)} ${toRoman(level)}`;
            })
            .filter(Boolean);
        updateSchemaDefinitionEnum("Enchants", enchants);
    }*/
];

updateFuncs.forEach(func => func());