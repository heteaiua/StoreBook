const createRepository = (model) => {
    return {
        getAll: async () => {
            return await model.find().exec();
        },

        getById: async (id) => {
            return await model.findById(id).exec();
        },

        add: async (data) => {
            const newItem = new model(data);
            return await newItem.save();
        },

        delete: async (id) => {
            return await model.findByIdAndDelete(id).exec();
        },

        update: async (id, details) => {
            return await model.findByIdAndUpdate(
                id,
                { $set: details },
                { new: true }
            ).exec();
        }
    };
};

module.exports = createRepository;