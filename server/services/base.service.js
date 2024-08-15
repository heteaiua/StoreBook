class BaseClass {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        return await this.model.find().exec();
    }

    async getById(id) {
        return await this.model.findById(id).exec();
    }

    async add(data) {
        const newItem = new this.model(data);
        return newItem.save();
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }

    async deleteAll() {
        return await this.model.deleteMany({}).exec();
    }

    async update(id, details) {
        return await this.model.findByIdAndUpdate(id, {$set: details}, {new: true}).exec();
    }

    async getFiltered(filters = {}, sortBy = '_id', sortOrder = 'asc', page = 1, limit = 10) {
        try {
            const query = this.buildQuery(filters);
            const skip = (page - 1) * limit;
            const items = await this.model.find(query)
                .sort({[sortBy]: sortOrder})
                .skip(skip)
                .limit(limit)
                .exec();
            return items;
        } catch (err) {
            throw new Error("Error in filtering items: " + err.message);
        }
    }

    async getCountedItemsFiltered(filters = {}, sortBy = '_id', sortOrder = 'asc', page = 1, limit = 10) {
        try {
            const query = this.buildQuery(filters);
            return await this.model.countDocuments(query).exec();
        } catch (err) {
            throw new Error("Error in counting filtering items: " + err.message);
        }
    }

    buildQuery(filters) {
        const query = {};
        for (const [key, value] of Object.entries(filters)) {
            if (typeof value === 'object' && value !== null) {
                query[key] = this.buildComparisonQuery(value);
            } else {
                query[key] = value;
            }
        }
        return query;
    }

    buildComparisonQuery(filter) {
        const comparisonQuery = {};
        for (const [operator, value] of Object.entries(filter)) {
            switch (operator) {
                case 'min':
                    comparisonQuery['$gte'] = value;
                    break;
                case 'max':
                    comparisonQuery['$lte'] = value;
                    break;
                case '<':
                    comparisonQuery['$lt'] = value;
                    break;
                case '<=':
                    comparisonQuery['$lte'] = value;
                    break;
                case '>':
                    comparisonQuery['$gt'] = value;
                    break;
                case '>=':
                    comparisonQuery['$gte'] = value;
                    break;
                default:
                    throw new Error(`Unknown comparison operator: ${operator}`);
            }
        }
        return comparisonQuery;
    }
}

module.exports = BaseClass;