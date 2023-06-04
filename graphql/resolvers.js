const { Variation } = require('../models');

const resolvers = {
  Query: {
    getVariation: async (_, { variationId }) => {
      try {
        result = await Variation.findById(variationId).exec();
        return result;
      } catch (err) {
        console.log('getVariation Error:', err);
      }
    },
  },
  Mutation: {
    createVariation: async (_, { data }) => {
      try {
        const newVariation = new Variation(data);
        const result = await newVariation.save();
        return {
          code: 201,
          success: true,
          message: 'Variation successfully created',
          variation: result,
        };
      } catch (err) {
        console.log('createVariation Error:', err);
        return {
          code: 500,
          success: false,
          message: `createVariation Error: ${err}`,
          variation: null,
        };
      }
    },
  },
};

module.exports = resolvers;
