# Shoply - Backend:

REST API for shoply application.

### USERS:

    GET /api/users/me (verified users only)

    GET /api/users/all (admins only)

    POST /api/users/register
        name : string
    	email : string
    	password : string
    	isAdmin : boolean (not required)

    POST /api/users/login
        email : string
    	password : string

### Products:

    GET /api/products

    GET /api/products/:id (id must be a valid object id)

    POST /api/products (admins only)
        image : string
    	title : string
    	description : string
    	price : number
        availableSizes: [string]

    PUT /api/products/:id (id must be a valid object id + admins only)
        image : string
    	title : string
    	description : string
    	price : number
        availableSizes: [string]

    DELETE /api/products/:id (id must be a valid object id + admins only)

### Orders:

    GET /api/orders (admins only)

    GET /api/orders/me (verified users only)

    POST /api/orders
        email : string
    	name : string
    	address : string
    	total : number
        cart: [
            {
                title: String
                price: type: Number
                count: type: Number
            }
        ]

    DELETE /api/orders/:id (id must be a valid object id + admins only)
