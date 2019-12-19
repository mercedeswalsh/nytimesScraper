module.exports = (model, Schema) => {

  const Article = new Schema({
    title: String,
    summary: String,
    url: String,
    category: String,
    unique_name: String,
    isSaved: { type: Boolean, default: false},
    notes: [{ type: Schema.Types.ObjectId , ref: 'Note' }]
  }, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  })

  return model('Article', Article)
}