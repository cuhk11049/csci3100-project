class UserMailer < ApplicationMailer
  default from: "bingzhe923@gmail.com" # the single verified email in SendGrid

  def password_reset_code(user, code)
    @user = user
    @code = code
    mail(to: @user.email, subject: "Your PassWord Reset Code")
  end

  def daily_report(user, new_items, favorite_items)
    @user = user
    @new_items = new_items
    @favorite_items = favorite_items
    mail(to: user.email, subject: 'Daily Trade Report on CampusTrade')
  end
  
end
