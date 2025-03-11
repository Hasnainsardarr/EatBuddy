const Carts = require('../models/Carts'); // Ensure the correct import

// Get carts using email
const getCartByEmail = async (req, res) => {
    try {
        const email = req.query.email; // Corrected request object
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const result = await Carts.find({ email }).exec(); // Fixed query and execution
        res.status(200).json(result); // Send response back to the client
    } catch (error) {
        console.error("Error fetching carts:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Post a cart when add-to-cart button is clicked
const addToCart = async (req, res) => {
    try {
        const { menuItemId, name, recipe, image, price, quantity, email } = req.body;

        if (!email || !menuItemId) {
            return res.status(400).json({ message: "Email and menuItemId are required" });
        }

        // Check if the item already exists in the cart
        const existingCartItem = await Carts.findOne({ email, menuItemId });

        if (existingCartItem) {
            return res.status(400).json({ message: "Product already exists in the cart!" });
        }

        // Create a new cart item
        const cartItem = new Carts({
            menuItemId,
            name,
            recipe,
            image,
            price,
            quantity,
            email
        });

        await cartItem.save(); // Save to database
        res.status(201).json(cartItem); // Respond with created cart item
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
// delete cart item
const deleteCart =  async (req, res) => {
    const cartId = req.params.id;
    try {
        const deletedCart = await Carts.findByIdAndDelete(cartId);
        if(!deletedCart){
            return res.status(401).json({message: "Cart Items not found!"})
        }
        res.status(200).json({message: "Cart Item Deleted Successfully!"})
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


// update cart
const updateCart = async (req, res) => {
    const cartId = req.params.id;
    const {menuItemId, name, recipe, image, price, quantity,email } = req.body;

    try {
        const updatedCart = await Carts.findByIdAndUpdate(
            cartId, {menuItemId, name, recipe, image, price, quantity,email }, {
                new: true, runValidators: true
            }
        )
        if(!updatedCart){
            return res.status(404).json({ message: "Cart Item not found"})
        }
        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// get single recipe
const getSingleCart = async (req, res) => {
    const cartId = req.params.id;
    try {
        const cartItem = await Carts.findById(cartId)
        res.status(200).json(cartItem)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getCartByEmail,
    addToCart,
    deleteCart,
    updateCart,
    getSingleCart
};
