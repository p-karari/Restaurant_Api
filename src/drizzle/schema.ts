import {pgTable, serial, varchar, integer, timestamp, boolean, primaryKey, foreignKey, text } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";


// Define Users table
export const UsersTable = pgTable('users', {
    id: serial("id").primaryKey(),
    name: varchar("name"),
    contactPhone: varchar("contact_phone"),
    phoneVerified: boolean("phone_verified"),
    email: varchar("email"),
    emailVerified: boolean("email_verified"),
    confirmationCode: varchar("confirmation_code"),
    password: varchar("password"),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
    address: integer("address_id"),
    comment: integer("comment_id"),
    driver: integer("driver_id"),
    restaurantOwner: integer("restaurant_owner_id"),
});

// Define State table
export const StateTable = pgTable('state', {
    id: serial("id").primaryKey(),
    name: varchar("name"),
    code: varchar("code"),
    city: varchar("city"),
});

// Define City table
export const CityTable = pgTable('city', {
    id: serial("id").primaryKey(),
    name: varchar("name"),
    stateId: integer("state_id").references(() => StateTable.id),
    address: integer("address"),
    state: varchar("state"),
    restaurant: varchar("restaurant"),
});

// Define Address table
export const AddressTable = pgTable('address', {
    id: serial("id").primaryKey(),
    streetAddress1: varchar("street_address_1"),
    streetAddress2: varchar("street_address_2"),
    zipCode: varchar("zip_code"),
    deliveryInstructions: varchar("delivery_instructions"),
    userId: integer("user_id").references(() => UsersTable.id),
    cityId: integer("city_id").references(() => CityTable.id),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
    city: varchar("city"),
    users: varchar("users"),
    orders: integer("orders"),
});

// Define Restaurant table
export const RestaurantTable = pgTable('restaurant', {
    id: serial("id").primaryKey(),
    name: varchar("name"),
    streetAddress: varchar("street_address"),
    zipCode: varchar("zip_code"),
    cityId: integer("city_id").references(() => CityTable.id),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
    menu_item: varchar("menu_item"),
    orders: integer("orders"),
    city: varchar("city"),
    restaurant_owner: varchar("restaurant_owner"),
});

// Define Category table
export const CategoryTable = pgTable('category', {
    id: serial("id").primaryKey(),
    name: varchar("name"),
    menu_item: varchar("menu_item"),
});

// Define MenuItem table
export const MenuItemTable = pgTable('menu_item', {
    id: serial("id").primaryKey(),
    name: varchar("name"),
    restaurantId: integer("restaurant_id").references(() => RestaurantTable.id),
    categoryId: integer("category_id").references(() => CategoryTable.id),
    description: varchar("description"),
    ingredients: varchar("ingredients"),
    price: integer("price"),
    active: boolean("active"),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
    category: varchar("category"),
    restaurant: varchar("restaurant"),
    order_menu_item: varchar("order_menu_item"),
});

// Define RestaurantOwner table
export const RestaurantOwnerTable = pgTable('restaurant_owner', {
    id: serial("id").primaryKey(),
    restaurantId: integer("restaurant_id").references(() => RestaurantTable.id),
    ownerId: integer("owner_id").references(() => UsersTable.id),
    users: varchar("users"),
    restaurant: varchar("restaurant"),
});

// Define Driver table
export const DriverTable = pgTable('driver', {
    id: serial("id").primaryKey(),
    carMake: varchar("car_make"),
    carModel: varchar("car_model"),
    carYear: varchar("car_year"),
    userId: integer("user_id").references(() => UsersTable.id),
    online: boolean("online"),
    delivering: boolean("delivering"),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
    users: varchar("users"),
    orders: varchar("orders"),
});

