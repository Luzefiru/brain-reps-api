const { Variation } = require('../models');

const resolvers = {
  Query: {
    getVariation: async (_, { variationId }) => {
      try {
        result = await Variation.findById(variationId).exec();
        return result;
      } catch (err) {
        console.log(`getVariation Error: ${err}`);
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
        console.log(`createVariation Error: ${err}`);
        return {
          code: 500,
          success: false,
          message: `createVariation Error: ${err}`,
          variation: null,
        };
      }
    },
    deleteVariation: async (_, { variationId }) => {
      try {
        const result = await Variation.deleteOne({ _id: variationId }).exec();

        // if the number of deleted documents is 0
        if (result.deletedCount === 0) {
          return {
            code: 400,
            success: false,
            message: `deleteVariation Error: Variation with _id: ${variationId} does not exist!`,
          };
        } else {
          // otherwise, the operation was successful
          return {
            code: 200,
            success: true,
            message: `Successfully deleted Variation with _id: ${variationId}`,
          };
        }
      } catch (err) {
        return {
          code: 500,
          success: false,
          message: `deleteVariation Error: ${err}`,
        };
      }
    },
  },
};

module.exports = resolvers;
