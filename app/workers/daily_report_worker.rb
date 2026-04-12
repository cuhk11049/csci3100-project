class DailyReportWorker
  include Sidekiq::Job

  def perform
    @new_items = Item.where("created_at >= ?", 24.hours.ago)

    User.find_each do |user|
      @favorite_items = user.favorites
      UserMailer.daily_report(user, @new_items, @favorite_items).deliver_now
    end
  end
end