// Define Orders table
export const OrdersTable = pgTable('orders', {
    id: serial("id").primaryKey(),
    restaurantId: integer("restaurant_id").references(() => RestaurantTable.id),
    estimatedDeliveryTime: timestamp("estimated_delivery_time"),
    actualDeliveryTime: timestamp("actual_delivery_time"),
    deliveryAddressId: integer("delivery_address_id").references(() => AddressTable.id),
    userId: integer("user_id").references(() => UsersTable.id),
    driverId: integer("driver_id").references(() => DriverTable.id),
    price: integer("price"),
    discount: integer("discount"),
    finalPrice: integer("final_price"),
    comment: varchar("comment"),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
    comments: varchar("comments"),
    order_menu_item: varchar("order_menu_item"),
    order_status: boolean("order_status"),
    address: varchar("address"),
    driver: varchar("driver"),
    restaurant: varchar("restaurant"),
    users: varchar("users"),

});

// Define Comment table
export const CommentTable = pgTable('comment', {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").references(() => OrdersTable.id),
    userId: integer("user_id").references(() => UsersTable.id),
    commentText: varchar("comment_text"),
    isCompliant: boolean("is_compliant"),
    isPraise: boolean("is_praise"),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
    orders: integer("orders"),
    users: varchar("users"),
});

// Define StatusCatalog table
export const StatusCatalogTable = pgTable('status_catalog', {
    id: serial("id").primaryKey(),
    name: varchar("name"),
    order_status: varchar("order_status"),
});

// Define OrderStatus table
export const OrderStatusTable = pgTable('order_status', {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").references(() => OrdersTable.id),
    statusCatalogId: integer("status_catalog_id").references(() => StatusCatalogTable.id),
    createdAt: timestamp("created_at"),
    orders: integer("orders"),
    status_catalog: integer("status_catalog"),
});

// Define OrderMenuItem table
export const OrderMenuItemTable = pgTable('order_menu_item', {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").references(() => OrdersTable.id),
    menuItemId: integer("menu_item_id").references(() => MenuItemTable.id),
    quantity: integer("quantity"),
    itemPrice: integer("item_price"),
    price: integer("price"),
    comment: varchar("comment"),
    menu_item: varchar("menu_item"),
    orders: integer("orders"),
});


//relationships

export const UserRelations = relations(UsersTable, ({ one, many }) => ({
    addresses: many(AddressTable),
    restaurantOwners: many(RestaurantOwnerTable),
    drivers: many(DriverTable),
    orders: many(OrdersTable),
    comments: many(CommentTable)
}));

export const CityRelations = relations(CityTable, ({ one, many }) => ({
    state: one(StateTable, {
        fields: [CityTable.stateId],
        references: [StateTable.id]
    }),
    addresses: many(AddressTable),
    restaurants: many(RestaurantTable)
}));

export const AddressRelations = relations(AddressTable, ({ one, many }) => ({
    user: one(UsersTable, {
        fields: [AddressTable.userId],
        references: [UsersTable.id]
    }),
    city: one(CityTable, {
        fields: [AddressTable.cityId],
        references: [CityTable.id]
    }),
    orders: many(OrdersTable)
}));

export const RestaurantRelations = relations(RestaurantTable, ({ one, many }) => ({
    city: one(CityTable, {
        fields: [RestaurantTable.cityId],
        references: [CityTable.id]
    }),
    owners: many(RestaurantOwnerTable),
    menuItems: many(MenuItemTable),
    orders: many(OrdersTable)
}));

export const MenuItemRelations = relations(MenuItemTable, ({ one, many }) => ({
    restaurant: one(RestaurantTable, {
        fields: [MenuItemTable.restaurantId],
        references: [RestaurantTable.id]
    }),
    category: one(CategoryTable, {
        fields: [MenuItemTable.categoryId],
        references: [CategoryTable.id]
    }),
    orderMenuItems: many(OrderMenuItemTable)
}));

export const RestaurantOwnerRelations = relations(RestaurantOwnerTable, ({ one }) => ({
    restaurant: one(RestaurantTable, {
        fields: [RestaurantOwnerTable.restaurantId],
        references: [RestaurantTable.id]
    }),
    owner: one(UsersTable, {
        fields: [RestaurantOwnerTable.ownerId],
        references: [UsersTable.id]
    })
}));

export const DriverRelations = relations(DriverTable, ({ one, many }) => ({
    user: one(UsersTable, {
        fields: [DriverTable.userId],
        references: [UsersTable.id]
    }),
    orders: many(OrdersTable)
}));

