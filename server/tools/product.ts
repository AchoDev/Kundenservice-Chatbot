
interface BuglandProduct {
    defaultName: string;
    aliases: string[];
}

const products: {[key: string]: BuglandProduct} = {
    windowFly: {
        defaultName: "Window Fly",
        aliases: ["windowfly", "window fly", "window-fly window cleaner"],
    }
}

function findProduct (productName: string): BuglandProduct | null {
    for (const product of Object.values(products)) {
        if (product.aliases.includes(productName.toLowerCase())) {
            return product;
        }
    }
    return null;
}

export type { BuglandProduct };
export { findProduct, products };
