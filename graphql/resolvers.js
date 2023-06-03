const { Variation } = require("../models");

const resolvers = {
  Mutation: {
    createVariation: async (_, { data }) => {
      // const {
      //   body,
      //   answer,
      //   answerType,
      //   answerNotes,
      //   answerPrefilldedValue,
      //   keywords,
      //   isCaseSensitive,
      // } = data;

      const newVariation = new Variation(data);
      const result = await newVariation.save();
      return result;
    },
  },
};

module.exports = resolvers;
