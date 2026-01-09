public function categories()
{
    return $this->belongsToMany(Category::class, 'category_recipe', 'recipe_id', 'category_id');
}