export const OrdersRelations = relations(OrdersTable, ({ one, many }) => ({
    restaurant: one(RestaurantTable, {
        fields: [OrdersTable.restaurantId],
        references: [RestaurantTable.id]
    }),
    deliveryAddress: one(AddressTable, {
        fields: [OrdersTable.deliveryAddressId],
        references: [AddressTable.id]
    }),
    user: one(UsersTable, {
        fields: [OrdersTable.userId],
        references: [UsersTable.id]
    }),
    driver: one(DriverTable, {
        fields: [OrdersTable.driverId],
        references: [DriverTable.id]
    }),
    orderMenuItems: many(OrderMenuItemTable),
    comments: many(CommentTable),
    statuses: many(OrderStatusTable)
}));

export const CommentRelations = relations(CommentTable, ({ one }) => ({
    order: one(OrdersTable, {
        fields: [CommentTable.orderId],
        references: [OrdersTable.id]
    }),
    user: one(UsersTable, {
        fields: [CommentTable.userId],
        references: [UsersTable.id]
    })
}));

export const OrderStatusRelations = relations(OrderStatusTable, ({ one }) => ({
    order: one(OrdersTable, {
        fields: [OrderStatusTable.orderId],
        references: [OrdersTable.id]
    }),
    status: one(StatusCatalogTable, {
        fields: [OrderStatusTable.statusCatalogId],
        references: [StatusCatalogTable.id]
    })
}));

export const OrderMenuItemRelations = relations(OrderMenuItemTable, ({ one }) => ({
    order: one(OrdersTable, {
        fields: [OrderMenuItemTable.orderId],
        references: [OrdersTable.id]
    }),
    menuItem: one(MenuItemTable, {
        fields: [OrderMenuItemTable.menuItemId],
        references: [MenuItemTable.id]
    })
}));

export type TIUser = typeof UsersTable.$inferInsert;
export type TSUser = typeof UsersTable.$inferSelect;

// export type TIRestaurantTable = typeof RestaurantTable.$inferInsert;
// export type TSRestaurantTable = typeof RestaurantTable.$inferSelect;
// export type TIUsersTable = typeof UsersTable.$inferInsert;
// export type TSUsersTable = typeof UsersTable.$inferSelect;
// export type TIStateTable = typeof StateTable.$inferInsert;
// export type TSStateTable = typeof StateTable.$inferSelect;
// export type TICityTable = typeof CityTable.$inferInsert;
// export type TSCityTable = typeof CityTable.$inferSelect;
// export type TIAddressTable = typeof AddressTable.$inferInsert;
// export type TSAddressTable = typeof AddressTable.$inferSelect;
// export type TIRestaurantOwnerTable = typeof RestaurantOwnerTable.$inferInsert;
// export type TSRestaurantOwnerTable = typeof RestaurantOwnerTable.$inferSelect;
// export type TIMenuItemTable = typeof MenuItemTable.$inferInsert;
// export type TSMenuItemTable = typeof MenuItemTable.$inferSelect;
// export type TIOrderMenuItemTable = typeof OrderMenuItemTable.$inferInsert;
// export type TSOrderMenuItemTable = typeof OrderMenuItemTable.$inferSelect;
// export type TIOrdersTable = typeof OrdersTable.$inferInsert;
// export type TSOrdersTable = typeof OrdersTable.$inferSelect;
// export type TIOrderStatusTable = typeof OrderStatusTable.$inferInsert;
// export type TSOrderStatusTable = typeof OrderStatusTable.$inferSelect;
// export type TIDriverTable = typeof DriverTable.$inferInsert;
// export type TSDriverTable = typeof DriverTable.$inferSelect;
// export type TIcommentTable = typeof CommentTable.$inferInsert;
// export type TScommentTable = typeof CommentTable.$inferSelect;
// export type TIStatusCatalogTable = typeof StatusCatalogTable.$inferInsert;
// export type TSStatusCatalogTable = typeof StatusCatalogTable.$inferSelect;


