public function recipes()
{
    return $this->belongsToMany(Recipe::class, 'category_recipe', 'category_id', 'recipe_id');
}