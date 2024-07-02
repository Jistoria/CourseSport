require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should get index" do
    get users_url, as: :json
    assert_response :success
  end

  test "should create user" do
    assert_difference("User.count") do
      post users_url, params: { user: { apellido: @user.apellido, cdl_user: @user.cdl_user, email: @user.email, genero: @user.genero, nombre: @user.nombre, password_digest: @user.password_digest, role_id: @user.role_id, specialty: @user.specialty, token: @user.token } }, as: :json
    end

    assert_response :created
  end

  test "should show user" do
    get user_url(@user), as: :json
    assert_response :success
  end

  test "should update user" do
    patch user_url(@user), params: { user: { apellido: @user.apellido, cdl_user: @user.cdl_user, email: @user.email, genero: @user.genero, nombre: @user.nombre, password_digest: @user.password_digest, role_id: @user.role_id, specialty: @user.specialty, token: @user.token } }, as: :json
    assert_response :success
  end

  test "should destroy user" do
    assert_difference("User.count", -1) do
      delete user_url(@user), as: :json
    end

    assert_response :no_content
  end
end
