const gql = require('graphql-tag');

const typeDefs = gql`
  type Query {
    "a query to retrieve a Card based on its MongoDB _id, may return null for non-existent _id's"
    getCard(cardId: ID!): Card

    "a query to retrieve a Variation based on its MongoDB _id, may return null for non-existent _id's"
    getVariation(variationId: ID!): Variation
  }

  type Mutation {
    "creates a new Variation to be assigned to a Card later and returns the newly created Variation if successful, otherwise null"
    createVariation(data: CreateVariationInput): CreateVariationResponse
    "deletes a Variation based on its _id field in MongoDB"
    deleteVariation(variationId: ID!): DeleteVariationResponse
  }

  input CreateVariationInput {
    "the flashcard's question or prompt to be shown to the user"
    body: String!
    "the possible answers to the flashcard's body text"
    answer: [String!]!
    "the answer's category"
    answerType: String!
    "a note to be shown together with the flashcard's answer"
    answerNotes: String
    "the input field's default value, e.g. <input value='something here' />"
    answerPrefilledValue: String
    "a list of keywords associated with the flashcard"
    keywords: [String!]
    "determines whether a Card's answer is case sensitive, default value is false"
    isCaseSensitive: Boolean!
  }

  type CreateVariationResponse {
    "202 indicates an operation success, while 500 indicates a MongoDB error"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "The mutated object can be null since the mutation may fail"
    variation: Variation
  }

  type DeleteVariationResponse {
    "200 indicates a successful deletion, 400 indicates that the Variation _id does not exist, while 500 indicates a server error"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
  }

  """
  A Card represents a user's flashcard with various Variations and previous Attempts.
  It determines when the nextAttemptDate will be available for the user to view the flashcard again.
  """
  type Card {
    "the ObjectId _id field automatically generated by MongoDB"
    _id: ID!
    "the user's unique ID generated by the clark.dev auth-as-a-service"
    userId: ID!
    "a card's different flashcard variations with the questions & answers"
    variations: [Variation!]!
    "the next scheduled date for a card to show up, in ISOString format"
    nextAttemptDate: String!
    "the date the card was created, in ISOString format"
    dateCreated: String!
    "the list of previous attempts with previous answers & results"
    attempts: [Attempt!]!
  }

  """
  A Card may have multiple Variations that contain different body text, to prevent memorization.
  """
  type Variation {
    "the ObjectId _id field automatically generated by MongoDB"
    _id: ID!
    "the flashcard's question or prompt to be shown to the user"
    body: String!
    "the possible answers to the flashcard's body text"
    answer: [String!]!
    "the answer's category"
    answerType: String!
    "a note to be shown together with the flashcard's answer"
    answerNotes: String
    "the input field's default value, e.g. <input value='something here' />"
    answerPrefilledValue: String
    "a list of keywords associated with the flashcard"
    keywords: [String!]
    "determines whether a Card's answer is case sensitive, default value is false"
    isCaseSensitive: Boolean!
  }

  """
  An Attempt represents a user's previous attempt on an associated Card Variation's variationId.
  """
  type Attempt {
    "the _id value of the Variation object associated with this Attempt"
    variationId: ID!
    "the date the card was created, in ISOString format"
    dateCreated: String!
    "the result of the attempt, true indicates correct while false indicates wrong"
    result: Boolean!
    "the Attempt's answer"
    answer: String!
  }
`;

module.exports = typeDefs;
