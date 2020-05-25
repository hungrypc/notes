# Many-to-Many Associations and Automated Testing - Integration, Functional, Unit

Unit Tests: Models, individual units of the application (like a validation) are working

Functional Tests: Controllers, a function is working, for example is before_action stopping a non-logged in user from performing an action

Integration Tests: Full features, start to finish of a business process, example: a user signs up for the app

## Category Model and Testing

To write our tests, we'll be using 'assertions'.

```ruby
# create test/models/category_test.rb
require 'test_helper'

class CategoryTest < ActiveSupport::TestCase

  test "category should be valid" do
    @category = Category.new(name: "Sports")
    assert @category.valid?
  end
end
```
To run all tests in cli: rails test

Introduces the idea of Test Driven Development (TDD). The test above should fail since we haven't made a Category model yet.

```ruby
# create models/category.rb
class Category < ApplicationRecord

end

# rails generate migration create_categories
class CreateCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :categories do |t|
      t.string :name
      t.timestamps
    end
  end
end

# rails db:migrate
```
Test should pass now.


## Validation using Unit Tests

```ruby
# test/models/category_test.rb
require 'test_helper'

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = Category.new(name: "Sports")
    # we do this here because instances are scrubbed after each test
  end
  # whatever is in here will be run before each test is run so we minimize repetition

  test "name should be present" do
    @category.name = " "
    assert_not @category.valid?
    # with assert_not we're testing for false
  end

  test "name should be unique" do
    @category.save
    @category2 = Category.new(name: "Sports")
    assert_not @category2.valid?
  end

  test "name should not be too long" do
    @category.name = "a" * 26
    assert_not @category.valid?
  end

  test "name should not be too short" do
    @category.name = "aa"
    assert_not @category.valid?
  end
end

# models/category.rb
class Category < ApplicationRecord
  validates :name, presence: true, length: { minimum: 3, maximum: 5 }
  validates_uniquness_of :name
end
```


## Categories Controller and Tests
Functional Tests test the individual actions or whateer actions the controller is responsible for controlling. eg

- New category - new.html.erb
- Show category details - show.html.erb
- Categories index - index.html.erb

```ruby
# rails generate test_unit:scafffold category

# test/controllers/categories_controller_test.rb
require 'test_helper'

class CategoryControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = Category.create(name: "Sports")
  end

  test "should get index" do
    get categories_url
    assert_response :success
  end

  test "should get new" do
    get new_categories_url
    assert_response :success
  end

  test "should show category" do
    get category_url(@category)
    assert_response :success
  end
end

# routes.rb
Rails.application.routes.draw do
# ...
resources :categories, except: [:destroy]
end

# create controllers/categories_controller.rb
class CategoriesController < ApplicationController
  def index
  end

  def show
  end

  def new
  end
end

# create views/categories folder, then create files erbs for new, show, index
```
rails test test/controllers


## Create Category and Test
```ruby
# test/controllers/categories_controller_test.rb
require 'test_helper'

class CategoryControllerTest < ActionDispatch::IntegrationTest
  # ...

  test "should create category" do
    assert_difference('Category.count', 1) do  # we want to see the category count change by 1 when we create a category
      post categories_url, params: { category: { name: "Travel" } } # creating category
    end

    assert_redirected_to category_url(Category.last)
  end
end

# creates a views/categories/new.html.erb form but this is repetition of previous work

# controllers/categories_controller.rb
class CategoriesController < ApplicationController
  # ...

  def create
    @category = Category.new(category_params)
    if @category.save
      flash[:notice] = "Category created"
      redirect_to @category
    else
      render 'new'
    end
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end
end
```


## Integration Test: Create Category
> These test thw whole business process for a feature, which includes multiple functions, and ensures that they're all working well together.

```cli
rails generate integration_test create_category
```

```ruby
# integration/create_category_test.rb
require 'test_helper'

class CreateCategoryTest < ActionDispatch::IntegrationTest

  test "get new category form and create category" do
    get "/categories/new"
    assert_response :success
    assert_difference 'Category.count', 1 do
      post categories_path, params: { category: { name: "Sports" } }
      assert_response :redirect
    end
    follow_redirect!
    assert_response :success
    assert_match "Sports", response.body  # checks if "Sports" occurs in response.body
  end

  test "get new category form and reject invalid category submission" do
    get "/categories/new"
    assert_response :success
    assert_no_difference 'Category.count' do
      post categories_path, params: { category: { name: "" } }
    end
    assert_select 'div.alert'  # checks for errors in html
    assert_select 'h4.alert-heading'
  end
end
```


## Integration Test: Listing Categories
rails generate integration_test list_categories

I'm going to skip building erbs, too much repetition it's fucking annoying.

```ruby
# integration/list_categories_test.rb
require 'test_helper'

class ListCategoriesTest < ActionDispatch::IntegrationTest
  def setup
    @category = Category.create(name: "Sports")
    @category2 = Category.create(name: "Travel")
  end

  test "should show categories listing" do
    get "/categories"
    assert_select "a[href=?]", category_path(@category), text: @category.name  # looks for a link that leads to @category and @category2
    assert_select "a[href=?]", category_path(@category2), text: @category2.name
  end
end
```

## Note
The rest of this section is under upgrade, so most of what we see here relates to Rails 5, which is a little different to Rails 6. I'm only going to include important notes that are worthwhile and will come back to this when the section is fully upgraded.

```ruby
# simulating user log in
test "get new category form and create category" do
  sign_in_as(@user, "password") # this method is a helper method in test/test_helper.rb
end

# test/test_helper.rb
# ...
def sign_in_as(user, password)
  post login_path, session: { email: user.email, password: password }
end
```

Come back to:

- Add Association from UI
