class PasswordsController < ApplicationController
  def new
  end

  # app/controllers/password_resets_controller.rb
  def create
    user = User.find_by(email: params[:email]) ## or can be using name
  
    if user
      user.generate_password_reset_code!

      # Send email - now returns SendGrid response
      begin
      # ✅ Try to send email
      UserMailer.password_reset_code(user, user.password_reset_code).deliver_now

      redirect_to verify_code_path(user_id: user.id), 
                  notice: "Verification code sent to your email!"
      rescue => e
      
        redirect_to new_password_path, 
                  alert: "Failed to send email. Please try again."
      end
    else
      redirect_to new_password_path, 
                alert: "User not found. Please check your email address."
    end
  end

  def edit_password
    @user = User.find(params[:user_id])
    # Show new password form
  end

  def edit # forms to enter the verfication code, previous to update()
    @user = User.find_by(id: params[:user_id])
    redirect_to new_password_path, alert: "Invalid request." unless @user&.password_reset_code  # invalid code or user not found
  end

  def update
    user = User.find(params[:user_id])
    
    # If coming from verification code form
    if params[:code]
      if user.password_reset_code == params[:code] && user.password_reset_expires_at > Time.now
        redirect_to password_form_path(user_id: user.id), notice: "Code verified!"
      else
        redirect_to verify_code_path(user_id: user.id), alert: "Invalid code!"
      end
    # If coming from password form
    else
      if user.update(password: params[:user][:password], password_confirmation: params[:user][:password_confirmation])
        user.update(password_reset_code: nil, password_reset_expires_at: nil)
        redirect_to login_path, notice: "Password updated successfully!"
      else
        redirect_to password_form_path(user_id: user.id), alert: "Password update failed!"
      end
    end
  end
end
